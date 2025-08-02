const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  image: {
    type: String, // URL or base64 string
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Pet', petSchema);
