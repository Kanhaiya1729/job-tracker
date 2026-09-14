const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered."
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Database validation failed.",
      errors: Object.values(err.errors).map((item) => item.message)
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
};

module.exports = errorMiddleware;
