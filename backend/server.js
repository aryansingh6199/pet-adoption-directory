// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

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

  // For now, just send back confirmation
  res.json({ success: true, message: "Form received successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
