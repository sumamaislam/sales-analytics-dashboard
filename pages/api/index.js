import mongoose from 'mongoose';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  res.status(200).json({
    message: 'Welcome to Analytics Dashboard API',
    endpoints: {
      health: '/api/health',
      salesAnalytics: '/api/sales-analytics',
      salesSummary: '/api/sales-summary',
      designAndDieAnalytics: '/api/design-and-die-analytics',
      webhook: '/api/webhook/laravel-update',
      notifications: '/api/notifications',
      message: '/api/message'
    },
    environment: process.env.NODE_ENV || 'development',
    database: {
      connected: mongoose.connection.readyState === 1
    }
  });
}

