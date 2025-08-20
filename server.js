/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const xss = require('xss-clean');
const { connectDB } = require('./config/db');
const petRoutes = require('./routes/pets.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// --- Security & Hardening ---
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(morgan('dev'));

// CORS - allow only our frontend origin
const allowedOrigin = process.env.FRONTEND_ORIGIN;
app.use(cors({
  origin: function (origin, callback) {
    // Allow tools like Postman (no origin) in dev, but block unexpected origins in prod
    if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
    if (origin === allowedOrigin) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Routes
app.use('/api/pets', petRoutes);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

// Start server after DB connection
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DB', err);
    process.exit(1);
  });
