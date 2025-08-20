const mongoose = require('mongoose');
const validator = require('validator');

const petSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: [true, 'petName is required'],
      trim: true,
      minlength: [2, 'petName must be at least 2 characters'],
      maxlength: [60, 'petName cannot exceed 60 characters'],
    },
    breed: {
      type: String,
      required: [true, 'breed is required'],
      trim: true,
      minlength: [2, 'breed must be at least 2 characters'],
      maxlength: [60, 'breed cannot exceed 60 characters'],
    },
    age: {
      type: Number,
      required: [true, 'age is required'],
      min: [0, 'age must be a positive number'],
      validate: {
        validator: Number.isFinite,
        message: 'age must be a valid number',
      },
    },
    imageUrl: {
      type: String,
      required: [true, 'imageUrl is required'],
      trim: true,
      validate: {
        validator: (v) => validator.isURL(v || '', { require_protocol: true, protocols: ['http', 'https'] }),
        message: 'imageUrl must be a valid URL with http or https',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);
