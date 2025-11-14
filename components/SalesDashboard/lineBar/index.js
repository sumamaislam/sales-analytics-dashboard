// // import { useSalesAnalytics } from '@/components/socket/useSocketData';
// // import React, { useState, useEffect } from 'react'
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// // function LineBar({ currentUserIndex = 0 }) {
// //     const { data: salesDataa, loading, error } = useSalesAnalytics()
// //     console.log(salesDataa, "salesData");
    
// //     // State for auto tooltip
// //     const [hoveredMonth, setHoveredMonth] = useState(null);
// //     const [hoveredData, setHoveredData] = useState(null);
    
// //     // Extract sales analytics data from API
// //     const saleAnalytics = Object.values(salesDataa?.data?.salesAnalyticsUserWise)?.map((item) => item.salesAnalytics) || [];
// //     console.log(saleAnalytics, "Samama");
    
// //     // Process data for chart
// //     const processChartData = () => {
// //         if (!saleAnalytics || saleAnalytics.length === 0) {
// //             // Fallback data if no API data
// //             return [
// //                 { month: 'Jan', monthly: 100, yearly: 8 },
// //                 { month: 'Feb', monthly: 15, yearly: 50 },
// //                 { month: 'Mar', monthly: 8, yearly: 12 },
// //                 { month: 'Apr', monthly: 6, yearly: 9 },
// //                 { month: 'May', monthly: 10, yearly: 15 },
// //                 { month: 'Jun', monthly: 100, yearly: 50 },
// //                 { month: 'Jul', monthly: 9, yearly: 80 },
// //                 { month: 'Aug', monthly: 10, yearly: 10 },
// //                 { month: 'Sep', monthly: 11, yearly: 16 },
// //                 { month: 'Oct', monthly: null, yearly: null },
// //                 { month: 'Nov', monthly: null, yearly: null },
// //                 { month: 'Dec', monthly: null, yearly: null }
// //             ];
// //         }
        
// //         // Get current user's data based on index
// //         const currentUserData = saleAnalytics[currentUserIndex];
        
// //         if (!currentUserData) {
// //             return [];
// //         }
        
// //         // Convert monthly data to chart format
// //         const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
// //         return months.map((month, index) => {
// //             const monthNum = (index + 1).toString();
// //             return {
// //                 month: month,
// //                 monthly: currentUserData.thisYear?.[monthNum] || 0,
// //                 yearly: currentUserData.lastYear?.[monthNum] || 0
// //             };
// //         });
// //     };
    
// //     // No need for auto-rotation as currentUserIndex comes from parent
    
// //     const salesData = processChartData();
// // const CustomTooltipLaptop = ({ active, payload, label }) => {
// //   if (active && payload && payload.length) {
// //       return (
// //           <div className="bg-[#374151] text-foreground px-2 py-1 rounded-lg text-[12px] shadow-lg border border-white/10">
// //               <div className='font-medium text-white'>{label}</div>
// //               <div className='text-pink-400'>Monthly: {payload[0].value}</div>
// //               <div className='text-blue-400'>Yearly: {payload[1].value}</div>
// //           </div>
// //       )
// //   }
// //   return null
// // }

// // const CustomTooltipLarge = ({ active, payload, label }) => {
// //   if (active && payload && payload.length) {
// //       return (
// //           <div className="bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[20px] shadow-lg border border-white/10">
// //               <div className='font-medium text-white'>{label}</div>
// //               <div className='text-pink-400'>Monthly: {payload[0].value}</div>
// //               <div className='text-blue-400'>Yearly: {payload[1].value}</div>
// //           </div>
// //       )
// //   }
// //   return null
// // }
// //   return (
// //     <div>
// //       <div className='bg-card 2xl:h-[30.5vh] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2'>
// //         {/* Laptop View - Shows on screens < 2000px */}
// //         <div className='xl-plus:hidden'>
// //           <div className='flex justify-between items-center mb-4'>
// //             <div className='flex items-center gap-2'>
// //               <h3 className='2xl:text-[20px] text-[14px] font-medium text-foreground'>Sales Analytics</h3>
// //               <div className='px-2 border border-[#3B3B3B] rounded-[10px]'>
// //                 <p className='text-foreground 2xl:text-[16px] text-[12px]'>2024 - 2025</p>
// //               </div>
// //             </div>

