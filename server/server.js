/**
 * Smart Portfolio - Express Server
 * 
 * Main entry point for the backend API with rate limiting and CORS.
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const chatRoutes = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy - Required for rate limiting behind Koyeb/Vercel proxy
app.set('trust proxy', 1);

// ============================================================================
// MIDDLEWARE
// ============================================================================

// CORS - Allow frontend to communicate
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        // Check if origin is in allowed list or matches Vercel pattern
        if (allowedOrigins.includes(origin) ||
            origin.includes('vercel.app') ||
            origin.includes('localhost')) {
            return callback(null, true);
        }

        console.log('CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

// JSON body parser
app.use(express.json());

// Rate limiting - Protect Gemini API from abuse
const chatLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 10, // 10 requests per minute per IP
    message: {
        error: 'Whoa there! 🐎 Too many messages. Please wait a minute before trying again.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to chat endpoint
app.use('/api/chat', chatLimiter);

// ============================================================================
// ROUTES
// ============================================================================

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Root route for health checks
app.get('/', (req, res) => {
    res.send('Smart Portfolio API is running 🚀');
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat routes
app.use('/api/chat', chatRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
  🚀 Smart Portfolio Server Running!
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📍 Local:    http://localhost:${PORT}
  📍 Health:   http://localhost:${PORT}/api/health
  📍 Chat:     http://localhost:${PORT}/api/chat
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
});
