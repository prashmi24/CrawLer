import { User } from "../modals/user.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthorized = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized. Please Login.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (!decoded || !decoded.id) {
    return next(new ErrorHandler("Invalid or Expired Token.", 403));
  }

  req.user = await User.findByID(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User Not Found.", 404));
  }
  next();
});
