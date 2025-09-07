import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true }
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;   // ✅ ESM default export
