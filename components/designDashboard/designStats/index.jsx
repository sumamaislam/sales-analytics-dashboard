import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function DesignStats({designAndDieAnalytics}) {
  const designGraph = designAndDieAnalytics?.data?.designGraph
  const designQuickStats = designAndDieAnalytics?.data?.designQuickStats
    // Sample data for the chart
  const [hoveredMonth, setHoveredMonth] = useState(null)
  const [hoveredData, setHoveredData] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Your monthly design data
  // const monthlyDesignData = [
  //   {
  //       "month": 1,
  //       "month_name": "January",
  //       "completed_designs": 255,
  //       "qc_designs": "255"
  //   },
  //   {
  //       "month": 2,
  //       "month_name": "February",
  //       "completed_designs": 237,
  //       "qc_designs": "237"
  //   },
  //   {
  //       "month": 3,
  //       "month_name": "March",
  //       "completed_designs": 329,
  //       "qc_designs": "329"
  //   },
  //   {
  //       "month": 4,
  //       "month_name": "April",
  //       "completed_designs": 272,
  //       "qc_designs": "272"
  //   },
  //   {
  //       "month": 5,
  //       "month_name": "May",
  //       "completed_designs": 263,
  //       "qc_designs": "263"
  //   },
  //   {
  //       "month": 6,
  //       "month_name": "June",
  //       "completed_designs": 287,
  //       "qc_designs": "287"
  //   },
  //   {
  //       "month": 7,
  //       "month_name": "July",
  //       "completed_designs": 374,
  //       "qc_designs": "363"
  //   },
  //   {
  //       "month": 8,
  //       "month_name": "August",
  //       "completed_designs": 314,
  //       "qc_designs": "291"
  //   },
  //   {
  //       "month": 9,
  //       "month_name": "September",
  //       "completed_designs": 196,
  //       "qc_designs": "188"
  //   },
  //   {
  //       "month": 10,
  //       "month_name": "October",
  //       "completed_designs": 0,
  //       "qc_designs": 0
  //   },
  //   {
  //       "month": 11,
  //       "month_name": "November",
  //       "completed_designs": 0,
  //       "qc_designs": 0
  //   },
  //   {
  //       "month": 12,
  //       "month_name": "December",
  //       "completed_designs": 0,
  //       "qc_designs": 0
  //   }
  // ];

  // Fallback data when designGraph is not available
  const fallbackData = [
    { month: 'Jan', completed: 255, qc: 255 },
    { month: 'Feb', completed: 237, qc: 237 },
    { month: 'Mar', completed: 329, qc: 329 },
    { month: 'Apr', completed: 272, qc: 272 },
    { month: 'May', completed: 263, qc: 263 },
    { month: 'Jun', completed: 287, qc: 287 },
    { month: 'Jul', completed: 374, qc: 363 },
    { month: 'Aug', completed: 314, qc: 291 },
    { month: 'Sep', completed: 321, qc: 88 },
    { month: 'Oct', completed: 0, qc: 0 },
    { month: 'Nov', completed: 0, qc: 0 },
    { month: 'Dec', completed: 0, qc: 0 }
  ];

  // Transform data to match chart format
  const allData = designGraph?.map(item => ({
    month: item.month_name.substring(0, 3), // Convert to short month names
    completed: item.completed_designs,
    qc: parseInt(item.qc_designs) // Convert string to number
  })) || fallbackData;

  // Show only last 6 months, or all if less than 6
  const data = allData.slice(-6)

//   // Function to add new month data and maintain 6-month window
//   const addNewMonth = (newMonthData) => {
//     const updatedData = [...allData, newMonthData]
//     return updatedData.slice(-6) // Keep only last 6 months
//   }

  // Example usage: If you want to add a new month
  // const newData = addNewMonth({ month: 'Jan2024', completed: 600, qc: 400 })

  // Calculate max value from actual data
  const maxValue = allData && allData.length > 0 
    ? Math.max(...allData.map(item => Math.max(item.completed, item.qc))) + 150
    : 500; // Fallback value
  const yAxisTicks = [0, Math.floor(maxValue * 0.2), Math.floor(maxValue * 0.4), Math.floor(maxValue * 0.6), Math.floor(maxValue * 0.8), maxValue]

  const getBarHeight = (value) => {
    return (value / maxValue) * 100
  }

  const handleBarHover = (month, completed, qc, event) => {
    setHoveredMonth(month)
    setHoveredData({ completed, qc })
  }

  const handleBarLeave = () => {
    setHoveredMonth(null)
    setHoveredData(null)
  }

  // Auto show tooltips one by one
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length
        const item = data[nextIndex]
        setHoveredMonth(item.month)
        setHoveredData({ completed: item.completed, qc: item.qc })
        return nextIndex
      })
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [data])
    // Use real design quick stats data with fallback
    const designQuickStatsData = designQuickStats || {
        "inProcess": {
            "count": 330,
            "bar_percentage": 165,
            "comparison_percentage": 3.8
        },
        "cancelled": {
            "count": 89,
            "bar_percentage": 44.5,
            "comparison_percentage": -30.5
        },
        "completed": {
            "count": 196,
            "bar_percentage": 98,
            "comparison_percentage": -37.6
        }
    };
    
    const stats = [
        {
            title: 'In Process',
            value: designQuickStatsData.inProcess?.count?.toString() || '0',
            change: designQuickStatsData.inProcess?.comparison_percentage >= 0 ? 
                   `+${designQuickStatsData.inProcess.comparison_percentage.toFixed(1)}%` : 
                   `${designQuickStatsData.inProcess.comparison_percentage.toFixed(1)}%`,
            changeColor: designQuickStatsData.inProcess?.comparison_percentage >= 0 ? 'text-green-500' : 'text-red-500'
        },
        {
            title: 'Cancelled',
            value: designQuickStatsData.cancelled?.count?.toString() || '0',
            change: designQuickStatsData.cancelled?.comparison_percentage >= 0 ? 
                   `+${designQuickStatsData.cancelled.comparison_percentage.toFixed(1)}%` : 
                   `${designQuickStatsData.cancelled.comparison_percentage.toFixed(1)}%`,
            changeColor: designQuickStatsData.cancelled?.comparison_percentage >= 0 ? 'text-green-500' : 'text-red-500'
        },
        {
            title: 'Completed',
            value: designQuickStatsData.completed?.count?.toString() || '0',
            change: designQuickStatsData.completed?.comparison_percentage >= 0 ? 
                   `+${designQuickStatsData.completed.comparison_percentage.toFixed(1)}%` : 
                   `${designQuickStatsData.completed.comparison_percentage.toFixed(1)}%`,
            changeColor: designQuickStatsData.completed?.comparison_percentage >= 0 ? 'text-green-500' : 'text-red-500'
        }
    ]

    return (
        <div className='bg-background-secondary xl-plus:rounded-[64px] w-full rounded-[10px] xl-plus:p-[45px] p-4 h-full'>
            {/* Header */}
            <div className='mb-6'>
                <h2 className='text-foreground xl-plus:text-[42px] text-[20px] font-bold'>Design Quick Stats</h2>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-3 items-center xl-plus:gap-4 gap-2 xl-plus:mb-8 mb-6'>
                {stats.map((stat, index) => (
                    <div key={index} className='bg-card xl-plus:rounded-[19px] rounded-[8px] xl-plus:p-[15px] p-[10px]'>
                        <h3 className='text-muted-foreground xl-plus:text-[32px] text-[14px] font-medium mb-2'>{stat.title}</h3>
                        <div className='flex items-center gap-4'>
                            <span className='text-foreground xl-plus:text-[45px] text-[24px] font-bold'>{stat.value}</span>
                            <span className={`xl-plus:text-[40px] text-[14px] font-semibold ${stat.changeColor}`}>
                                {stat.change}
                            </span>
                           
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className='h-[25vh] w-full'>
              
      
      {/* Chart Container */}
      <div className="relative">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between">
          {yAxisTicks.slice().reverse().map((tick, index) => (
            <div 
              key={tick} 
              className="text-gray-400 xl-plus:text-[32px] text-[12px] flex items-center justify-center"
              style={{ 
                height: `${100 / (yAxisTicks.length - 1)}%`,
                position: 'relative'
              }}
            >
              {tick >= 1000 ? `${Math.floor(tick/1000)}k` : tick}
            </div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute left-12 right-0 h-full">
          {yAxisTicks.map((tick, index) => (
            <div
              key={tick}
              className="absolute w-full border-t border-gray-700"
              style={{ 
                top: `${((yAxisTicks.length - 1 - index) / (yAxisTicks.length - 1)) * 100}%`,
                height: '1px'
              }}
            />
          ))}
        </div>

        {/* Chart Area */}
        <div className=" h-full  flex  justify-between w-full xl-plus:px-20 px-12 gap-2">
          {data && data.length > 0 ? data.map((item, index) => (
            <div key={item.month} className="flex flex-col items-center relative group ">
              {/* Bars Container */}
              <div className="flex items-end xl-plus:h-[21vh] h-[17vh] relative  ">
                {/* Completed Bar - positioned on top */}
                <div
                  className="xl-plus:w-20 w-8 bg-lime-500 xl-plus:rounded-t-[9px] rounded-t-[3px] transition-all duration-200 hover:bg-lime-400 cursor-pointer relative z-20"
                  style={{ height: `${getBarHeight(item.completed)}%` }}
                  onMouseEnter={(e) => handleBarHover(item.month, item.completed, item.qc, e)}
                  onMouseLeave={handleBarLeave}
                />
                
                {/* Qc Bar - positioned behind the green bar */}
                <div
                  className="xl-plus:w-20 w-8 bg-blue-500 xl-plus:rounded-t-[9px] rounded-t-[3px] transition-all duration-200 xl-plus:left-[35px] left-[25px] hover:bg-blue-400 cursor-pointer absolute z-10"
                  style={{ 
                    height: `${getBarHeight(item.qc)}%`,
                   // Half the width of the bar to create overlap
                  }}
                  onMouseEnter={(e) => handleBarHover(item.month, item.completed, item.qc, e)}
                  onMouseLeave={handleBarLeave}
                />
              </div>

              {/* Month Label */}
              <div className="text-gray-400 xl-plus:text-[32px] text-[12px] mt-4">{item.month}</div>

              {/* Tooltip */}
              {hoveredMonth === item.month && hoveredData && (
                <div 
                  className="absolute bg-gray-800 text-white px-6 py-2 rounded-md shadow-xl z-50"
                  style={{ 
                    top: `${100 - getBarHeight(Math.max(item.completed, item.qc)) - 2}%`,
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-100%)'
                  }}
                >
                  <div className="flex items-center justify-center gap-6">
                    <span className="text-lime-400 xl-plus:text-[40px] text-[13px] font-bold">{hoveredData.completed}</span>
                    <span className="text-blue-400 xl-plus:text-[40px] text-[13px] font-bold">{hoveredData.qc}</span>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          )) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              <p className="text-lg">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-lime-500 rounded"></div>
          <span className="text-gray-300 xl-plus:text-[34px] text-[14px]">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-300 xl-plus:text-[34px] text-[14px]">Qc</span>
        </div>
      </div>
    </div>
            </div>
        
    )
}

export default DesignStats