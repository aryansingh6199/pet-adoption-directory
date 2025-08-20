const { body, param, validationResult } = require('express-validator');
const createHttpError = require('http-errors');

// Reusable validators
const petValidators = [
  body('petName').exists().withMessage('petName is required')
    .bail().isString().withMessage('petName must be a string')
    .bail().trim().isLength({ min: 2, max: 60 }).withMessage('petName must be 2-60 chars')
    .escape(),
  body('breed').exists().withMessage('breed is required')
    .bail().isString().withMessage('breed must be a string')
    .bail().trim().isLength({ min: 2, max: 60 }).withMessage('breed must be 2-60 chars')
    .escape(),
  body('age').exists().withMessage('age is required')
    .bail().isFloat({ min: 0 }).withMessage('age must be a positive number')
    .toFloat(),
  body('imageUrl').exists().withMessage('imageUrl is required')
    .bail().isURL({ require_protocol: true, protocols: ['http', 'https'] })
    .withMessage('imageUrl must be a valid http/https URL')
    .trim(),
];

const idParamValidator = [
  param('id').isMongoId().withMessage('Invalid pet ID format'),
];

function runValidation(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const detailed = errors.array().map(e => ({
      field: e.path,
      message: e.msg,
      value: e.value,
    }));
    return next(createHttpError(400, { message: 'Validation failed', errors: detailed }));
  }
  return next();
}

module.exports = {
  petValidators,
  idParamValidator,
  runValidation,
};
