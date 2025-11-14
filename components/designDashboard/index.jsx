import React from 'react'
import DesignStats from './designStats'

import DieLineStats from './dieLineStats'
import TopDesigners from './topDesigners'
import TopDieLine from './topDieLine'
import TeamOverview from './teamOverview'
import DieTeamOverview from './dieTeamOverview'

function DesignDashboard({ designAndDieAnalytics }) {
  return (
    <div className='xl-plus:mt-[69px] mt-[30px]'>
    <div className='h-[85vh]  w-[100%]'>
        <div className='flex xl-plus:gap-[15px] gap-[10px] w-full'>

       
        <div className='h-[43.5vh] w-[100%] flex xl-plus:gap-[15px] gap-[10px]'>
            <div className='w-[60%]'>

        <DesignStats designAndDieAnalytics={designAndDieAnalytics}/>
            </div>
            <div className='w-[40%]'>
        <TopDesigners designAndDieAnalytics={designAndDieAnalytics}/>
            </div>
        </div>
        <div className='h-[43.5vh] w-[100%] flex xl-plus:gap-[15px] gap-[10px]'>
            <div className='w-[60%]'>

        <DieLineStats designAndDieAnalytics={designAndDieAnalytics}/>
            </div>
            <div className='w-[40%]'>
        <TopDieLine designAndDieAnalytics={designAndDieAnalytics}/>
            </div>
        </div>
        </div>
        <div className='flex xl-plus:gap-[15px] gap-[10px] w-full mt-[10px] xl-plus:mt-[15px]'>
            <div className='w-[49.8%]'>
                <TeamOverview designAndDieAnalytics={designAndDieAnalytics} />
            </div>
            <div className='w-[49.8%]'>
                <DieTeamOverview designAndDieAnalytics={designAndDieAnalytics} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DesignDashboard