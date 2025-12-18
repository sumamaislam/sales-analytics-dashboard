import { useSalesAnalytics } from '@/components/socket/useSocketData'
import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

function Efficiency({currentUserIndex = 0}) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
    const agentEfficiency = useMemo(() => {
      return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map((item) => item.agentEfficiency)
    }, [salesDataa])

      const currentUserData = agentEfficiency[currentUserIndex]

  
  const progressData = [
    { label: 'Sales', percentage: currentUserData?.sales, color: '#EC4899' },
    { label: 'Revival', percentage: currentUserData?.revival, color: '#7CCF00' },
    { label: 'Consistency', percentage: currentUserData?.consistency, color: '#3B82F6' }
  ]

  const efficiencyPercent = Math.round(Number(currentUserData?.efficiency) || 0)

  // SVG donut settings for laptop and large
  const laptop = {
    size: 120,
    stroke: 12,
  }
  const large = {
    size: 320,
    stroke: 30,
  }

  const getCircumference = (r) => 2 * Math.PI * r

  // Precompute radii and stroke offsets for animation
  const laptopRadius = laptop.size / 2 - laptop.stroke / 2
  const laptopCirc = getCircumference(laptopRadius)
  const laptopOffset = laptopCirc * (1 - Math.min(Math.max(efficiencyPercent, 0), 100) / 100)

  const largeRadius = large.size / 2 - large.stroke / 2
  const largeCirc = getCircumference(largeRadius)
  const largeOffset = largeCirc * (1 - Math.min(Math.max(efficiencyPercent, 0), 100) / 100)



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
                <p className='text-[#7CCF00] text-[20px] font-medium'>+{Math.round(item.percentage)}%</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Laptop Chart */}
        <div className='flex-1 flex justify-center w-[40%] items-center'>
          <div className="w-[120px] h-[120px] flex items-center justify-center">
            <svg viewBox={`0 0 ${laptop.size} ${laptop.size}`} width="100%" height="100%">
              <defs>
                <linearGradient id="grad-laptop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9DEB48" />
                  <stop offset="50%" stopColor="#E0DE58" />
                  <stop offset="100%" stopColor="#F34FA3" />
                </linearGradient>
              </defs>
              <circle cx={laptop.size / 2} cy={laptop.size / 2} r={laptopRadius} stroke="#E5E7EB" strokeWidth={laptop.stroke} fill="none" />
              <motion.circle
                cx={laptop.size / 2}
                cy={laptop.size / 2}
                r={laptopRadius}
                stroke="url(#grad-laptop)"
                strokeWidth={laptop.stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={laptopCirc}
                initial={{ strokeDashoffset: laptopCirc }}
                animate={{ strokeDashoffset: laptopOffset }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-[30px] font-medium fill-foreground" style={{ fontFamily: 'inherit' }}>
                {efficiencyPercent}%
              </text>
            </svg>
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
                <p className='text-[#7CCF00] text-[40px] font-medium'>+{Math.round(item.percentage)}%</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Large Screen Chart */}
        <div className='flex-1 flex justify-center w-[40%] items-center'>
          <div className="w-[320px] h-[320px] flex items-center justify-center">
            <svg viewBox={`0 0 ${large.size} ${large.size}`} width="100%" height="100%">
              <defs>
                <linearGradient id="grad-large" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9DEB48" />
                  <stop offset="50%" stopColor="#E0DE58" />
                  <stop offset="100%" stopColor="#F34FA3" />
                </linearGradient>
              </defs>
              <circle cx={large.size / 2} cy={large.size / 2} r={largeRadius} stroke="#E5E7EB" strokeWidth={large.stroke} fill="none" />
              <motion.circle
                cx={large.size / 2}
                cy={large.size / 2}
                r={largeRadius}
                stroke="url(#grad-large)"
                strokeWidth={large.stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={largeCirc}
                initial={{ strokeDashoffset: largeCirc }}
                animate={{ strokeDashoffset: largeOffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-[85px] font-medium fill-foreground" style={{ fontFamily: 'inherit' }}>
                {efficiencyPercent}%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Efficiency
