class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message || "Internal server error";
  error.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue);
    const message = `Duplicate ${duplicateField} entered`;
    error = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `JSON web token is invalid. Try Again!`;
    error = new ErrorHandler(message, 401);
  }
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try Again!`;
    err = new ErrorHandler(message, 401);
  }
  console.error(err);

  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: error.stack,
    });
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
export default ErrorHandler;
