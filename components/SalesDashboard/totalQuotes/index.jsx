import React, { useMemo, useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useSalesAnalytics } from '@/components/socket/useSocketData'

function TotalQuotes({ currentUserIndex = 0 }) {
  const [isShimmering, setIsShimmering] = useState(false)
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")

  // Memoize saleAnalytics extraction
  const saleAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
      (item) => item.totalQuotesAnalytics
    )
  }, [salesDataa])

  const currentUserData = saleAnalytics[currentUserIndex]
  console.log(currentUserData, "ali");

  // Handle shimmer effect when user index changes
  // useEffect(() => {
  //   setIsShimmering(true)
  //   const timer = setTimeout(() => {
  //     setIsShimmering(false)
  //   }, 2000) // 1 second shimmer effect
    
  //   return () => clearTimeout(timer)
  // }, [currentUserIndex])

  // Process API data for charts
  const processChartData = () => {
    if (!currentUserData) {
      // Show empty data when no API data
      return {
        laptop: [
          { name: 'Cancelled', value: 0, fill: '#EF4444', percentage: 0 },
          { name: 'In Process', value: 0, fill: '#FDE047', percentage: 0 },
          { name: 'Approved', value: 0, fill: '#10B981', percentage: 0 },
        ],
        large: [
          { name: 'Cancelled', value: 0, fill: '#EF4444', percentage: 0 },
          { name: 'In Process', value: 0, fill: '#FDE047', percentage: 0 },
          { name: 'Approved', value: 0, fill: '#10B981', percentage: 0 },
        ],
        total: 0
      }
    }

    // Safely extract and validate data
    const approved = Math.max(0, parseInt(currentUserData.approved?.count) || 0)
    const inProcess = Math.max(0, parseInt(currentUserData.inProcess?.count) || 0)
    const cancelled = Math.max(0, parseInt(currentUserData.cancelled?.count) || 0)
    const total = Math.max(0, parseInt(currentUserData.total?.count) || 0)
    
    // Get donut data for graph with proper validation
    const donutData = currentUserData.donutData || {}
    const approvedDonut = Math.max(0, parseFloat(donutData.approved) || 0)
    const inProcessDonut = Math.max(0, parseFloat(donutData.inProcess) || 0)
    const cancelledDonut = Math.max(0, parseFloat(donutData.cancelled) || 0)

    // Calculate total for normalization
    const totalDonut = approvedDonut + inProcessDonut + cancelledDonut
    
    // Normalize percentages to add up to 100%
    let approvedPercentage = 0
    let inProcessPercentage = 0
    let cancelledPercentage = 0
    
    if (totalDonut > 0) {
      approvedPercentage = Math.round((approvedDonut / totalDonut) * 100)
      inProcessPercentage = Math.round((inProcessDonut / totalDonut) * 100)
      cancelledPercentage = Math.round((cancelledDonut / totalDonut) * 100)
      
      // Adjust for rounding errors to ensure total is exactly 100%
      const totalRounded = approvedPercentage + inProcessPercentage + cancelledPercentage
      if (totalRounded !== 100) {
        const difference = 100 - totalRounded
        // Add the difference to the largest segment
        if (approvedPercentage >= inProcessPercentage && approvedPercentage >= cancelledPercentage) {
          approvedPercentage += difference
        } else if (inProcessPercentage >= cancelledPercentage) {
          inProcessPercentage += difference
        } else {
          cancelledPercentage += difference
        }
      }
    }

    // If all values are 0, show empty data (not sample data)
    if (total === 0 || (approvedPercentage === 0 && inProcessPercentage === 0 && cancelledPercentage === 0)) {
      return {
        laptop: [],
        large: [],
        total: total
      }
    }

    // Filter out segments with 0 values to only show segments with data
    const allSegments = [
      { name: 'Cancelled', value: cancelledPercentage, fill: '#EF4444', percentage: cancelledPercentage },
      { name: 'In Process', value: inProcessPercentage, fill: '#FDE047', percentage: inProcessPercentage },
      { name: 'Approved', value: approvedPercentage, fill: '#10B981', percentage: approvedPercentage },
    ]
    
    const filteredSegments = allSegments.filter(segment => segment.value > 0)

    return {
      laptop: filteredSegments,
      large: filteredSegments,
      total: total
    }
  }

  const chartData = processChartData()
  const chartDataLaptop = chartData.laptop
  const chartDataLarge = chartData.large
  const totalQuotes = chartData.total

  return (
    <div className={`bg-card 2xl:h-[15vh] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2 relative overflow-hidden`}>
      {/* Shimmer overlay */}
      {/* {isShimmering && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )} */}
      {/* Laptop View - Shows on screens < 2000px */}
      <div className='flex justify-between h-full xl-plus:hidden'>
        {/* Left Section - Text Data */}
        <div className='text-foreground flex-1'>
          <h3 className='text-[20px] font-medium'>Total Quotes</h3>
          
          {/* Main Number with Growth Indicator */}
          <div className='flex items-center gap-2'>
            <span className='text-[32px] font-normal'>{totalQuotes}</span>
            <div className='flex items-center gap-1 text-[18px]'>
              {currentUserData?.total?.comparison_percentage >= 0 ? (
                <TrendingUp className={`w-[16px] h-[16px] text-[#7CCF00]`} />
              ) : (
                <TrendingDown className={`w-[16px] h-[16px] text-red-500`} />
              )}
              <span className={`font-normal ${currentUserData?.total?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>
                {currentUserData?.total?.comparison_percentage > 0 ? '+' : ''}{currentUserData?.total?.comparison_percentage?.toFixed(2) || '0.00'}%
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className='mt-2'>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-green-500 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>Approved: {currentUserData?.approved?.count || 0}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-yellow-400 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>In Process: {currentUserData?.inProcess?.count || 0}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-red-500 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>Cancelled: {currentUserData?.cancelled?.count || 0}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Donut Chart */}
        <div className='flex-1 flex justify-end items-center'>
          <div className="w-[150px] h-[150px]">
            {chartDataLaptop.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartDataLaptop}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                    stroke="none"
                    label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
                      // Don't show labels for very small percentages
                      // if (percentage < 5) return null;
                      
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text 
                          x={x} 
                          y={y} 
                          fill="black" 
                          textAnchor="middle" 
                          dominantBaseline="central"
                          fontSize="12"
                          fontWeight="bold"
                          stroke="black"
                          strokeWidth="0.5"
                        >
                          {`${percentage}%`}
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {chartDataLaptop.map((entry, index) => (
                      <Cell key={`cell-laptop-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[110px] h-[110px] rounded-full border-4 border-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Data</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Large Screen View - Shows on screens >= 2000px */}
      <div className='hidden xl-plus:flex justify-between h-full'>
        {/* Left Section - Text Data */}
        <div className='text-foreground flex-1'>
          <h3 className='text-[38px] font-medium'>Total Quotes</h3>
          
          {/* Main Number with Growth Indicator */}
          <div className='flex items-center gap-3'>
            <span className='text-[60px] font-normal'>{totalQuotes}</span>
            <div className='flex items-center gap-1 text-[40px]'>
              {currentUserData?.total?.comparison_percentage >= 0 ? (
                <TrendingUp className={`w-[29px] h-[29px] ml-3 text-[#7CCF00]`} />
              ) : (
                <TrendingDown className={`w-[29px] h-[29px] ml-3 text-red-500`} />
              )}
              <span className={`ml-2 font-normal ${currentUserData?.total?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>
                {currentUserData?.total?.comparison_percentage > 0 ? '+' : ''}{currentUserData?.total?.comparison_percentage?.toFixed(2) || '0.00'}%
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className='mt-0'>
            <div className='flex items-center gap-3'>
              <div className='w-[29px] h-[29px] bg-green-500 rounded'></div>
              <span className='text-[34px] font-normal text-foreground'>Approved: {currentUserData?.approved?.count || 0}</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-[29px] h-[29px] bg-yellow-400 rounded'></div>
              <span className='text-[34px] font-normal text-foreground'>In Process: {currentUserData?.inProcess?.count || 0}</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-[29px] h-[29px] bg-red-500 rounded'></div>
              <span className='text-[34px] font-normal text-foreground'>Cancelled: {currentUserData?.cancelled?.count || 0}</span>
            </div>
          </div>
        </div>

                 {/* Right Section - Donut Chart */}
         <div className='flex-1 flex justify-end items-center'>
           <div className="w-[290px] h-[290px]">
             {chartDataLarge.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                    data={chartDataLarge}
                     cx="50%"
                     cy="50%"
                     innerRadius={70}
                     outerRadius={140}
                     startAngle={90}
                     endAngle={450}
                     dataKey="value"
                     stroke="none"
                     label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
                      // Don't show labels for very small percentages
                      // if (percentage < 5) return null;
                       
                       const RADIAN = Math.PI / 180;
                       const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                       const x = cx + radius * Math.cos(-midAngle * RADIAN);
                       const y = cy + radius * Math.sin(-midAngle * RADIAN);
                       
                       return (
                         <text 
                           x={x} 
                           y={y} 
                           fill="black" 
                           textAnchor="middle" 
                           dominantBaseline="central"
                           fontSize="26"
                           fontWeight="bold"
                           stroke="black"
                           strokeWidth="1"
                         >
                           {`${percentage}%`}
                         </text>
                       );
                     }}
                     labelLine={false}
                   >
                    {chartDataLarge.map((entry, index) => (
                      <Cell key={`cell-large-${index}`} fill={entry.fill} />
                    ))}
                   </Pie>
                 </PieChart>
               </ResponsiveContainer>
             ) : (
               <div className="w-full h-full flex items-center justify-center">
                 <div className="w-[210px] h-[210px] rounded-full border-4 border-gray-300 flex items-center justify-center">
                   <span className="text-gray-500 text-2xl">No Data</span>
                 </div>
               </div>
             )}
           </div>
         </div>
      </div>
    </div>
  )
}

export default TotalQuotes
