import React, { useMemo } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useSalesAnalytics } from '@/components/socket/useSocketData'

function TotalInvoices({ currentUserIndex = 0 }) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  
  // Memoize totalInvoicesAnalytics extraction
  const totalInvoicesAnalytics = useMemo(() => {
    return Object.values(salesDataa?.data?.salesAnalyticsUserWise || {}).map(
      (item) => item.totalInvoicesAnalytics
    )
  }, [salesDataa])
  
  const currentUserData = totalInvoicesAnalytics[currentUserIndex]
  console.log(currentUserData, "sumi");
  const totalInvoices = currentUserData?.total?.count
  return (
    <div className='bg-card h-[100%] xl-plus:rounded-[19px] rounded-[10px] xl-plus:px-8 px-4 xl-plus:py-4 py-2'>
      <div className='text-foreground'>
        <h3 className='xl-plus:text-[38px] text-[20px] font-medium'>Total Invoices</h3>
        
        {/* Main Number with Growth Indicator */}
        <div className='flex items-center gap-3 xl-plus:mb-6 mb-4'>
          <h3 className='xl-plus:text-[60px] text-[32px] font-normal'>{totalInvoices}</h3>
          <div className='flex items-center gap-1 xl-plus:text-[40px] text-[20px]'>
            {currentUserData?.total?.comparison_percentage >= 0 ? (
              <TrendingUp className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-[#7CCF00]`} />
            ) : (
              <TrendingDown className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-red-500`} />
            )}
            <span className={`font-normal ${currentUserData?.total?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}>
              {currentUserData?.total?.comparison_percentage > 0 ? ' + ' : ' ' }{currentUserData?.total?.comparison_percentage?.toFixed(0) || '0.00'}%
            </span>
          </div>
        </div>

        {/* Progress Bars Section */}
        <div className='xl-plus:space-y-8 space-y-2'>
          {/* Approved Invoices */}
          <div className='xl-plus:space-y-3 space-y-2 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[52px] h-[32px] relative flex items-center justify-end pr-4'>
              <div className='bg-[#9DEB48] text-foreground xl-plus:h-[52px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: currentUserData?.approved?.bar_percentage }}></div>
                <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground  relative z-10'>{currentUserData?.approved?.bar_percentage.toFixed(0)}%</h2>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center xl-plus:gap-3 gap-2'>
             
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Approved: {currentUserData?.approved?.count}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {currentUserData?.approved?.comparison_percentage >= 0 ? (
                    <TrendingUp className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-[#7CCF00]`} />
                  ) : (
                    <TrendingDown className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-red-500`} />
                  )}
                  <span className={`xl-plus:text-[40px] text-[16px] font-normal ${currentUserData?.approved?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}>
                    {currentUserData?.approved?.comparison_percentage > 0 ? '+' : ''}{currentUserData?.approved?.comparison_percentage?.toFixed(0) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Revision Invoices */}
          <div className='xl-plus:space-y-3 space-y-2 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[52px] h-[32px] relative flex items-center justify-end pr-4'>
              <div className='bg-[#DDB417] xl-plus:h-[52px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: currentUserData?.revision?.bar_percentage}}></div>
              <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground relative z-10'>{currentUserData?.revision?.bar_percentage.toFixed(0)}%</h2>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
              
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Revision: {currentUserData?.revision?.count}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {currentUserData?.revision?.comparison_percentage >= 0 ? (
                    <TrendingUp className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-[#7CCF00]`} />
                  ) : (
                    <TrendingDown className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-red-500`} />
                  )}
                  <span className={`xl-plus:text-[40px] text-[16px] font-normal ${currentUserData?.revision?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}>
                    {currentUserData?.revision?.comparison_percentage > 0 ? '+' : ''}{currentUserData?.revision?.comparison_percentage?.toFixed(0) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancelled Invoices */}
          <div className='space-y-3 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[52px] h-[32px] relative flex items-center justify-end pr-4'>
              <div className='bg-[#FF5C5C] xl-plus:h-[52px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: currentUserData?.cancelled?.bar_percentage}}></div>
              <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground relative z-10'>{currentUserData?.cancelled?.bar_percentage.toFixed(0)}%</h2>
            </div>  
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
               
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Cancelled: {currentUserData?.cancelled?.count}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {currentUserData?.cancelled?.comparison_percentage >= 0 ? (
                    <TrendingUp className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-[#7CCF00]`} />
                  ) : (
                    <TrendingDown className={`xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-red-500`} />
                  )}
                  <span className={`xl-plus:text-[40px] text-[16px] font-normal ${currentUserData?.cancelled?.comparison_percentage >= 0 ? 'text-[#7CCF00]' : 'text-red-500'}`}>
                    {currentUserData?.cancelled?.comparison_percentage > 0 ? '+' : ''}{currentUserData?.cancelled?.comparison_percentage?.toFixed(0) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalInvoices