const jwt = require("jsonwebtoken");
const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//check if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  //getting the token from the cookie
  const { token } = req.cookies;

  //if no token then we can t access protected routes
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

//Hnadling user Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
