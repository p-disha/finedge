const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(require('./middleware/logger')); // Custom logger
app.use(require('./middleware/rateLimiter')); // Rate Limiter

// Health Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'Server is running', timestamp: new Date() });
});

// Routes
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Finance Tracker API');
});

// Global Error Handler
app.use(require('./middleware/errorHandler'));

module.exports = app;
