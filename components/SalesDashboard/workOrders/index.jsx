import { useSalesAnalytics } from '@/components/socket/useSocketData'
import { TrendingDown, TrendingUp } from 'lucide-react'
import React, { useMemo } from 'react'

function WorkOrders({ currentUserIndex = 0 }) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  // Memoize totalInvoicesAnalytics extraction
  const workOrdersAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
      (item) => item.workOrdersAnalytics
    )
  }, [salesDataa])
  
  const currentUserData = workOrdersAnalytics[currentUserIndex]
  console.log(currentUserData, "totalInvoices");
  const total = currentUserData?.total || 0
  const cancelled = currentUserData?.cancelled || 0
  const inProcess = currentUserData?.inProcess || 0
  const completed = currentUserData?.completed || 0
  
  // Calculate percentages
  const cancelledPercentage = total > 0 ? (cancelled / total) * 100 : 0
  const inProcessPercentage = total > 0 ? (inProcess / total) * 100 : 0
  const completedPercentage = total > 0 ? (completed / total) * 100 : 0
  return (
    <div className="bg-card xl-plus:rounded-[24px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2 ">
      {/* Header */}
      <div className="flex justify-between items-center xl-plus:mb-6 mb-2">
        <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[20px]">Work orders</h3>
        <div className="flex items-center gap-2">
       {  currentUserData?.percentage >= 0 ? <TrendingUp className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] ml-3 text-[#B7FD6B]`} /> : <TrendingDown className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] ml-3 text-red-500`} />}
          <span className={`text-green-500 font-medium xl-plus:text-[40px] text-[16px] ${currentUserData?.percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{currentUserData?.percentage > 0 ? '+' : ''}{currentUserData?.percentage?.toFixed(2) || '0.00'}%</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xl-plus:mb-6 mb-2">
        <div className="flex items-center xl-plus:h-[94px] h-[32px] bg-[#E3E4FC] xl-plus:rounded-[10px] rounded-[5px] overflow-hidden">
          {/* Colored sections - only 80% of the bar */}
          <div className="flex h-full" style={{width: '85%'}}>
            {/* Cancelled (Red) - 1/12 = 8.33% of total, but 10.42% of 80% */}
            <div className="bg-[#FF5C5C] h-full flex items-center justify-center xl-plus:rounded-r-[10px] rounded-r-[5px]" style={{width: `${cancelledPercentage  === 0 ? "10%" : cancelledPercentage}% `}}>
              <h2 className="text-white xl-plus:text-[32px] text-[16px] font-medium">{currentUserData?.cancelled}</h2>
            </div>
            
            {/* In Process (Yellow) - 2/12 = 16.67% of total, but 20.83% of 80% */}
            <div className="bg-[#FCD53F] h-full flex items-center justify-center xl-plus:rounded-r-[10px] rounded-r-[5px]" style={{width: `${inProcessPercentage === 0 ? "10%" : inProcessPercentage}% `}}>
              <h2 className="text-black xl-plus:text-[32px] text-[16px] font-medium">{currentUserData?.inProcess}</h2>
            </div>
            
            {/* Completed (Light Green) - 9/12 = 75% of total, but 93.75% of 80% */}
            <div className="bg-[#B7FD6B] h-full flex items-center justify-center xl-plus:rounded-r-[10px] rounded-r-[5px]" style={{width: `${completedPercentage === 0 ? "10%" : completedPercentage}% `}}>
              <h2 className="text-black xl-plus:text-[32px] text-[16px] font-medium">{currentUserData?.completed}</h2>
            </div>
          </div>
          
          {/* Total text area - 20% of the bar with background color only */}
          <div className="h-full flex items-center justify-center" style={{width: '15%'}}>
            <h2 className="text-black xl-plus:text-[34px] text-[16px] ">Total:{total}</h2>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-9 xl-plus:gap-9 gap-2">
        <div className="flex items-center  xl-plus:gap-5 gap-2">
          <div className="xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] bg-yellow-400 rounded"></div>
          <span className="text-foreground xl-plus:text-[34px] text-[16px]">In Process</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] bg-red-500 rounded"></div>
          <span className="text-foreground xl-plus:text-[34px] text-[16px]">Cancelled</span>
        </div>
        <div className="flex items-center gap-5">
          <div className="xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] bg-green-300 rounded"></div>
          <span className="text-foreground xl-plus:text-[34px] text-[16px]">Completed</span>
        </div>
      </div>
    </div>
  )
}

export default WorkOrders
