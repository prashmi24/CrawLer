import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../models/application.js';
import {Job} from '../models/job.js';
import cloudinary from 'cloudinary';

// Employer requesting all the applications
export const employerGetAllApplications= catchAsyncError(async(req, res, next) =>{
    const{role} = req.user;
    if(role=== "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources", 400));
    }
    const {_id} = req.user;
    const applications = await Application.find({'employeeID.user': _id});
    res.status(200).json({
       success: true,
       applications 
    });
});

//Job Seeker requesting all the applications he/she applied for
export const jobSeekerGetAllApplications= catchAsyncError(async(req, res, next) =>{
    const{role} = req.user;
    if(role=== "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources", 400));
    }
    const {_id} = req.user;
    const applications = await Application.find({"jobSeekerID.user": _id});
    res.status(200).json({
       success: true,
       applications 
    });
});

//Job Seeker wants to delete the application
export const jobSeekerDeleteApplication = catchAsyncError(async(req, res, next) =>{
    const{role} = req.user;
    if(role=== "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources", 400));
    }
    const{id}=req.params;
    const applications =await Application.findById(id);
    if(!applications){
        return next(new ErrorHandler("Oops! Application Not Found", 400));
    }
    await applications.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application Deleted Successfully!"
    });
});

//Job Seeker posting application
export const postApplication = catchAsyncError(async(req, res, next)=>{
    const{role} = req.user;
    if(role=== "Employer"){
        return next(new ErrorHandler("Employer is not allowed to access this resources", 400));
    }
    if(!req.files || Object.keys(req.files).length === 0){
        return next (new ErrorHandler("Attach a resume"));
    }
    const {resume} = req.files;
    const allowedFormats = ["application/pdf"];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file type. Please upload a PDF file", 400));
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse || "Unknown Error");
        return next(new ErrorHandler("Failed to upload resume", 500))
    }
    const {name, email, coverLetter, phone, address, jobId} = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker"
    };
    if (!jobId){
        return next(new ErrorHandler("Job not found", 404));
    }
    const jobDetails = await Job.findBy(jobId);
    if(!jobDetails){
        return next (new ErrorHandler("Job not found", 404));
    }
    const employerID={
        user: jobDetails.postedBy,
        role: "Employer"
    };
    if ( !name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("Please fill all fields.", 400));
    }
    const application = await Application.create({
        name, email, coverLetter, phone, address, applicantID, employerID, 
        resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        },
    });
    res.status(200).json({
        success:true,
        message: "Application Submitted",
        application,
    });
});

