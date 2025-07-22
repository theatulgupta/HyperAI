export const errorHandler = (err, req, res, next) => {
  console.error("💥 Error:", err.status || 500, err.message, err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
