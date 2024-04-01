export const catchAsyncError = (catchAsyncErrorFunction) =>{
    return(req, res, next)=>{
        Promise.resolve(catchAsyncErrorFunction(req, res, next)).catch(next);
    };
};