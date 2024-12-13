import { config } from "dotenv";
config({ path: "./config/config.env" });
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => { 
  // console.log("Token from cookies:", req.cookies.token);
  const { token } = req.cookies;

  
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }

  req.user = await User.findById(decoded.id);
//   console.log("Decoded ID:", decoded.id); // Debugging
// console.log("User found in DB:", req.user); // Debugging
  
  if (!req.user) {
    return next(new ErrorHandler("User Not Found", 401));
  }

  next();
});

