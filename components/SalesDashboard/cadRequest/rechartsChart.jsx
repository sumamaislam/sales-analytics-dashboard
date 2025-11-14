import React from 'react'
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Area,
  ReferenceLine,
  ReferenceDot,
  Tooltip
} from 'recharts'

function RechartsChart({ 
  chartData = [], 
  reportData = [],
  weeklyTotal = 50 
}) {
  // Custom tooltip component - shows reports for specific days
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    
    const report = reportData.find(r => r.day === label)
    if (!report) return null
    
    return (
      <div className="bg-gray-800 border border-red-500 rounded-lg p-2 shadow-lg">
        <div className="text-white text-lg font-bold text-center">
          {report.amount}
        </div>
        <div className="text-red-500 text-sm font-bold text-center">
          {report.percentage}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-[24px] p-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold text-foreground">CAD Requests</h2>
        <div className="text-xs text-foreground">Weekly: {weeklyTotal}</div>
      </div>

      {/* Recharts Chart */}
      <div className="w-full flex-1 min-h-0 -m-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 40,
              bottom: 30,
            }}
          >
            {/* Grid Lines */}
            <CartesianGrid
              stroke="#374151"
              strokeOpacity={0.3}
              vertical={false}
            />

            {/* X-Axis */}
            <XAxis
              dataKey="period"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={10}
            />

            {/* Y-Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickMargin={10}
              domain={[0, 100]}
            />

            {/* Tooltip - Shows reports for specific days */}
            <Tooltip content={<CustomTooltip />} />

            {/* Area Chart - Background fill */}
            <Area
              dataKey="lineValue"
              type="monotone"
              fill="url(#lineGradient)"
              stroke="none"
              connectNulls={false}
            />

            {/* Line Chart */}
            <Line
              dataKey="lineValue"
              type="monotone"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              activeDot={false}
              strokeLinecap="round"
              strokeLinejoin="round"
              connectNulls={false}
            />

            {/* Bar Chart */}
            <Bar
              dataKey="barValue"
              fill="url(#barGradient)"
              opacity={0.7}
              radius={[2, 2, 0, 0]}
            />

            {/* Reference Lines and Dots for Reports */}
            {reportData.map((report, index) => {
              const dayData = chartData.find(item => item.period === report.day)
              if (!dayData) return null
              
              return (
                <g key={index}>
                  {/* Reference Line */}
                  <ReferenceLine 
                    x={report.day} 
                    stroke="#EF4444" 
                    strokeDasharray="5,5" 
                    strokeWidth={2}
                  />
                  
                  {/* Reference Dot */}
                  <ReferenceDot 
                    x={report.day} 
                    y={dayData.lineValue} 
                    r={6} 
                    fill="#EF4444" 
                    stroke="#FFFFFF" 
                    strokeWidth={2}
                  />
                </g>
              )
            })}



            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#6B7280" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RechartsChart
