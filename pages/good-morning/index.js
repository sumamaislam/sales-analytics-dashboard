import GoodMorning from '@/components/goodMorning'
import GoodNight from '@/components/goodNight'
import React from 'react'

function GoodMornings() {
    return (
        <div>
            {/* <GoodMorning  isVisible={true} /> */}
            <GoodNight   isVisible={true} />
        </div>
    )
}

export default GoodMornings
