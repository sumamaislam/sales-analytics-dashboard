import axios from "axios";

const LARAVEL_API_URL = 'https://erp.print247.us/api/analytics/design-analytics';

export const getDesignAndDieAnalytics = async () => {
    try {
      console.log('🔄 Fetching design and die analytics data from Laravel API...');
      
      const response = await axios.get(LARAVEL_API_URL, {
        timeout: 10000, // 10 seconds timeout
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': 'Bearer your-token-here'
        }
      });
  
      if (response.status === 200) {
        console.log('✅ Design and die analytics data fetched successfully');
        return {
          success: true,
          data: response.data,
          timestamp: new Date()
        };
      } else {
        throw new Error(`API returned status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error fetching design and die analytics data:', error.message);
      return {
        success: false,
        error: error.message,
        message: "Failed to fetch design and die analytics data"
      };
    }
  };

