import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pet from "./models/Pet.js";

dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Contact form route
app.post("/api/contact", (req, res) => {
  console.log("📩 Received contact form data:", req.body);
  res.json({ success: true, message: "Message received successfully!" });
});

// 🐾 Pets API routes

// Get all pets
app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find(); // fetch all pets from MongoDB
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new pet
app.post("/api/pets", async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("🐾 Pet Adoption API is running...");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
