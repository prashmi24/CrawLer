import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import {User} from '../modals/user.js';
import ErrorHandler  from '../middlewares/error.js';
import {sendTokens} from "../utils/jwt.js";

//user registration
export const register = catchAsyncError(async (req, res, next)=>{
    const {name, email, phone, password, role}= req.body;

    //  required field is missing while registering  
    if(!name || !email || !phone || !password || !role){
        return next(new ErrorHandler ("Please fill all required information"));
    }

    //registering with already existing email
    const isEmail = await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler ("User already exists!"));
    }
    const user= await User.create({
        name,
        email,
        phone,
        password,
        role
    });
    sendTokens(user, 201, res, "User Registerd Successfully!");
});

// User Login
export const login = catchAsyncError(async(req, res, next)=>{
    const{email, password, role} = req.body;

// User Login without required fields 
    if(!email || !password || !role){
        return next(
            new ErrorHandler("Please provide email, password and role.", 400)
        );
    }

    // User Login with invalid mail & password
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(
            new ErrorHandler("Invalid Email or Password", 400)
        );
    }

    //password matching
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password", 400)
        );
    }

    //role matching
    if(user.role !== role){
        return next(
            new ErrorHandler("User with this role not found", 400)
        );
    }
    sendTokens(user, 201, res, "User Logged In!");
});


//User Logout
export const logout = catchAsyncError(async(req, res, next)=>{
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    .json({
        success: true,
        message: "User Logged Out Successfully!"
    });
});

export const getUser = catchAsyncError(async(req, res, next)=>{
    const user =req.user;
    res.status(200).json({
        success: true,
        user,
    });
});