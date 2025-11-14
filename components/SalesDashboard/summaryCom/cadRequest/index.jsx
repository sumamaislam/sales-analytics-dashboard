import React from 'react'
import CustomChart from '../../summaryCom/cadRequest/customChart'



function CadRequest({ salesSummary }) {
  // // Fallback data if no socket data
  // const fallbackData = {
  //   data: {
  //     cadRequestAnalytics: {
  //       dailyData: {
  //         "2": 44, "3": 65, "4": 69, "5": 48, "6": 29, "8": 17, "9": 74, "10": 67,
  //         "11": 41, "12": 42, "13": 50, "15": 40, "16": 81, "17": 86, "18": 86,
  //         "19": 68, "20": 26, "22": 46, "23": 11
  //       },
  //       weeklyReport: [
  //         { day: 7, amount: 255, percentage: "-16%" },
  //         { day: 14, amount: 291, percentage: "+4%" },
  //         { day: 21, amount: 387, percentage: "+25%" }
  //       ]
  //     }
  //   }
  // }
  
  const data = salesSummary 
  console.log('CAD Request - Full Data:', data)
  
  // Try different possible data structures
  const cadData = data?.data?.cadRequestsAnalytics || data?.data?.cadRequestAnalytics || data?.cadRequestsAnalytics || data?.cadRequestAnalytics || {}
  console.log('CAD Request - CAD Data:', cadData)
  
  // Extract data from the new structure
  const dailyData = cadData?.dailyData || {}
  const weeklyReport = cadData?.weeklyReport || []
  
  console.log('CAD Request - Extracted Data:', {
    dailyDataKeys: Object.keys(dailyData),
    dailyDataSample: Object.entries(dailyData).slice(0, 3),
    weeklyReportLength: weeklyReport.length,
    weeklyReportSample: weeklyReport.slice(0, 2),
    hasDailyData: Object.keys(dailyData).length > 0,
    hasWeeklyReport: weeklyReport.length > 0,
    salesSummaryExists: !!salesSummary
  })
  
  // Convert daily data to chart format
  const convertDailyDataToChart = (dailyData) => {
    const chartData = []
    for (let day = 1; day <= 30; day++) {
      const value = dailyData[day.toString()] || 0
      const hasReport = weeklyReport.some(report => report.day === day)
      const reportType = hasReport ? 
        (weeklyReport.find(report => report.day === day)?.percentage?.includes('+') ? 'positive' : 'negative') : 
        null
      
      chartData.push({
        period: day,
        lineValue: value,
        barValue: Math.round(value * 0.3), // Bar is 30% of line value
        showReport: hasReport,
        type: reportType
      })
    }
    return chartData
  }
  

  // Convert real data to chart format
  const realChartData = convertDailyDataToChart(dailyData)
  const realReportData = weeklyReport.map(report => ({
    day: report.day,
    amount: report.amount,
    percentage: report.percentage,
    type: report.percentage.includes('+') ? 'positive' : 'negative'
  }))
  
  // Calculate weekly total from daily data
  const weeklyTotal = Object.values(dailyData).reduce((sum, value) => sum + value, 0)
  
  // Use only real data, no fallback
  const finalChartData = realChartData
  const finalReportData = realReportData

  console.log('CAD Request Debug:', {
    dailyData,
    weeklyReport,
    realChartData: realChartData.slice(0, 5), // First 5 items
    finalChartData: finalChartData.slice(0, 5), // First 5 items
    weeklyTotal,
    hasRealData: Object.keys(dailyData).length > 0
  })

  // Show loading or empty state if no data
  if (!salesSummary || Object.keys(dailyData).length === 0) {
    console.log('CAD Request - Showing empty state:', {
      salesSummary: !!salesSummary,
      dailyDataKeys: Object.keys(dailyData),
      cadData: cadData
    })
    return (
      <div className="w-full h-full rounded-[19px] p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground text-lg mb-2">No CAD Request Data Available</div>
          <div className="text-sm text-muted-foreground">Waiting for data from server...</div>
        </div>
      </div>
    )
  }

  return (
    <CustomChart 
      chartData={finalChartData}
      reportData={finalReportData}
      weeklyTotal={weeklyTotal}
    />
  )
}

export default CadRequest