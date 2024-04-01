import {User} from '../models/user.js';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';


export const isAuthorized = catchAsyncError(async(req, res, next)=>{
    const {token} =req.cookies;
    if(!token){
        return next(new ErrorHandler("User Not Authorized", 400));
    }
    const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user=await User.findByID(decoded.id);
    next();
});