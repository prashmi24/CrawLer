import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        minLength: [3, "Enter atleast 3 characters."],
        maxLength: [50, "Only 50 chaaracters are allowed."]
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Enter a valid email"],
        required: [true, "Enter an email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Provide cover letter with your application"]
    },
    phone:{
        type: Number,
        required: [true, "Enter phone number "]
    },
    address:{
        type: String,
        required: [true, "Enter your address"],
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    applicantID: {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Employer"],
            required: true
        },
    },
});

export const Application = mongoose.modal("Application", applicationSchema);