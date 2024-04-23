import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide a name."],
        minLength: [3, "Enter atleast 3 characters."],
        maxLength: [30, "Only 30 chaaracters are allowed."]
    },
    email: {
        type: String,
        required: [true,"Please provide an email."],
        validate: [validator.isEmail, "Enter a valid email"]
    },
    phone: {
        type: Number,
        required: [true, "Please provide a Phone Number."]
    },
    password: {
        type: String,
        required: [true,"Please provide a password."],
        minLength: [8, "Enter atleast 8 characters."],
        maxLength: [32, "Only 32 chaaracters are allowed."],
        select: false
    },
    role: {
        type: String,
        required: [true, "Please provide your role."],
        enum: ["Job Seeker", "Employer"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Encrypting the password

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

//comparing password

userSchema.methods.comparePassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating JWT 

userSchema.methods.getJWT = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.modal("User", userSchema);