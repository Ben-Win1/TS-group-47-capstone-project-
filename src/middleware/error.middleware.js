const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose CastError (invalid ObjectId)
  if (error.name === 'CastError') {
    error = new ApiError(400, `Invalid resource identifier format: ${error.path}`);
  }

  // Handle Mongoose Duplicate Key Error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    error = new ApiError(409, `Duplicate field value entered for '${field}'`);
  }

  // Handle Mongoose ValidationError
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((val) => val.message).join(', ');
    error = new ApiError(400, message);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

module.exports = errorHandler;