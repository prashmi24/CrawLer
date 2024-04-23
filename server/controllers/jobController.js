import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import {Job} from '../modals/job.js';

//searching all posted jobs
export const getAllJobs = catchAsyncError(async(req, res, next)=>{
    const jobs = await Job.find({expired: false});
    res.status(200).json({
        success: true,
        jobs, 
    });
});

//employer posting a job
export const postJob = catchAsyncError(async(req, res, next)=>{
    const{role} =req.user;
    if(role=== "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources",
        400));
    }
    const {title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo}= req.body;

//when any one or more fields are empty    
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler("Provide all the required details", 400));
    }

//Salary is not entered    
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(
            new ErrorHandler("Provide either fixed salary or a salary range")
        );
    }

// Both types of salary are entered    
    if(salaryFrom && salaryTo && fixedSalary){
        return next(
            new ErrorHandler("Provide only one type of salary")
        );
    }

//Job posted by
    const postedBy =req.user._id;
    const job = await Job.create({
        title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy
    });

    res.status(200).json({
        success: true,
        message: "Job created successfully!",
        job
    });
});

// employer wants view all the jobs posted by him/her
export const getMyJobs = catchAsyncError(async(req, res, next) =>{
    const{role} = req.user;
    if(role=== "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources", 400));
    }
    const myJobs = await Job.find({postedBy: req.user._id});
    res.status(200).json({
        success: true,
        myJobs
    });

});

//employer wants to update the existing job
export const updateJob = catchAsyncError(async(req, res, next)=>{
    const{role} = req.user;
    if(role=== "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources", 400));
    }
    const {id} =req.params;
    let job = await job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops! Job Not Found", 400));
    }
    job = await Job.findByIdAndUpdate(id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        job,
        message: "Job updated!"
    });
});

//employer wants to delete a job
export const deleteJob =catchAsyncError(async(req, res, next)=>{
    const{role} = req.user;
    if(role=== "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources", 400));
    }
    const {id} =req.params;
    let job = await job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops! Job Not Found", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message: "Job deleted successfully!"
    });
});
