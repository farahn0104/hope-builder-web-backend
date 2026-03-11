require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Route imports
const contactRoutes = require('./routes/contactRoutes');
// const volunteerRoutes = require('./routes/volunteerRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const donationRoutes = require('./routes/donationRoutes');
// const blogRoutes = require('./routes/blogRoutes');
const eventRoutes = require('./routes/eventRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const impactRoutes = require('./routes/impactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const annualReportRoutes = require('./routes/annualReportRoutes');
const programRoutes = require('./routes/programRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const teamRoutes = require('./routes/teamRoutes');
const path = require('path');

const app = express();

// Connect to Database
connectDB();

// CORS Policy - Updated for better production compatibility
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(o => o !== '')
  : ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    
    // Normalize origin by removing trailing slash for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");
    
    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.error(`CORS Blocked: Origin "${origin}" is not in allowed list:`, allowedOrigins);
      callback(new Error('Cross-Origin Request Blocked by NGO Backend Policy'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Important for some browser compatibility
}));

// Debug route to verify CORS settings (remove in production if sensitive)
app.get('/api/debug-cors', (req, res) => {
  res.json({
    status: 'active',
    allowedOriginsCount: allowedOrigins.length,
    nodeEnv: process.env.NODE_ENV,
    isLocal: !process.env.ALLOWED_ORIGINS
  });
});

// Security Middleware (Helmet should be after CORS to avoid header conflicts)
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // Increased for better user experience
});
app.use('/api', limiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Data Sanitization against XSS
app.use(xss());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount Routes
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/donate', donationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/impact', impactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/reports', annualReportRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/teammembers', teamRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('NGO Backend API is running...');
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
