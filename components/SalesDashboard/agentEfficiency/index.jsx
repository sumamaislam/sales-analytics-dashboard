import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function Efficiency() {
  // Circular progress data
  const progressData = [
    { label: 'Sales', percentage: 85, color: '#EC4899' },
    { label: 'Revival', percentage: 72, color: '#7CCF00' },
    { label: 'Consistency', percentage: 90, color: '#3B82F6' }
  ]

  // Data for Recharts PieChart with gradient
  const chartDataLaptop = [
    { name: 'completed', value: 75, fill: 'url(#gradient-laptop)' },
    { name: 'remaining', value: 25, fill: '#E5E7EB' }
  ]

  const chartDataLarge = [
    { name: 'completed', value: 75, fill: 'url(#gradient-large)' },
    { name: 'remaining', value: 25, fill: '#E5E7EB' }
  ]

  const CustomLabel = ({ cx, cy }) => {
    return (
      <text 
        x={cx} 
        y={cy} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        className="xl-plus:text-[80px] text-[60px] font-medium fill-foreground"
      >
        75%
      </text>
    )
  }

  return (
    <div className='bg-card 2xl:h-[15vh] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2'>
      {/* Laptop View - Shows on screens < 2000px */}
      <div className='flex justify-between h-full w-full xl-plus:hidden'>
        <div className='text-foreground w-[60%]'>
          <h3 className='2xl:text-[20px] text-[18px] font-medium'>Agent Efficiency</h3>
          <div className='mt-[10px]'>
            {progressData.map((item, index) => (
              <div key={index} className='flex items-center gap-10'>
                <p className='text-[16px] text-foreground'>{item.label}</p>
                <p className='text-[#7CCF00] text-[20px] font-medium'>+{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Laptop Chart */}
        <div className='flex-1 flex justify-center w-[40%] items-center'>
          <div className="w-[120px] h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="gradient-laptop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9DEB48" />
                    <stop offset="50%" stopColor="#E0DE58" />
                    <stop offset="100%" stopColor="#F34FA3" />
                  </linearGradient>
                </defs>
                
                <Pie
                  data={chartDataLaptop}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={55}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                  stroke="none"
                >
                  {chartDataLaptop.map((entry, index) => (
                    <Cell key={`cell-laptop-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-[30px] font-medium fill-foreground"
                >
                  75%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Large Screen View - Shows on screens >= 2000px */}
      <div className='hidden xl-plus:flex justify-between h-full w-full'>
        <div className='text-foreground w-[60%]'>
          <h3 className='text-[42px] font-medium'>Agent Efficiency</h3>
          <div className='mt-[29px]'>
            {progressData.map((item, index) => (
              <div key={index} className='flex items-center gap-10'>
                <p className='text-[34px] text-foreground'>{item.label}</p>
                <p className='text-[#7CCF00] text-[40px] font-medium'>+{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Large Screen Chart */}
        <div className='flex-1 flex justify-center w-[40%] items-center'>
          <div className="w-[320px] h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <linearGradient id="gradient-large" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9DEB48" />
                    <stop offset="50%" stopColor="#E0DE58" />
                    <stop offset="100%" stopColor="#F34FA3" />
                  </linearGradient>
                </defs>
                
                <Pie
                  data={chartDataLarge}
                  cx="50%"
                  cy="50%"
                  innerRadius={110}
                  outerRadius={130}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                  stroke="none"
                >
                  {chartDataLarge.map((entry, index) => (
                    <Cell key={`cell-large-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <text 
                  x="50%" 
                  y="50%" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-[85px] font-medium fill-foreground"
                >
                  75%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Efficiency
