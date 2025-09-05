const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., "dog", "cat", "bird"
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);
