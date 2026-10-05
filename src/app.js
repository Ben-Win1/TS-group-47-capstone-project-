const express = require('express');
const ApiError = require('./utils/ApiError');
const errorHandler = require('./middleware/error.middleware');

// Route Imports
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const databaseRoutes = require('./routes/database.routes');
const apiKeyRoutes = require('./routes/apiKey.routes');
const storageRoutes = require('./routes/storage.routes');
const fileRoutes = require('./routes/file.routes');
const webhookRoutes = require('./routes/webhook.routes');
const notificationRoutes = require('./routes/notification.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Core API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/database', databaseRoutes);
app.use('/api/v1/keys', apiKeyRoutes);
app.use('/api/v1/storage', storageRoutes);
app.use('/api/v1/files', fileRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, status: 'UP', timestamp: new Date().toISOString() });
});

// 404 Route Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handling Middleware
app.use(errorHandler);

module.exports = app;