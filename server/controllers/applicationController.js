import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/application.js";
import { Job } from "../models/job.js";
import cloudinary from "cloudinary";
import fs from "fs";

// Employer requesting all the applications
export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seeker is not allowed to access these resources",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Job Seeker requesting all the applications he/she applied for
export const jobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer is not allowed to access these resources",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "jobSeekerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Job Seeker wants to delete the application
export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer is not allowed to access these resources",
          400
        )
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  }
);

// Job Seeker posting application
export const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to post applications", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please attach a resume", 400));
  }
  const { resume } = req.files;
  const allowedFormats = ["application/pdf"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PDF file", 400)
    );
  }
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Error"
      );
      return next(new ErrorHandler("Failed to upload resume", 500));
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return next(new ErrorHandler("Invalid Job ID", 404));
    }
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found", 404));
    }
    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };
    if (!name || !email || !coverLetter || !phone || !address) {
      return next(new ErrorHandler("Please fill all fields", 400));
    }
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID,
      employerID,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    fs.unlinkSync(resume.tempFilePath);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to upload resume", 500));
  }
});
