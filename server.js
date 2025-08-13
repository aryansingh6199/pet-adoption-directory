import Pet from "./models/Pet.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);


const app = express();
app.use(express.json());
// Get all pets
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();  // fetch all pets from MongoDB
    res.json(pets);                 // return as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new pet
app.post("/api/pets", async (req, res) => {
  try {
    const newPet = new Pet(req.body);   // create new pet from request body
    const savedPet = await newPet.save(); // save to MongoDB
    res.status(201).json(savedPet);     // return saved pet
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("🐾 Pet Adoption API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
