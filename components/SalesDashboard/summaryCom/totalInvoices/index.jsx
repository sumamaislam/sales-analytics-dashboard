import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

function TotalInvoices({ salesSummary }) {
const data =  salesSummary
const totalInvoices = data?.data?.totalInvoicesAnalytics || {}
console.log(totalInvoices, "totalInvoices")
  // const totalInvoices = 120
  const totalCount = totalInvoices?.total?.count || "0"
  const approvedCount = totalInvoices?.approved?.count || "0"
  const revisionCount = totalInvoices?.revision?.count || "0"
  const cancelledCount = totalInvoices?.cancelled?.count || "0"
  const totalComparison = totalInvoices?.total?.comparison_percentage || 0

  return (
    <div className=' h-[100%] xl-plus:p-[34px] p-[20px]'>
      <div className='text-foreground'>
        <h3 className='xl-plus:text-[42px] text-[20px] font-medium'>Total Invoices</h3>
        
        {/* Main Number with Growth Indicator */}
        <div className='flex items-center gap-3 xl-plus:mb-6 mb-4'>
          <h3 className='xl-plus:text-[80px] text-[32px] font-normal'>{totalCount}</h3>
          <div className='flex items-center gap-1 xl-plus:text-[40px] text-[20px]'>
           {totalComparison >= 0 ? <TrendingUp className='xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-[#B7FD6B]' /> : <TrendingDown className='xl-plus:w-[29px] w-[16px] xl-plus:h-[29px] h-[16px] text-red-500' />}
            <span className={`text-[#B7FD6B] font-normal ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{totalComparison >= 0 ? '+' : ''}{totalComparison.toFixed(1)}%</span>
          </div>
        </div>

        {/* Progress Bars Section */}
        <div className='xl-plus:space-y-8 space-y-2'>
          {/* Approved Invoices */}
          <div className='xl-plus:space-y-1 space-y-2 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[65px] h-[32px] relative flex items-center justify-end pr-4'>
              <div className='bg-[#9DEB48] text-foreground xl-plus:h-[65px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: `${totalInvoices?.approved?.bar_percentage.toFixed(0)}%`}}></div>
                <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground  relative z-10'>{totalInvoices?.approved?.bar_percentage.toFixed(0)}%</h2>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center xl-plus:gap-3 gap-2'>
             
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Approved: {approvedCount}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {totalInvoices?.approved?.comparison_percentage >= 0 ? <TrendingUp className='w-4 h-4 text-[#B7FD6B]' /> : <TrendingDown className='w-4 h-4 text-red-500' />}
                  <span className={`text-[#B7FD6B] xl-plus:text-[40px] text-[16px] font-normal ${totalInvoices?.approved?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{totalInvoices?.approved?.comparison_percentage >= 0 ? '+' : ''}{totalInvoices?.approved?.comparison_percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revision Invoices */}
          <div className='xl-plus:space-y-1 space-y-2 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[65px] h-[32px] relative flex items-center justify-end pr-4'>
              <div className='bg-[#DDB417] xl-plus:h-[65px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: `${totalInvoices?.revision?.bar_percentage.toFixed(0)}%`}}></div>
              <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground relative z-10'>{totalInvoices?.revision?.bar_percentage.toFixed(0)}%</h2>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
              
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Revision: {revisionCount}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {totalInvoices?.revision?.comparison_percentage >= 0 ? <TrendingUp className='w-4 h-4 text-[#B7FD6B]' /> : <TrendingDown className='w-4 h-4 text-red-500' />}
                  <span className={`text-red-500 xl-plus:text-[40px] text-[16px] font-normal ${totalInvoices?.revision?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{totalInvoices?.revision?.comparison_percentage >= 0 ? '+' : ''}{totalInvoices?.revision?.comparison_percentage.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancelled Invoices */}
          <div className='space-y-3 text-foreground'>
            <div className='w-full bg-bar xl-plus:rounded-[18px] rounded-[10px] xl-plus:h-[65px] h-[32px] relative flex items-center justify-end pr-4'>
                <div className='bg-[#FF5C5C] xl-plus:h-[65px] h-[32px] xl-plus:rounded-[18px] rounded-[10px] absolute left-0 top-0' style={{width: `${totalInvoices?.cancelled?.bar_percentage.toFixed(0)}%`}}></div>
                    <h2 className='xl-plus:text-[32px] text-[16px]  text-foreground relative z-10'> {totalInvoices?.cancelled?.bar_percentage.toFixed(0)}%</h2>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
               
                <span className='xl-plus:text-[34px] text-[16px] font-normal'>Cancelled: {cancelledCount}</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1 xl-plus:text-[20px] text-[16px]'>
                  {totalInvoices?.cancelled?.comparison_percentage >= 0 ? <TrendingUp className='w-4 h-4 text-[#B7FD6B]' /> : <TrendingDown className='w-4 h-4 text-red-500' />}
                  <span className={`text-red-500 xl-plus:text-[40px] text-[16px] font-normal ${totalInvoices?.cancelled?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{totalInvoices?.cancelled?.comparison_percentage >= 0 ? '+' : ''}{totalInvoices?.cancelled?.comparison_percentage.toFixed(1)}%</span>
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