import React, { useMemo } from 'react'
import CustomChart from './customChart'
import { useSalesAnalytics } from '@/components/socket/useSocketData'

function CadRequest({ 
  chartData, // Chart data from API
  weeklyTotal = 50, 
  reportData, // Array with {amount, day, percentage} from API
  currentDay = 18, // Current day (1-30)
  currentUserIndex = 0
}) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  
  // Memoize cadRequestAnalytics extraction
  const cadRequestAnalytics = useMemo(() => {
    if (!salesDataa?.data?.salesAnalyticsUserWise) return [];
    
    return Object.values(salesDataa.data.salesAnalyticsUserWise).map(
      (item) => item.cadRequestsAnalytics
    )
  }, [salesDataa])
  
  const currentUserData = cadRequestAnalytics[currentUserIndex]
  console.log(currentUserData, "cadRequestAnalytics");
  
  // Extract chart data from API
  const apiChartData = useMemo(() => {
    if (!currentUserData) return null;
    
    // Check if currentUserData has dailyData
    if (currentUserData.dailyData) {
      // Convert dailyData to chart format
      const chartData = [];
      
      // Create data for all 30 days
      for (let day = 1; day <= 30; day++) {
        const dayStr = day.toString();
        const value = currentUserData.dailyData[dayStr] || 0;
        
        chartData.push({
          period: day,
          lineValue: value,
          barValue: value,
          showReport: day % 7 === 0 // Show report every 7th day
        });
      }
      
      return chartData;
    }
    
    return null;
  }, [currentUserData]);
  
  // Extract report data from API
  const apiReportData = useMemo(() => {
    if (!currentUserData) return null;
    
    if (currentUserData.weeklyReport) {
      return currentUserData.weeklyReport;
    }
    
    return null;
  }, [currentUserData]);
  // Simple array data - show all 30 days


  // Simple report data array - only weekly reports

  // Use API data first, then provided props, then fallback to static data
  const finalChartData = apiChartData || chartData || []
  const finalReportData = apiReportData || reportData || []
  
  // Calculate weekly total from daily data
  const calculatedWeeklyTotal = useMemo(() => {
    if (finalChartData && finalChartData.length > 0) {
      return finalChartData.reduce((sum, day) => sum + (day.barValue || 0), 0);
    }
    return weeklyTotal; // Fallback to prop value
  }, [finalChartData, weeklyTotal]);
  


  return (
    <CustomChart 
      chartData={finalChartData}
      reportData={finalReportData}
      weeklyTotal={calculatedWeeklyTotal}
    />
  )
}

export default CadRequest