// //             {/* Legend */}
// //             <div className='flex items-center gap-2'>
// //               <div className='flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]'>
// //                 <div className='2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-pink-500 rounded'></div>
// //                 <span className='text-foreground 2xl:text-[16px] text-[12px]'>Monthly Sales</span>
// //               </div>
// //               <div className='flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]'>
// //                 <div className='2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-blue-500 rounded'></div>
// //                 <span className='text-foreground 2xl:text-[16px] text-[12px]'>Yearly Sales</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Professional Chart using Recharts */}
// //           <div className='h-[24vh] w-full'>
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart
// //                 data={salesData}
// //                 margin={{
// //                   top: 10,
// //                   right: 20,
// //                   left: 10,
// //                   bottom: 10,
// //                 }}
// //               >
// //                 <CartesianGrid
// //                   stroke="#374151"
// //                   strokeOpacity={1}
// //                   vertical={false}
// //                 />

// //                 <XAxis
// //                   dataKey="month"
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tick={{ fill: '#9CA3AF', fontSize: 16 }}
// //                   tickMargin={5}
// //                 />

// //                 <YAxis
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tickMargin={5}
// //                   tickFormatter={() => ''}
// //                 />
                
// //                 <Tooltip content={<CustomTooltipLaptop />} />

// //                 <Line
// //                   type="monotone"
// //                   dataKey="monthly"
// //                   stroke="#EC4899"
// //                   strokeWidth={3}
// //                   dot={false}
// //                   activeDot={{ r: 4, fill: '#EC4899', stroke: '#EC4899', strokeWidth: 2 }}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   connectNulls={false}
// //                 />

// //                 <Line
// //                   type="monotone"
// //                   dataKey="yearly"
// //                   stroke="#3B82F6"
// //                   strokeWidth={3}
// //                   dot={false}
// //                   activeDot={{ r: 4, fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2 }}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   connectNulls={false}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Large Screen View - Shows on screens >= 2000px */}
// //         <div className='hidden xl-plus:block'>
// //           <div className='flex justify-between items-center mb-8'>
// //             <div className='flex items-center gap-4'>
// //               <h3 className='text-[42px] font-medium text-foreground'>Sales Analytics</h3>
// //               <div className='px-5 border border-[#3B3B3B] rounded-[15px]'>
// //                 <p className='text-foreground text-[35px]'>2024 - 2025</p>
// //               </div>
// //             </div>

// //             {/* Legend */}
// //             <div className='flex items-center gap-6'>
// //               <div className='flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]'>
// //                 <div className='w-[26px] h-[26px] bg-pink-500 rounded'></div>
// //                 <span className='text-foreground mt-2 text-[28px]'>Monthly Sales</span>
// //               </div>
// //               <div className='flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]'>
// //                 <div className='w-[26px] h-[26px] bg-blue-500 rounded'></div>
// //                 <span className='text-foreground mt-2 text-[28px]'>Yearly Sales</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Professional Chart using Recharts */}
// //           <div className='h-[24vh] w-full'>
// //             <ResponsiveContainer width="100%" height="100%">
// //               <LineChart
// //                 data={salesData}
// //                 margin={{
// //                   top: 20,
// //                   right: 30,
// //                   left: 20,
// //                   bottom: 20,
// //                 }}
// //               >
// //                 <CartesianGrid
// //                   stroke="#374151"
// //                   strokeOpacity={1}
// //                   vertical={false}
// //                 />

// //                 <XAxis
// //                   dataKey="month"
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tick={{ fill: '#9CA3AF', fontSize: 30 }}
// //                   tickMargin={10}
// //                 />

// //                 <YAxis
// //                   axisLine={false}
// //                   tickLine={false}
// //                   tickMargin={10}
// //                   tickFormatter={() => ''}
// //                 />
                
// //                 <Tooltip content={<CustomTooltipLarge />} />

