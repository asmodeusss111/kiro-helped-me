const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Import passport configuration
require('./config/passport')(passport);

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/projects');

// Use routes
app.use('/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'DevAI Studio Backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});
