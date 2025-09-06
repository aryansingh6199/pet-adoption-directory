// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import petsRoutes from "./routes/pets.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Contact form route
app.post("/api/contact", (req, res) => {
  const { name, email, petType, message } = req.body;
  console.log("📩 New form submission:", { name, email, petType, message });

  res.json({ success: true, message: "Form received successfully!" });
});

// Pets API routes
app.use("/api/pets", petsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

