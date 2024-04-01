import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Provide a Job Title"],
        minLength: [3, "Enter atleast 3 characters."],
        maxLength: [50, "Only 50 chaaracters are allowed."]
    },
    description:{
        type: String,
        required: [true, "Provide a Job Description"],
        minLength: [50, "Enter atleast 50 characters."],
        maxLength: [1000, "Only 1000 chaaracters are allowed."]
    },
    category:{
        type: String,
        required: [true, "Provide a Job Category"]
    },
    country:{
        type: String,
        required: [true, "Provide Country"]
    },
    city:{
        type: String,
        required: [true, "Provide City"]
    },
    location:{
        type: String,
        required: [true, "Provide your location"],
        minLength: [10, "Enter atleast 10 characters."]
    },
    fixedSalary:{
        type: Number,
        minLength: [4, "Enter atleast 4 characters."],
        maxLength: [10, "Only 10 chaaracters are allowed."]
    },
    SalaryFrom:{
        type: Number,
        minLength: [4, "Enter atleast 4 characters."],
        maxLength: [10, "Only 10 chaaracters are allowed."]
    },
    SalaryTo:{
        type: Number,
        minLength: [4, "Enter atleast 4 characters."],
        maxLength: [10, "Only 10 chaaracters are allowed."]
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
 
});
export const Job = mongoose.model("Job", jobSchema);