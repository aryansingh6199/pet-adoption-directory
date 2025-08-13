import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
