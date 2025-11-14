import React from 'react'

function CustomChart({  chartData, reportData, weeklyTotal = 50 }) {
  console.log('CustomChart Debug:', {
    chartDataLength: chartData?.length,
    chartDataSample: chartData?.slice(0, 3),
    reportDataLength: reportData?.length,
    weeklyTotal,
    chartDataType: typeof chartData
  })
  
  const padding = { top: 20, right: 20, bottom: 40, left: 40 }
  const chartWidth = 1100
  const chartHeight = 250
  const plotWidth = chartWidth - padding.left - padding.right
  const plotHeight = chartHeight - padding.top - padding.bottom

  // Calculate positions
  const getX = (period) => padding.left + ((period - 1) / 29) * plotWidth
  const getY = (value) => padding.top + plotHeight - (value / 400) * plotHeight
  const getBarHeight = (value) => (value / 400) * plotHeight

  // Generate smooth line path
  const generateLinePath = () => {
    if (!chartData || chartData.length < 2) return ''
    
    let path = `M ${getX(chartData[0].period)} ${getY(chartData[0].lineValue)}`
    
    for (let i = 1; i < chartData.length; i++) {
      const x = getX(chartData[i].period)
      const y = getY(chartData[i].lineValue)
      const prevX = getX(chartData[i-1].period)
      const prevY = getY(chartData[i-1].lineValue)
      
      // Use cubic bezier for smooth curves
      const cp1x = prevX + (x - prevX) * 0.5
      const cp1y = prevY
      const cp2x = x - (x - prevX) * 0.5
      const cp2y = y
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`
    }
    
    return path
  }

  // Generate area path
  const generateAreaPath = () => {
    if (!chartData || chartData.length < 2) return ''
    
    const linePath = generateLinePath()
    const firstX = getX(chartData[0].period)
    const lastX = getX(chartData[chartData.length - 1].period)
    const bottomY = padding.top + plotHeight
    
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
  }

  return (
    <div className="w-full h-full rounded-[19px] p-6 flex flex-col">
      {/* Header with statistics */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="xl-plus:text-[42px] text-[24px] font-semibold text-foreground">CAD Requests</h2>
        <div className="flex gap-6 text-[14px] text-foreground">
          {/* <div className="text-center flex xl-plus:text-[38px] text-[16px] text-foreground items-center gap-2">
            <div className="">Today :</div>
            <div className="">10</div>
          </div> */}
          <div className="text-center flex xl-plus:text-[38px] text-[16px] text-foreground items-center gap-2">
            <div className=" text-foreground">Total:</div>
            <div className="">{weeklyTotal}</div>
          </div>
          {/* <div className="text-center flex xl-plus:text-[38px] text-[16px] text-foreground items-center gap-2">
            <div className="text-foreground">Monthly:</div>
            <div className="">220</div>
          </div> */}
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 w-full min-h-0">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          {/* {[0, 25, 50, 75, 100].map(value => (
            <line
              key={value}
              x1={padding.left}
              y1={getY(value)}
              x2={padding.left + plotWidth}
              y2={getY(value)}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))} */}

          {/* Y-Axis Labels */}
          {[0, 100, 200, 300, 400].map(value => (
            <text
              key={value}
              x={padding.left - 20}
              y={getY(value) + 5}
              textAnchor="end"
              className="text-[12px] fill-muted-foreground"
            >
              {value}
            </text>
          ))}

          {/* X-Axis Labels */}
          {chartData && chartData.filter((_, index) => index % 1 === 0).map((item, index) => (
            <text
              key={item.period}
              x={getX(item.period)}
              y={chartHeight - 10}
              textAnchor="middle"
              className="text-[12px] fill-muted-foreground"
            >
              {item.period}
            </text>
          ))}

          {/* Bar Chart */}
          {chartData && chartData.map((item, index) => (
            <rect
              key={`bar-${index}`}
              x={getX(item.period) - 10}
              y={getY(item.barValue)}
              width="15"
              height={getBarHeight(item.barValue)}
              fill="url(#barGradient)"
              rx="2"
            />
          ))}

          {/* Area Chart */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.4"/>
            </linearGradient>
          </defs>
          
          <path
            d={generateAreaPath()}
            fill="url(#areaGradient)"
          />

          {/* Line Chart */}
          <path
            d={generateLinePath()}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Highlighted Data Points */}
          {reportData && reportData.map((report, index) => {
            const dataPoint = chartData && chartData.find(item => item.period === report.day)
            if (!dataPoint) return null

            const x = getX(report.day)
            const y = getY(dataPoint.lineValue)
            const isPositive = report.type === 'positive'

            return (
              <g key={`highlight-${index}`}>
                {/* Vertical Line */}
                <line
                  x1={x} 
                  y1={y}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke={isPositive ? "#10B981" : "#EF4444"}
                  strokeWidth="2"
                  strokeDasharray="2,4"
                />
                
                {/* Data Point Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={isPositive ? "#10B981" : "#EF4444"}
                  stroke="white"
                  strokeWidth="2"
                />

                {/* Tooltip Box */}
                <rect
                  x={x - 25}
                  y={y - 40}
                  width="50"
                  height="45"
                  fill="white"
                  stroke={isPositive ? "#10B981" : "#EF4444"}
                  strokeWidth="1"
                  rx="4"
                />
                
                {/* Tooltip Text */}
                <text
                  x={x}
                  y={y - 20}
                  textAnchor="middle"
                  className="text-[12px] font-semibold"
                  fill={isPositive ? "#065F46" : "#991B1B"}
                >
                  {report.amount}
                </text>
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  className="text-[10px]"
                  fill={isPositive ? "#065F46" : "#991B1B"}
                >
                  {report.percentage}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default CustomChart