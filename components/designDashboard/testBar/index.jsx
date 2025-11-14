import React, { useState } from 'react'

function TestBar() {
  const [hoveredMonth, setHoveredMonth] = useState(null)
  const [hoveredData, setHoveredData] = useState(null)

  const data = [
    { month: 'Jan', completed: 550, qc: 400 },
    { month: 'Feb', completed: 600, qc: 300 },
    { month: 'Mar', completed: 900, qc: 600 },
    { month: 'Apr', completed: 400, qc: 450 },
    { month: 'May', completed: 550, qc: 450 },
    { month: 'Jun', completed: 1150, qc: 850 },
    { month: 'Jul', completed: 990, qc: 700 },
    { month: 'Aug', completed: 740, qc: 300 },
    { month: 'Sep', completed: 1040, qc: 540 },
    { month: 'Oct', completed: 600, qc: 250 },
    { month: 'Nov', completed: 870, qc: 320 },
    { month: 'Dec', completed: 660, qc: 370 },
  ]

  const maxValue = 2000
  const yAxisTicks = [0, 300, 600, 900, 1200, 2000]

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

  return (
    <div className="w-full h-96 bg-gray-900 p-6 rounded-lg">
      {/* Chart Title */}
      <h3 className="text-white text-lg font-semibold mb-4">Monthly Analytics</h3>
      
      {/* Chart Container */}
      <div className="relative h-80">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 h-full w-12 flex flex-col justify-between">
          {yAxisTicks.map((tick) => (
            <div key={tick} className="text-gray-400 text-xs">
              {tick === 2000 ? '2k' : tick}
            </div>
          ))}
        </div>

        {/* Grid Lines */}
        <div className="absolute left-12 right-0 h-full">
          {yAxisTicks.map((tick, index) => (
            <div
              key={tick}
              className="absolute w-full border-t border-gray-700"
              style={{ top: `${(index / (yAxisTicks.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Chart Area */}
        <div className="absolute left-12 right-0 h-full flex items-end justify-between px-4">
          {data.map((item, index) => (
            <div key={item.month} className="flex flex-col items-center relative group">
              {/* Bars Container */}
              <div className="flex items-end h-64 relative">
                {/* Completed Bar - positioned on top */}
                <div
                  className="w-8 bg-lime-500 rounded-t-sm transition-all duration-200 hover:bg-lime-400 cursor-pointer relative z-20"
                  style={{ height: `${getBarHeight(item.completed)}%` }}
                  onMouseEnter={(e) => handleBarHover(item.month, item.completed, item.qc, e)}
                  onMouseLeave={handleBarLeave}
                />
                
                {/* Qc Bar - positioned behind the green bar */}
                <div
                  className="w-8 bg-blue-500 rounded-t-sm transition-all duration-200 hover:bg-blue-400 cursor-pointer absolute z-10"
                  style={{ 
                    height: `${getBarHeight(item.qc)}%`,
                    left: '-12px' // Half the width of the bar to create overlap
                  }}
                  onMouseEnter={(e) => handleBarHover(item.month, item.completed, item.qc, e)}
                  onMouseLeave={handleBarLeave}
                />
              </div>

              {/* Month Label */}
              <div className="text-gray-400 text-xs mt-2">{item.month}</div>

              {/* Tooltip */}
              {hoveredMonth === item.month && hoveredData && (
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-10">
                  <div className="text-center">
                    <div className="text-lime-400 text-sm font-semibold">
                      {hoveredData.completed}
                    </div>
                    <div className="text-blue-400 text-sm font-semibold">
                      {hoveredData.qc}
                    </div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-lime-500 rounded"></div>
          <span className="text-gray-300 text-sm">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-300 text-sm">Qc</span>
        </div>
      </div>
    </div>
  )
}

export default TestBar