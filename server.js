import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Correct route: /api/contact
app.post("/api/contact", (req, res) => {
  console.log("📩 Received contact form data:", req.body);

  // Respond back to frontend
  res.json({ success: true, message: "Message received successfully!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
