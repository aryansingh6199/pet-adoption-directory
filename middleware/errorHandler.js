/* Centralized error handlers with specific messages */
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, _next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.status || 500);
  const payload = {
    message: err.message || 'Something went wrong',
  };

  if (err.errors) {
    payload.errors = err.errors;
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    payload.message = 'Validation failed';
    payload.errors = Object.keys(err.errors).map((k) => ({
      field: k,
      message: err.errors[k].message,
    }));
  }

  // CastError for ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    payload.message = 'Invalid ID format';
  }

  res.status(statusCode).json(payload);
}

module.exports = { notFound, errorHandler };
