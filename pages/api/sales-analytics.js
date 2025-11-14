import { getSalesAnalytics } from '../../lib/controllers/salesAnalyticsController.js';
import connectDB from '../../lib/db.js';

export default async function handler(req, res) {
  // Connect to database
  await connectDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const analyticsData = await getSalesAnalytics();
    res.status(200).json(analyticsData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch sales analytics"
    });
  }
}

