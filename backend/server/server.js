// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/contact", (req, res) => {
  const { name, email, petType, message } = req.body;
  console.log("📩 New Contact Form Submission:", req.body);

  // For now, just send back confirmation
  res.json({ success: true, message: "Form received successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
