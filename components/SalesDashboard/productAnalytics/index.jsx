
import { useSalesAnalytics } from '@/components/socket/useSocketData'
import React, { useMemo } from 'react'

function ProductAnalytics({ currentUserIndex = 0 }) {
    const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  // Memoize totalInvoicesAnalytics extraction
  const productAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
      (item) => item.productAnalytics
    )
  }, [salesDataa])
  
  const currentUserData = productAnalytics[currentUserIndex]
  console.log(currentUserData, "totalInvoices");
    return (
        <div className="bg-card xl-plus:rounded-[24px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2 xl-plus:mt-[15px] mt-[10px]">
            {/* Header */}
            <div className="xl-plus:mb-6 mb-2">
                <h3 className=" font-semibold text-foreground xl-plus:text-[42px] text-[20px]">Product Analytics</h3>
            </div>

            {/* Products Approved Progress Bar */}
            <div className="xl-plus:mb-6 mb-2">

                <div className='xl-plus:space-y-3 space-y-2 text-foreground'>
                    <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[52px] h-[25px] relative flex items-center justify-end pr-4'>
                        <div className='bg-[#9DEB48] text-foreground xl-plus:h-[52px] h-[25px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{ width: `${currentUserData?.approved?.bar_percentage.toFixed(0)}%` }}></div>
                        <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground  relative z-10'>{currentUserData?.approved?.count || 0}</h2>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>

                            <span className='xl-plus:text-[34px] text-[16px] '>Products Approved</span>
                        </div>

                        <div className='xl-plus:text-[20px] text-[16px]'>

                            <span className={`text-[#7CCF00] xl-plus:text-[34px]  text-[16px] ${currentUserData?.approved?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}> {currentUserData?.approved?.comparison_percentage > 0 ? '+' : ''} {currentUserData?.approved?.comparison_percentage.toFixed(0)}%</span>

                        </div>
                    </div>
                </div>

            </div>

            {/* Products Quoted Progress Bar */}
            <div>

                <div className='xl-plus:space-y-3 space-y-2 text-foreground'>
                    <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[52px] h-[25px] relative flex items-center justify-end pr-4'>
                        <div className='bg-[#9DEB48] text-foreground xl-plus:h-[52px] h-[25px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{
                            width: `${currentUserData?.quoted?.bar_percentage.toFixed(0)}%`,
                            background: 'linear-gradient(90deg, #286CFF 0%, #E062E3 50%, #DDBD01 100%)'
                        }}></div>
                        <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground  relative z-10'>{currentUserData?.quoted?.count || 0}</h2>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>

                            <span className='xl-plus:text-[34px] text-[16px] '>Products Quoted</span>
                        </div>

                        <div className='xl-plus:text-[20px] text-[16px]'>

                            <span className={`text-[#7CCF00] xl-plus:text-[34px] text-[16px]  ${currentUserData?.quoted?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}> {currentUserData?.quoted?.comparison_percentage > 0 ? '+ ' : ' '} {currentUserData?.quoted?.comparison_percentage.toFixed(0)}%</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductAnalytics