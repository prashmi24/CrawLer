function ErrorHandler(message, statusCode){
    const error=new Error(message);
    error.statusCode = statusCode;
    return error;
}
  
export const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || "Internal server error";
    err.statusCode=err.statusCode || 500;
    if(err.name === "CaseError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err=new ErrorHandler(message, 400);
    }
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err=new ErrorHandler(message, 400);
    }
    if(err.name==="JsonWebTokenError"){
        const message = `JSON web token is invalid. Try Again!`;
        err=new ErrorHandler(message, 400);
    }
    if(err.name==="TokenExpiredError"){
        const message = `JSON Web Token is expired. Try Again!`;
        err=new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json(
        {
            success: false,
            message: err.message,
        }
    );
};
export default ErrorHandler;