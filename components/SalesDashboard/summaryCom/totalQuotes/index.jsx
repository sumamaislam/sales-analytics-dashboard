// import React from 'react'
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
// import { TrendingUp } from 'lucide-react'

// function TotalQuotes() {
//   // Data for donut chart
//   const chartDataLaptop = [
//     { name: 'Cancelled', value: 20, fill: '#EF4444', percentage: 20 },
//     { name: 'In Process', value: 40, fill: '#FDE047', percentage: 40 },
//     { name: 'Incomplete', value: 40, fill: '#E5E7EB', percentage: 40 },
//   ]

//   const chartDataLarge = [
//     { name: 'Cancelled', value: 20, fill: '#EF4444', percentage: 20 },
//     { name: 'In Process', value: 40, fill: '#FDE047', percentage: 40 },
//     { name: 'Incomplete', value: 40, fill: '#E5E7EB', percentage: 40 },
//   ]

//   const totalQuotes = 20

//   return (
//     <div className='xl-plus:p-[34px] p-[20px]'>
//       {/* Laptop View - Shows on screens < 2000px */}
//       <div className='flex justify-between h-full xl-plus:hidden'>
//         {/* Left Section - Text Data */}
//         <div className='text-foreground flex-1'>
//           <h3 className='text-[20px] font-medium'>Total Quotes</h3>

//           {/* Main Number with Growth Indicator */}
//           <div className='flex items-center gap-2'>
//             <span className='text-[32px] font-normal'>{totalQuotes}</span>
//             <div className='flex items-center gap-1 text-[18px]'>
//               <TrendingUp className='w-[16px] h-[16px] text-[#B7FD6B]' />
//               <span className='text-[#B7FD6B] font-normal'>+5.3%</span>
//             </div>
//           </div>

//           {/* Legend Items */}
//           <div className='mt-2'>
//             <div className='flex items-center gap-2'>
//               <div className='w-[12px] h-[12px] bg-yellow-400 rounded'></div>
//               <span className='text-[14px] font-normal text-foreground'>In Process: 4</span>
//             </div>
//             <div className='flex items-center gap-2'>
//               <div className='w-[12px] h-[12px] bg-red-500 rounded'></div>
//               <span className='text-[14px] font-normal text-foreground'>Cancelled: 2</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Donut Chart */}
//         <div className='flex-1 flex justify-end items-center'>
//           <div className="w-[150px] h-[150px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartDataLaptop}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={70}
//                   startAngle={90}
//                   endAngle={450}
//                   dataKey="value"
//                   stroke="none"
//                   label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
//                     if (percentage < 5) return null;

//                     const RADIAN = Math.PI / 180;
//                     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                     return (
//                       <text
//                         x={x}
//                         y={y}
//                         fill="black"
//                         textAnchor="middle"
//                         dominantBaseline="central"
//                         fontSize="12"
//                         fontWeight="bold"
//                       >
//                         {`${percentage}%`}
//                       </text>
//                     );
//                   }}
//                   labelLine={false}
//                 >
//                   {chartDataLaptop.map((entry, index) => (
//                     <Cell key={`cell-laptop-${index}`} fill={entry.fill} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>

//       {/* Large Screen View - Shows on screens >= 2000px */}
//       <div className='hidden xl-plus:flex justify-between h-full relative'>
//         {/* Left Section - Text Data */}
//         <div className='text-foreground flex-1'>
//           <h3 className='text-[42px] font-medium'>Total Quotes</h3>

//           {/* Main Number with Growth Indicator */}
//           <div className='flex items-center gap-3'>
//             <span className='text-[60px] font-normal'>{totalQuotes}</span>
//             <div className='flex items-center gap-1 text-[40px]'>
//               <TrendingUp className='w-[29px] h-[29px] text-[#B7FD6B]' />
//               <span className='text-[#B7FD6B] font-normal'>+5.3%</span>
//             </div>
//           </div>

//           {/* Legend Items */}
//           <div className='mt-3'>
//             <div className='flex items-center gap-3'>
//               <div className='w-[29px] h-[29px] bg-yellow-400 rounded'></div>
//               <span className='text-[34px] font-normal text-foreground'>In Process: 4</span>
//             </div>
//             <div className='flex items-center gap-3'>
//               <div className='w-[29px] h-[29px] bg-red-500 rounded'></div>
//               <span className='text-[34px] font-normal text-foreground'>Cancelled: 2</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Donut Chart */}
//         <div className='flex justify-end items-center absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
//           <div className="w-[700px] h-[700px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={chartDataLarge}
//                   cx="50%"
//                   cy="60%"
//                   innerRadius={120}
//                   outerRadius={250}
//                   startAngle={90}
//                   endAngle={450}
//                   dataKey="value"
//                   stroke="none"
//                   label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
//                     if (percentage < 5) return null;

//                     const RADIAN = Math.PI / 180;
//                     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//                     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//                     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//                     return (
//                       <text
//                         x={x}
//                         y={y}
//                         fill="black"
//                         textAnchor="middle"
//                         dominantBaseline="central"
//                         fontSize="46"
//                         fontWeight="bold"
//                       >
//                         {`${percentage}%`}
//                       </text>
//                     );
//                   }}
//                   labelLine={false}
//                 >
//                   {chartDataLarge.map((entry, index) => (
//                     <Cell key={`cell-large-${index}`} fill={entry.fill} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TotalQuotes


import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

function TotalQuotes({ salesSummary }) {
  // Fallback data if no socket data

  
  const data = salesSummary 
  const quotesData = data?.data?.totalQuotesAnalytics || {}
  console.log(quotesData, "quotesData")
  
  // Extract data from the new structure
  const totalCount = quotesData?.total?.count || "0"
  const approvedCount = quotesData?.approved?.count || "0"
  const inProcessCount = quotesData?.inProcess?.count || "0"
  const cancelledCount = quotesData?.cancelled?.count || "0"
  const totalComparison = quotesData?.total?.comparison_percentage || 0
  // Data for donut chart - using real data
  const donutData = quotesData?.donutData || {}
  const chartDataLaptop = [
    { name: 'Approved', value: parseFloat(donutData.approved) || 0, fill: '#10B981', percentage: parseFloat(donutData.approved).toFixed(0) || 0 },
    { name: 'In Process', value: parseFloat(donutData.inProcess) || 0, fill: '#FDE047', percentage: parseFloat(donutData.inProcess).toFixed(0) || 0 },
    { name: 'Cancelled', value: parseFloat(donutData.cancelled) || 0, fill: '#EF4444', percentage: parseFloat(donutData.cancelled).toFixed(0) || 0 },
  ]

  const chartDataLarge = [
    { name: 'Approved', value: parseFloat(donutData.approved) || 0, fill: '#10B981', percentage: parseFloat(donutData.approved).toFixed(0) || 0 },
    { name: 'In Process', value: parseFloat(donutData.inProcess) || 0, fill: '#FDE047', percentage: parseFloat(donutData.inProcess).toFixed(0) || 0 },
    { name: 'Cancelled', value: parseFloat(donutData.cancelled) || 0, fill: '#EF4444', percentage: parseFloat(donutData.cancelled).toFixed(0) || 0 },
  ]

  // const totalQuotes = 20

  return (
    <div className='xl-plus:p-[34px] p-[20px] h-[100%]'>
      {/* Laptop View - Shows on screens < 2000px */}
      <div className='flex justify-between h-full xl-plus:hidden'>
        {/* Left Section - Text Data */}
        <div className='text-foreground flex-1'>
          <h3 className='text-[20px] font-medium'>Total Quotes</h3>

          {/* Main Number with Growth Indicator */}
          <div className='flex items-center gap-2'>
              <span className='text-[32px] font-normal'>{totalCount}</span>
            <div className='flex items-center gap-1 text-[18px]'>
              <TrendingUp className={`w-[16px] h-[16px] ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`} />
              <span className={`font-normal ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>
                {totalComparison >= 0 ? '+' : ''}{totalComparison.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className='mt-2'>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-green-500 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>Approved: {approvedCount}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-yellow-400 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>In Process: {inProcessCount}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[12px] h-[12px] bg-red-500 rounded'></div>
              <span className='text-[14px] font-normal text-foreground'>Cancelled: {cancelledCount}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Donut Chart */}
        <div className='flex-1 flex justify-end items-center'>
          <div className="w-[150px] h-[150px]">
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
                    if (percentage < 5) return null;

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
          </div>
        </div>
      </div>

      {/* Large Screen View - Shows on screens >= 2000px */}
      <div className='hidden xl-plus:block relative h-[100%] w-[100%]'>
        {/* Left Section - Text Data */}
        <div className='text-foreground'>
          <h3 className='xl-plus:text-[42px] text-[20px] font-medium'>Total Quotes</h3>

          {/* Main Number with Growth Indicator */}
          <div className='flex items-center gap-3'>
            <h3 className='text-[80px] font-normal'>{totalCount}</h3>
            <div className='flex items-center gap-1 text-[40px]'>
              <TrendingUp className={`w-[29px] h-[29px] ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`} />
              <span className={`font-normal ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>
                {totalComparison >= 0 ? '+' : ''}{totalComparison.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Donut Chart */}
        <div className='absolute top-[50%] left-[63%] -translate-x-1/2 -translate-y-1/2'>
          <div className="w-[585px] h-[585px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartDataLarge}
                  cx="50%"
                  cy="50%"
                  innerRadius={170}
                  outerRadius={280}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                  stroke="none"
                  label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
                    if (percentage < 5) return null;

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
                        fontSize="42"
                        fontWeight="bold"
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
          </div>
        </div>

        {/* Legend Items */}
        <div className='mt-3 absolute -bottom-[8%] left-[16%] -translate-x-1/2 -translate-y-1/2'>
          <div className='flex items-center gap-3'>
            <div className='w-[29px] h-[29px] bg-green-500 rounded'></div>
            <span className='text-[34px] font-normal text-foreground'>Approved: {approvedCount}</span>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-[29px] h-[29px] bg-yellow-400 rounded'></div>
            <span className='text-[34px] font-normal text-foreground'>In Process: {inProcessCount}</span>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-[29px] h-[29px] bg-red-500 rounded'></div>
            <span className='text-[34px] font-normal text-foreground'>Cancelled: {cancelledCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalQuotes