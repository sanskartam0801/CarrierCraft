export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  // Ensure the expiration is calculated correctly (in milliseconds)
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true for added security
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};

