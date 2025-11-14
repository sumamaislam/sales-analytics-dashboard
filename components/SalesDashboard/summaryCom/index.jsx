import React, { useState } from 'react'

import TotalQuotes from '../summaryCom/totalQuotes'
import TotalInvoices from '../summaryCom/totalInvoices'


import TopAgent from '../topAgent'

import CadRequest from '../summaryCom/cadRequest'
import TotalWorkOrders from './totalWorkOrders'
import { useSalesSummary } from '@/components/socket/useSocketData'


function SummaryCom() {
    const { data: salesSummary, loading, error } = useSalesSummary()
    console.log('SummaryCom Debug:', {
        salesSummary,
        loading,
        error,
        hasCadData: salesSummary?.data?.cadRequestsAnalytics || salesSummary?.data?.cadRequestAnalytics,
        cadDailyData: salesSummary?.data?.cadRequestsAnalytics?.dailyData || salesSummary?.data?.cadRequestAnalytics?.dailyData,
        cadWeeklyReport: salesSummary?.data?.cadRequestsAnalytics?.weeklyReport || salesSummary?.data?.cadRequestAnalytics?.weeklyReport
    })

    return (
        <>
            <div className='w-[100%] 2xl:h-[72vh] flex xl-plus:gap-[20px] 2xl:gap-[20px] gap-[10px] xl-plus:mt-[69px] mt-[30px] '>
                <div className='w-[75%] bg-background-secondary xl-plus:rounded-[64px] rounded-[30px] xl-plus:px-[50px] px-[20px] xl-plus:py-[36px] py-[20px]'>
                    <div className='flex justify-between items-center xl-plus:gap-10 gap-5 xl-plus:mb-8 mb-4'>
                        <div className='flex items-center xl-plus:gap-10 gap-5'>
                            <h2 className='xl-plus:text-[44px] 2xl:text-[24px] text-[18px] text-foreground'>Quote Update </h2>
                        </div>
                    </div>

                    {/* Sales Analytics Chart */}
                    <div className='w-[100%] h-[34.5vh] flex xl-plus:gap-[15px] gap-[10px]'>
                       
                        <div className='w-[100%] h-[100%] bg-card xl-plus:rounded-[19px] rounded-[10px]'>
                            <TotalQuotes salesSummary={salesSummary}/>
                        </div>
                        <div className='w-[100%] h-[100%] bg-card xl-plus:rounded-[19px] rounded-[10px]'>
                            <TotalInvoices salesSummary={salesSummary}/>
                        </div>
                        <div className='w-[100%] h-[100%] bg-card xl-plus:rounded-[19px] rounded-[10px] '>
                            <TotalWorkOrders salesSummary={salesSummary}/>
                        </div>

                    </div>

                    <div className='w-[100%] h-[30.5vh] flex gap-[15px] xl-plus:mt-[15px] mt-[10px]'>
                        <div className='w-[100%] '>
                           <CadRequest salesSummary={salesSummary}/>
                        </div>
                    </div>
                </div>
                <div className='w-[25%]  bg-background-secondary xl-plus:rounded-[64px] rounded-[30px]'>
                    <TopAgent/>
                </div>

            </div>

        </>
    )
}

export default SummaryCom
