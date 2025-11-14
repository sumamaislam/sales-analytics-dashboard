import { useSalesAnalytics } from '@/components/socket/useSocketData'
import React, { useMemo } from 'react'

function RatioDesign({ currentUserIndex = 0 }) {
    const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  // Memoize totalInvoicesAnalytics extraction
  const designRequestAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
      (item) => item.designRequestAnalytics
    )
  }, [salesDataa])
  
  const currentUserData = designRequestAnalytics[currentUserIndex]
  console.log(currentUserData, "designRequestAnalytics");
  return (
    <div className="bg-card xl-plus:rounded-[24px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2  xl-plus:mt-[15px] mt-[10px] ">
            {/* Header */}
            <div className="xl-plus:mb-4 mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-foreground xl-plus:text-[45px] text-[20px]"> Design request</h3>
                <div className='flex items-center xl-plus:gap-3 gap-2'>
                <h3 className="font-semibold text-foreground xl-plus:text-[45px] text-[20px]">{currentUserData?.total?.count}</h3>
                <span className={` xl-plus:text-[34px] text-[16px] ${currentUserData?.total?.comparison_percentage > 0 ? "text-[#B7FD6B]" : "text-red-500"}`}>{currentUserData?.total?.comparison_percentage > 0 ? "+" : ""}{currentUserData?.total?.comparison_percentage.toFixed(0)}%</span>
                </div>
            </div>

           

            {/* Products Quoted Progress Bar */}
            <div className="xl-plus:mb-4 mb-2 flex justify-between items-center xl-plus:mt-10 mt-6">
                <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]"> Pending</h3>
                <div className='flex items-center xl-plus:gap-3 gap-2'>
                <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]">{currentUserData?.cancelled?.count}</h3>
                <span className={` xl-plus:text-[34px] text-[16px] ${currentUserData?.cancelled?.comparison_percentage > 0 ? "text-[#B7FD6B]" : "text-red-500"}`}>{currentUserData?.cancelled?.comparison_percentage > 0 ? "+" : ""}{currentUserData?.cancelled?.comparison_percentage.toFixed(0)}%</span>
                </div>
            </div>
            <div className="xl-plus:mb-4 mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]"> In Process</h3>
                <div className='flex items-center xl-plus:gap-3 gap-2'>
                <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]">{currentUserData?.inProcess?.count}</h3>
                <span className={` xl-plus:text-[34px] text-[16px] ${currentUserData?.inProcess?.comparison_percentage > 0 ? "text-[#B7FD6B]" : "text-red-500"}`}>{currentUserData?.inProcess?.comparison_percentage > 0 ? "+" : ""}{currentUserData?.inProcess?.comparison_percentage.toFixed(0)}%</span>
                </div>
            </div>
            <div className="xl-plus:mb-4 mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]">Completed</h3>
                <div className='flex items-center xl-plus:gap-3 gap-2'>
                    <h3 className="font-semibold text-foreground xl-plus:text-[42px] text-[18px]">{currentUserData?.completed?.count}</h3>
                <span className={` xl-plus:text-[34px] text-[16px] ${currentUserData?.completed?.comparison_percentage > 0 ? "text-[#B7FD6B]" : "text-red-500"}`}>{currentUserData?.completed?.comparison_percentage > 0 ? "+" : ""}{currentUserData?.completed?.comparison_percentage.toFixed(0)}%</span>
                </div>
            </div>
            <div>

            
            </div>
        </div>
  )
}

export default RatioDesign