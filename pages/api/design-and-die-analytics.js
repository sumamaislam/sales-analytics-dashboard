import { getDesignAndDieAnalytics } from '../../lib/controllers/designAndDieController.js';
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
    const designAndDieAnalytics = await getDesignAndDieAnalytics();
    res.status(200).json(designAndDieAnalytics);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch design and die analytics"
    });
  }
}