// //                 <Line
// //                   type="monotone"
// //                   dataKey="monthly"
// //                   stroke="#EC4899"
// //                   strokeWidth={4}
// //                   dot={false}
// //                   activeDot={{ r: 6, fill: '#EC4899', stroke: '#EC4899', strokeWidth: 2 }}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   connectNulls={false}
// //                 />

// //                 <Line
// //                   type="monotone"
// //                   dataKey="yearly"
// //                   stroke="#3B82F6"
// //                   strokeWidth={4}
// //                   dot={false}
// //                   activeDot={{ r: 6, fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2 }}
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   connectNulls={false}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default LineBar
// import { useSalesAnalytics } from '@/components/socket/useSocketData'
// import React, { useEffect, useMemo, useState } from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// function LineBar({ currentUserIndex = 0 }) {
//   const { data: salesDataa, loading, error } = useSalesAnalytics()
//   console.log(salesDataa, "salesData")
//   const [activeIndex, setActiveIndex] = useState(0)

//   // Memoize saleAnalytics extraction
//   const saleAnalytics = useMemo(() => {
//     return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
//       (item) => item.salesAnalytics
//     )
//   }, [salesDataa])

//   function getCurrentAndPreviousYear() {
//     const currentYear = new Date().getFullYear()
//     const previousYear = currentYear - 1
  
//     return { currentYear, previousYear }
//   }
//   const { currentYear, previousYear } = getCurrentAndPreviousYear()
//   // Memoize chart data
//   const salesData = useMemo(() => {
  
//     const currentUserData = saleAnalytics[currentUserIndex]
//     if (!currentUserData) return []

//     const months = [
//       'Jan','Feb','Mar','Apr','May','Jun',
//       'Jul','Aug','Sep','Oct','Nov','Dec'
//     ]

//     return months.map((month, index) => {
//       const monthNum = (index + 1).toString()
//       return {
//         month,
//         monthly: currentUserData.thisYear?.[monthNum] || 0,
//         yearly: currentUserData.lastYear?.[monthNum] || 0,
//       }
//     })
//   }, [saleAnalytics, currentUserIndex])
//   useEffect(() => {
//     if (salesData.length === 0) return

//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % salesData.length)
//     }, 1500) // Change every 1.5 seconds

//     return () => clearInterval(interval)
//   }, [salesData.length])

//   const CustomTooltipLaptop = ({ active, payload, label }) => {
//     const currentData = salesData[activeIndex]
//     if (currentData) {
//       return (
//         <div className="bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[14px] shadow-xl border-2 border-pink-400/50 fixed top-4 left-4 z-50">
//           <div className="font-medium text-white mb-1">{currentData.month}</div>
//           <div className="text-pink-400 font-semibold">
//             {currentYear}: {currentData.monthly}
//           </div>
//           <div className="text-blue-400 font-semibold">
//             {previousYear}: {currentData.yearly}
//           </div>
//         </div>
//       )
//     }
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-[#374151] text-foreground px-2 py-1 rounded-lg text-[12px] shadow-lg border border-white/10">
//           <div className='font-medium text-white'>{label}</div>
//           <div className='text-pink-400'>{currentYear}: {payload[0].value}</div>
//           <div className='text-blue-400'>{previousYear}: {payload[1].value}</div>
//         </div>
//       )
//     }
//     return null
//   }

//   const CustomTooltipLarge = ({ active, payload, label }) => {
//     const currentData = salesData[activeIndex]
//     if (currentData) {
//       return (
//         <div className="bg-[#374151] text-foreground px-4 py-3 rounded-lg text-[24px] shadow-xl border-2 border-pink-400/50 fixed top-8 left-8 z-50">
//           <div className="font-medium text-white mb-2">{currentData.month}</div>
//           <div className="text-pink-400 font-semibold">
//             {currentYear}: {currentData.monthly}
//           </div>
//           <div className="text-blue-400 font-semibold">
//             {previousYear}: {currentData.yearly}
//           </div>
//         </div>
//       )
//     }
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[20px] shadow-lg border border-white/10">
//           <div className='font-medium text-white'>{label}</div>
//           <div className='text-pink-400'>{currentYear}: {payload[0].value}</div>
//           <div className='text-blue-400'>{previousYear}: {payload[1].value}</div>
//         </div>
//       )
//     }
//     return null
//   }

//   return (
//     <div>
//       <div className='bg-card 2xl:h-[30.5vh] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2'>
        
//         {/* Laptop View */}
//         <div className='xl-plus:hidden'>
//           <div className='flex justify-between items-center mb-4'>
//             <div className='flex items-center gap-2'>
//               <h3 className='2xl:text-[20px] text-[14px] font-medium text-foreground'>Sales Analytics</h3>
//               <div className='px-2 border border-[#3B3B3B] rounded-[10px]'>
//                 <p className='text-foreground 2xl:text-[16px] text-[12px]'>{previousYear} - {currentYear} </p>
//               </div>
//             </div>

//             {/* Legend */}
//             <div className='flex items-center gap-2'>
//               <div className='flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]'>
//                 <div className='2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-pink-500 rounded'></div>
//                 <span className='text-foreground 2xl:text-[16px] text-[12px]'>Current Year</span>
//               </div>
//               <div className='flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]'>
//                 <div className='2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-blue-500 rounded'></div>
//                 <span className='text-foreground 2xl:text-[16px] text-[12px]'>Previous Year</span>
//               </div>
//             </div>
//           </div>

//           {/* Chart */}
//           <div className='h-[24vh] w-full'>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={salesData}
//                 margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
//               >
//                 <CartesianGrid stroke="#374151" strokeOpacity={1} vertical={false} />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 16 }} tickMargin={5} />
//                 <YAxis axisLine={false} tickLine={false} tickMargin={5} tickFormatter={() => ''} />
//                 <Tooltip content={<CustomTooltipLaptop />} />
//                 <Line type="monotone" dataKey="monthly" stroke="#EC4899" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: '#EC4899', stroke: '#EC4899', strokeWidth: 2 }} strokeLinecap="round" strokeLinejoin="round" connectNulls={false} />
//                 <Line type="monotone" dataKey="yearly" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 4, fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2 }} strokeLinecap="round" strokeLinejoin="round" connectNulls={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Large Screen View */}
//         <div className='hidden xl-plus:block'>
//           <div className='flex justify-between items-center mb-8'>
//             <div className='flex items-center gap-4'>
//               <h3 className='text-[42px] font-medium text-foreground'>Sales Analytics</h3>
//               <div className='px-5 border border-[#3B3B3B] rounded-[15px]'>
//                 <p className='text-foreground text-[35px]'>{previousYear} - {currentYear} </p>
//               </div>
//             </div>
//             <div className='flex items-center gap-6'>
//               <div className='flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]'>
//                 <div className='w-[26px] h-[26px] bg-pink-500 rounded'></div>
//                 <span className='text-foreground mt-2 text-[28px]'>Current Year</span>
//               </div>
//               <div className='flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]'>
//                 <div className='w-[26px] h-[26px] bg-blue-500 rounded'></div>
//                 <span className='text-foreground mt-2 text-[28px]'>Previous Year</span>
//               </div>
//             </div>
//           </div>

//           <div className='h-[24vh] w-full'>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={salesData}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid stroke="#374151" strokeOpacity={1} vertical={false} />
//                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 30 }} tickMargin={10} />
//                 <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={() => ''} />
//                 <Tooltip content={<CustomTooltipLarge />} />
//                 <Line type="monotone" dataKey="monthly" stroke="#EC4899" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: '#EC4899', stroke: '#EC4899', strokeWidth: 2 }} strokeLinecap="round" strokeLinejoin="round" connectNulls={false} />
//                 <Line type="monotone" dataKey="yearly" stroke="#3B82F6" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2 }} strokeLinecap="round" strokeLinejoin="round" connectNulls={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LineBar
"use client"

import { useSalesAnalytics } from "@/components/socket/useSocketData"
import { useMemo, useState, useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function LineBar({ currentUserIndex = 0 }) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef(null)
  const currentMonthRef = useRef(0) // Track current month to prevent resets
  const stableChartDataRef = useRef([]) // Store stable chart data

  // Memoize saleAnalytics extraction
  const saleAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map((item) => item.salesAnalytics)
  }, [salesDataa])

  function getCurrentAndPreviousYear() {
    const currentYear = new Date().getFullYear()
    const previousYear = currentYear - 1
  
    return { currentYear, previousYear }
  }
  const { currentYear, previousYear } = getCurrentAndPreviousYear()

  // Update chart data only when user or data source changes
  useEffect(() => {
    const currentUserData = saleAnalytics[currentUserIndex]
    if (!currentUserData) {
      stableChartDataRef.current = []
      return
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    stableChartDataRef.current = months.map((month, index) => {
      const monthNum = (index + 1).toString()
      return {
        month,
        monthly: currentUserData.thisYear?.[monthNum] || 0,
        yearly: currentUserData.lastYear?.[monthNum] || 0,
      }
    })
  }, [saleAnalytics, currentUserIndex])

  // Use stable chart data from ref
  const salesData = stableChartDataRef.current

  // Memoize current tooltip data to prevent unnecessary re-renders
  const currentTooltipData = useMemo(() => {
    return salesData[activeIndex] || null
  }, [salesData, activeIndex])

  // Create stable chart props to prevent re-renders
  const chartProps = useMemo(() => ({
    data: salesData,
    margin: { top: 10, right: 20, left: 10, bottom: 10 }
  }), [salesData])

  const largeChartProps = useMemo(() => ({
    data: salesData,
    margin: { top: 20, right: 30, left: 20, bottom: 20 }
  }), [salesData])


  // Start interval only once when component mounts
  useEffect(() => {
    if (intervalRef.current) return // Already running

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const newIndex = (prev + 1) % 12
        currentMonthRef.current = newIndex // Update ref to track current month
        return newIndex
      })
    }, 5000) // Change every 2 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, []) // Only run once on mount

  // Handle user changes - reset to January when switching users
  useEffect(() => {
    // Only reset when user changes, not when data updates
    setActiveIndex(0)
    currentMonthRef.current = 0
  }, [currentUserIndex]) // Only depend on currentUserIndex

  // Handle initial data load - reset to January only once when data first arrives
  useEffect(() => {
    if (salesData && salesData.length > 0) {
      // Only reset on initial data load, not on every data update
      setActiveIndex(0)
      currentMonthRef.current = 0
    }
  }, [salesData?.length]) // Only depend on data length, not the data itself

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const CustomTooltipLaptop = ({ active, payload, label }) => {
    if (currentTooltipData) {
      return (
        <div className="bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[14px] shadow-xl border-2 border-pink-400/50 fixed top-4 left-4 z-50">
          <div className="font-medium text-white mb-1">{currentTooltipData.month}</div>
          <div className="text-pink-400 font-semibold">
            {currentYear}: {currentTooltipData.monthly}
          </div>
          <div className="text-blue-400 font-semibold">
            {previousYear}: {currentTooltipData.yearly}
          </div>
        </div>
      )
    }

    if (active && payload && payload.length) {
      return (
        <div className="bg-[#374151] text-foreground px-2 py-1 rounded-lg text-[12px] shadow-lg border border-white/10">
          <div className="font-medium text-white">{label}</div>
          <div className="text-pink-400">
            {currentYear}: {payload[0].value}
          </div>
          <div className="text-blue-400">
            {previousYear}: {payload[1].value}
          </div>
        </div>
      )
    }
    return null
  }

  const CustomTooltipLarge = ({ active, payload, label }) => {
    if (currentTooltipData) {
      return (
        <div className="bg-[#374151] text-foreground px-4 py-3 rounded-lg text-[24px] shadow-xl border-2 border-pink-400/50 fixed top-8 left-8 z-50">
          <div className="font-medium text-white mb-2">{currentTooltipData.month}</div>
          <div className="text-pink-400 font-semibold">
            {currentYear}: {currentTooltipData.monthly}
          </div>
          <div className="text-blue-400 font-semibold">
            {previousYear}: {currentTooltipData.yearly}
          </div>
        </div>
      )
    }

    if (active && payload && payload.length) {
      return (
        <div className="bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[20px] shadow-lg border border-white/10">
          <div className="font-medium text-white">{label}</div>
          <div className="text-pink-400">
            {currentYear}: {payload[0].value}
          </div>
          <div className="text-blue-400">
            {previousYear}: {payload[1].value}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div className="bg-card 2xl:h-[30.5vh] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2">
        {/* Laptop View */}
        <div className="xl-plus:hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="2xl:text-[20px] text-[14px] font-medium text-foreground">Sales Analytics</h3>
              <div className="px-2 border border-[#3B3B3B] rounded-[10px]">
                <p className="text-foreground 2xl:text-[16px] text-[12px]">
                  {previousYear} - {currentYear}{" "}
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]">
                <div className="2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-pink-500 rounded"></div>
                <span className="text-foreground 2xl:text-[16px] text-[12px]">Current Year</span>
              </div>
              <div className="flex items-center gap-2 px-2 border border-[#3B3B3B] bg-[black]/10 rounded-[5px]">
                <div className="2xl:w-[18px] w-[12px] 2xl:h-[18px] h-[12px] bg-blue-500 rounded"></div>
                <span className="text-foreground 2xl:text-[16px] text-[12px]">Previous Year</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[24vh] w-full relative">
            {/* Separate tooltip that doesn't affect chart */}
            {currentTooltipData && (
              <div className="absolute top-2 left-2 z-10 bg-[#374151] text-foreground px-3 py-2 rounded-lg text-[12px] shadow-xl border-2 border-pink-400/50">
                <div className="font-medium text-white">{currentTooltipData.month}</div>
                <div className="text-pink-400 font-semibold">
                  {currentYear}: {currentTooltipData.monthly}
                </div>
                <div className="text-blue-400 font-semibold">
                  {previousYear}: {currentTooltipData.yearly}
                </div>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart {...chartProps}>
                <CartesianGrid stroke="#374151" strokeOpacity={1} vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 16 }}
                  tickMargin={5}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={5} tickFormatter={() => ""} />
                {/* Remove tooltip from chart to prevent re-renders */}
                <Line
                  type="monotone"
                  dataKey="monthly"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="yearly"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Large Screen View */}
        <div className="hidden xl-plus:block">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <h3 className="text-[42px] font-medium text-foreground">Sales Analytics</h3>
              <div className="px-5 border border-[#3B3B3B] rounded-[15px]">
                <p className="text-foreground text-[35px]">
                  {previousYear} - {currentYear}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]">
                <div className="w-[26px] h-[26px] bg-pink-500 rounded"></div>
                <span className="text-white mt-2 text-[28px]">Current Year</span>
              </div>
              <div className="flex items-center gap-2 px-3 border border-[#3B3B3B] bg-[black]/10 rounded-[9px]">
                <div className="w-[26px] h-[26px] bg-blue-500 rounded"></div>
                <span className="text-white mt-2 text-[28px]">Previous Year</span>
              </div>
            </div>
          </div>

          <div className="h-[24vh] w-full relative">
            {/* Separate tooltip that doesn't affect chart */}
            {currentTooltipData && (
              <div className="absolute top-4 left-4 z-10 bg-[#374151] text-foreground px-4 py-3 rounded-lg text-[20px] shadow-xl border-2 border-pink-400/50">
                <div className="font-medium text-white mb-1">{currentTooltipData.month}</div>
                <div className="text-pink-400 font-semibold">
                  {currentYear}: {currentTooltipData.monthly}
                </div>
                <div className="text-blue-400 font-semibold">
                  {previousYear}: {currentTooltipData.yearly}
                </div>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <LineChart {...largeChartProps}>
                <CartesianGrid stroke="#374151" strokeOpacity={1} vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 30 }}
                  tickMargin={10}
                />
                <YAxis axisLine={false} tickLine={false} tickMargin={10} tickFormatter={() => ""} />
                {/* Remove tooltip from chart to prevent re-renders */}
                <Line
                  type="monotone"
                  dataKey="monthly"
                  stroke="#EC4899"
                  strokeWidth={4}
                  dot={false}
                  activeDot={false}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="yearly"
                  stroke="#3B82F6"
                  strokeWidth={4}
                  dot={false}
                  activeDot={false}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineBar
