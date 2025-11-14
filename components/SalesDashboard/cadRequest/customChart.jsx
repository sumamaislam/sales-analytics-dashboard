import React, { useState } from 'react'

function CustomChart({ 
  chartData = [], 
  reportData = [],
  weeklyTotal = 50 
}) {
  const [hoveredBar, setHoveredBar] = useState(null)
  // Chart dimensions - responsive to container
  const padding = { top: 10, right: 10, bottom: 30, left: 40 }
  const maxValue = 40

  // Helper function to get Y position (percentage-based)
  const getY = (value, containerHeight) => {
    const chartHeight = containerHeight - padding.top - padding.bottom
    return padding.top + chartHeight - (value / maxValue) * chartHeight
  }

  // Helper function to get X position (percentage-based)
  const getX = (index, containerWidth) => {
    const chartWidth = containerWidth - padding.left - padding.right
    const barWidth = chartWidth / chartData?.length
    return padding.left + index * barWidth + barWidth / 2
  }

  // Generate area path (responsive) with smooth rounded curves like Recharts monotone
  const generateAreaPath = (containerWidth, containerHeight) => {
    if (chartData?.length === 0) return ''
    
    // Helper function to get line Y position with smart offset
    const getLineY = (value, index) => {
      if (value === 0 || value === null || value === undefined) {
        return getY(0, containerHeight) // Stay at bottom for no data
      }
      // First bar touches, others float above
      const lineOffset = index === 0 ? 0 : 5
      return getY(value + lineOffset, containerHeight)
    }
    
    let path = `M ${getX(0, containerWidth)} ${getLineY(chartData[0].lineValue || 0, 0)}`
    
    for (let i = 1; i < chartData.length; i++) {
      const prevX = getX(i - 1, containerWidth)
      const prevY = getLineY(chartData[i - 1].lineValue || 0, i - 1)
      const currX = getX(i, containerWidth)
      const currY = getLineY(chartData[i].lineValue || 0, i)
      
      // Use smooth cubic Bezier curves for rounded, flowing area
      const dx = currX - prevX
      const dy = currY - prevY
      
      // Calculate control points for smooth curves
      const cp1x = prevX + dx * 0.4
      const cp1y = prevY
      const cp2x = prevX + dx * 0.6
      const cp2y = currY
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${currX} ${currY}`
    }
    
    // Close the area with straight lines to bottom
    path += ` L ${getX(chartData.length - 1, containerWidth)} ${getY(0, containerHeight)}`
    path += ` L ${getX(0, containerWidth)} ${getY(0, containerHeight)} Z`
    
    return path
  }

  // Generate line path (responsive) with smooth rounded curves like Recharts monotone
  const generateLinePath = (containerWidth, containerHeight) => {
    if (chartData?.length === 0) return ''
    
    // Helper function to get line Y position with smart offset
    const getLineY = (value, index) => {
      if (value === 0 || value === null || value === undefined) {
        return getY(0, containerHeight) // Stay at bottom for no data
      }
      // First bar touches, others float above
      const lineOffset = index === 0 ? 0 : 5
      return getY(value + lineOffset, containerHeight)
    }
    
    let path = `M ${getX(0, containerWidth)} ${getLineY(chartData[0].lineValue || 0, 0)}`
    
    for (let i = 1; i < chartData.length; i++) {
      const prevX = getX(i - 1, containerWidth)
      const prevY = getLineY(chartData[i - 1].lineValue || 0, i - 1)
      const currX = getX(i, containerWidth)
      const currY = getLineY(chartData[i].lineValue || 0, i)
      
      // Use smooth cubic Bezier curves for rounded, flowing lines
      const dx = currX - prevX
      const dy = currY - prevY
      
      // Calculate control points for smooth curves
      const cp1x = prevX + dx * 0.4
      const cp1y = prevY
      const cp2x = prevX + dx * 0.6
      const cp2y = currY
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${currX} ${currY}`
    }
    
    return path
  }

  return (
    <div className="bg-card xl-plus:rounded-[24px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2 h-full overflow-hidden flex flex-col">
      {/* Laptop View - Shows on screens < 2000px */}
      <div className="xl-plus:hidden flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-[20px] text-foreground">CAD Requests</h2>
          <div className="text-[16px] text-foreground">Total: {weeklyTotal}</div>
        </div>

        {/* Custom SVG Chart */}
        <div className="w-full flex-1 mt-[20px] min-h-0">
          <svg 
            viewBox="0 0 800 300" 
            className="w-full h-full"
            preserveAspectRatio="none"
          >
          {/* Grid Lines */}
          {/* {[0, 25, 50, 75, 100].map(value => (
            <line
              key={value}
              x1={padding.left}
              y1={getY(value, 300)}
              x2={800 - padding.right}
              y2={getY(value, 300)}
              stroke="#374151"
              strokeWidth="2"
              opacity={0}
            />
          ))} */}

            {/* Y-Axis Labels */}
            {[0, 8, 16, 24, 32, 40]?.map(value => (
              <text
                key={value}
                x={padding.left - 10}
                y={getY(value, 300) + 5}
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="10"
              >
                {value}
              </text>
            ))}

            {/* X-Axis Labels */}
            {chartData?.map((item, index) => (
              <text
                key={index}
                x={getX(index, 800)}
                y={300 - 10}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="10"
              >
                {index + 1}
              </text>
            ))}

          {/* Area Fill */}
          <path
            d={generateAreaPath(800, 300)}
            fill="url(#areaGradient)"
            opacity={1}
          />

          {/* Bars */}
          {chartData?.map((item, index) => {
            const chartWidth = 800 - padding.left - padding.right
            const barWidth = chartWidth / chartData?.length
            const barSpacing = barWidth * 0.3
            
            return (
              <rect
                key={index}
                x={getX(index, 800) - barWidth/2 + barSpacing/2}
                y={getY(item.barValue || 0, 300)}
                width={barWidth - barSpacing}
                height={getY(0, 300) - getY(item.barValue || 0, 300)}
                fill="url(#barGradient)"
                opacity={0.7}
              />
            )
          })}

            {/* Line - Rendered after bars so it appears on top */}
            <path
              d={generateLinePath(800, 300)}
              fill="none"
              stroke="#0083CC"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          {/* Reference Lines and Dots - Only for days with reports */}
          {(() => {
            return (
              <g>
                {reportData?.map(report => {
                  const dayIndex = report.day - 1 // Convert to 0-based index
                  const dayData = chartData[dayIndex]
                  
                  if (!dayData) return null
                  
                  return (
                    <g key={report.day}>
                      {/* Reference Line */}
                      <line
                        x1={getX(dayIndex, 800)}
                        y1={padding.top}
                        x2={getX(dayIndex, 800)}
                        y2={300 - padding.bottom}
                        stroke={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        strokeLinecap="round"
                      />
                      {/* Reference Dot */}
                      <circle
                        cx={getX(dayIndex, 800)}
                        cy={dayData.lineValue === 0 || dayData.lineValue === null || dayData.lineValue === undefined 
                          ? getY(0, 300) 
                          : getY((dayData.lineValue || 0) + (dayIndex === 0 ? 0 : 5), 300)}
                        r="4"
                        fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                    </g>
                  )
                })}
              </g>
            )
          })()}

          {/* Report Tooltips */}
          {reportData?.map((report, index) => {
            const dayIndex = report.day - 2.6 // Convert to 0-based index
            const x = getX(dayIndex, 800)
            const y = padding.top + 20 // Fixed position above chart
            
            return (
              <g key={index}>
                <rect
                  x={x - 30}
                  y={y}
                  width="60"
                  height="45"
                  fill="rgba(55, 65, 81, 0.9)"
                  rx="6"
                  stroke={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={y + 15}
                  textAnchor="middle"
                  fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                  fontSize="14"
                  fontWeight="bold"
                >
                  {report.amount}
                </text>
                <text
                  x={x}
                  y={y + 28}
                  textAnchor="middle"
                  fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {report.percentage}
                </text>
              </g>
            )
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2B9DF9" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#29567D" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0}/>
              <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.8}/>
            </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Large Screen View - Shows on screens >= 2000px */}
      <div className="hidden xl-plus:flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-[42px] text-foreground">CAD Requests</h2>
          <div className="text-[32px] text-foreground">Total: {weeklyTotal}</div>
        </div>

        {/* Custom SVG Chart */}
        <div className="w-full flex-1 mt-[45px] min-h-0">
          <svg 
            viewBox="0 0 800 300" 
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Y-Axis Labels */}
            {[0, 8, 16, 24, 32, 40].map(value => (
              <text
                key={value}
                x={padding.left - 10}
                y={getY(value, 300) + 5}
                textAnchor="end"
                fill="#9CA3AF"
                fontSize="14"
              >
                {value}
              </text>
            ))}

            {/* X-Axis Labels */}
            {chartData?.map((item, index) => (
              <text
                key={index}
                x={getX(index, 800)}
                y={300 - 10}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="14"
              >
                {index + 1}
              </text>
            ))}

            {/* Area Fill */}
            <path
              d={generateAreaPath(800, 300)}
              fill="url(#areaGradientLarge)"
              opacity={1}
            />

            {/* Bars */}
            {chartData?.map((item, index) => {
              const chartWidth = 800 - padding.left - padding.right
              const barWidth = chartWidth / chartData?.length
              const barSpacing = barWidth * 0.3
              
              return (
                <rect
                  key={index}
                  x={getX(index, 800) - barWidth/2 + barSpacing/2}
                  y={getY(item.barValue || 0, 300)}
                  width={barWidth - barSpacing}
                  height={getY(0, 300) - getY(item.barValue || 0, 300)}
                  fill="url(#barGradientLarge)"
                  opacity={0.7}
                />
              )
            })}

            {/* Line - Rendered after bars so it appears on top */}
            <path
              d={generateLinePath(800, 300)}
              fill="none"
              stroke="#0083CC"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Reference Lines and Dots - Only for days with reports */}
            {(() => {
              return (
                <g>
                  {reportData?.map(report => {
                    const dayIndex = report.day - 1
                    const dayData = chartData[dayIndex]
                    
                    if (!dayData) return null
                    
                    return (
                      <g key={report.day}>
                        {/* Reference Line */}
                        <line
                          x1={getX(dayIndex, 800)}
                          y1={padding.top}
                          x2={getX(dayIndex, 800)}
                          y2={300 - padding.bottom}
                          stroke={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          strokeLinecap="round"
                        />
                        {/* Reference Dot */}
                        <circle
                          cx={getX(dayIndex, 800)}
                          cy={dayData.lineValue === 0 || dayData.lineValue === null || dayData.lineValue === undefined 
                            ? getY(0, 300) 
                            : getY((dayData.lineValue || 0) + (dayIndex === 0 ? 0 : 5), 300)}
                          r="6"
                          fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </g>
                    )
                  })}
                </g>
              )
            })()}

            {/* Report Tooltips */}
            {reportData?.map((report, index) => {
              const dayIndex = report.day - 2.6
              const x = getX(dayIndex, 800)
              const y = padding.top + 20
              
              return (
                <g key={index}>
                  <rect
                    x={x - 35}
                    y={y}
                    width="70"
                    height="65"
                    fill="rgba(55, 65, 81, 0.9)"
                    rx="6"
                    stroke={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={y + 25}
                    textAnchor="middle"
                    fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {report.amount}
                  </text>
                  <text
                    x={x}
                    y={y + 50}
                    textAnchor="middle"
                    fill={report.percentage && report.percentage.includes('+') ? "#7CCF00" : "#EF4444"}
                    fontSize="16"
                    fontWeight="bold"
                  >
                    {report.percentage}
                  </text>
                </g>
              )
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="areaGradientLarge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2B9DF9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#29567D" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="barGradientLarge" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0}/>
                <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default CustomChart
