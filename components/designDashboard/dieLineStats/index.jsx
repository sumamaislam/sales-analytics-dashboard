import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function DieLineStats({designAndDieAnalytics}) {
    // Updated data structure based on your JSON
 

    const data = designAndDieAnalytics?.data?.dieQuickStats;
    const dieLineStats = data

    // Calculate percentages for pie chart
    const totalCount = dieLineStats?.total?.count || 0;
    const completedPercentage = totalCount > 0 ? Math.round((dieLineStats?.completed?.count / totalCount) * 100) : 0;
    const cancelledPercentage = totalCount > 0 ? Math.round((dieLineStats?.cancelled?.count / totalCount) * 100) : 0;
    const inProcessPercentage = totalCount > 0 ? Math.round((dieLineStats?.inProcess?.count / totalCount) * 100) : 0;

    const chartDataLarge = [
        { name: 'Completed', value: dieLineStats?.completed?.count || 0, fill: '#9DEB48', percentage: completedPercentage },
        { name: 'Cancelled', value: dieLineStats?.cancelled?.count || 0, fill: '#FF6723', percentage: cancelledPercentage },
        { name: 'In Process', value: dieLineStats?.inProcess?.count || 0, fill: '#3A8DFF', percentage: inProcessPercentage },
    ];

    const isXlPlus = useMediaQuery({ minWidth: 2000 });

    return (
        <div className='bg-background-secondary xl-plus:rounded-[64px] w-full rounded-[10px] xl-plus:p-[45px] p-4 h-full'>
            {/* Header */}
            <div className='mb-4'>
                <h2 className='text-foreground text-[20px] xl-plus:text-[42px] font-bold'>Die Quick Stats</h2>
            </div>

            {/* Large Screen*/}
            <div className='flex justify-between h-auto gap-[30px] xl-plus:gap-[60px] w-[100%] mt-[0px] xl-plus:mt-[70px]'>
                {/* Left Section - Text Data */}
                <div className='text-foreground w-[35%] h-[100%] '>
                    <div className='mt-3 space-y-[10px] flex flex-col gap-[4px]'>
                        <div className='bg-card rounded-[10px] xl-plus:rounded-[19px] px-[25px] py-[8px] xl-plus:py-[10px]'>
                            <p className='text-[16px] xl-plus:text-[34px] font-normal text-foreground pb-[5px] xl-plus:pb-[5px]'>In Process</p>
                            <div className='flex items-center gap-[15px] xl-plus:gap-[28px] justify-between'>
                                <span className='text-[16px] xl-plus:text-[45px] font-bold text-foreground'>{dieLineStats?.inProcess?.count || 0}</span>
                                <div className='flex flex-col items-start'>
                                    <p className={`text-[14px] xl-plus:text-[40px] font-bold ${dieLineStats?.inProcess?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-[#FF0000]'}`}>
                                        {dieLineStats?.inProcess?.comparison_percentage >= 0 ? '+' : ''}{dieLineStats?.inProcess?.comparison_percentage?.toFixed(1)}%
                                    </p>
                                    {/* <p className='text-[11px] xl-plus:text-[22px] font-light text-white'>Previous day</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='bg-card rounded-[10px] xl-plus:rounded-[19px] px-[25px] py-[8px] xl-plus:py-[10px]'>
                            <p className='text-[16px] xl-plus:text-[34px] font-normal text-foreground pb-[5px] xl-plus:pb-[5px]'>Cancelled</p>
                            <div className='flex items-center gap-[15px] xl-plus:gap-[28px] justify-between'>
                                <span className='text-[16px] xl-plus:text-[45px] font-bold text-foreground'>{dieLineStats?.cancelled?.count || 0}</span>
                                <div className='flex flex-col items-start'>
                                    <p className={`text-[14px] xl-plus:text-[40px] font-bold ${dieLineStats?.cancelled?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-[#FF0000]'}`}>
                                        {dieLineStats?.cancelled?.comparison_percentage >= 0 ? '+' : ''}{dieLineStats?.cancelled?.comparison_percentage?.toFixed(1)}%
                                    </p>
                                    {/* <p className='text-[11px] xl-plus:text-[22px] font-light text-white'>Previous day</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='bg-card rounded-[10px] xl-plus:rounded-[19px] px-[25px] py-[8px] xl-plus:py-[10px]'>
                            <p className='text-[16px] xl-plus:text-[34px] font-normal text-foreground pb-[5px] xl-plus:pb-[5px]'>Completed</p>
                            <div className='flex items-center gap-[15px] xl-plus:gap-[28px] justify-between'>
                                <span className='text-[16px] xl-plus:text-[45px] font-bold text-foreground'>{dieLineStats?.completed?.count || 0}</span>
                                <div className='flex flex-col items-start'>
                                    <p className={`text-[14px] xl-plus:text-[40px] font-bold ${dieLineStats?.completed?.comparison_percentage >= 0 ? 'text-[#B7FD6B]' : 'text-[#FF0000]'}`}>
                                        {dieLineStats?.completed?.comparison_percentage >= 0 ? '+' : ''}{dieLineStats?.completed?.comparison_percentage?.toFixed(1)}%
                                    </p>
                                    {/* <p className='text-[11px] xl-plus:text-[22px] font-light text-white'>Previous day</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Donut Chart */}
                <div className='w-[65%] h-[100%]'>
                    <div className="w-full text-foreground h-[280px] xl-plus:h-[670.99px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartDataLarge}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={isXlPlus ? "50%" : "50%"}
                                    outerRadius={isXlPlus ? "102%" : "90%"}
                                    startAngle={90}
                                    endAngle={450}
                                    dataKey="value"
                                    stroke="none"
                                    label={({ percentage, cx, cy, midAngle, innerRadius, outerRadius }) => {
                                        if (percentage < 5) return null;
                                        const RADIAN = Math.PI / 180;
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                className="text-[18px] xl-plus:text-[42px]  text-foreground font-bold"
                                            >
                                                {`${percentage}%`}
                                            </text>
                                        );
                                    }}
                                    labelLine={false}
                                >
                                    {chartDataLarge.map((entry, index) => (
                                        <Cell key={`cell-large-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>

                                {/* Center Text */}
                                <text
                                    x="50%"
                                    y="40%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-[22px] xl-plus:text-[50px]  font-bold text-foreground"
                                >
                                    {totalCount}
                                </text>
                                <text
                                    x="50%"
                                    y="48%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className={`text-[14px] text-foreground xl-plus:text-[30px] `}
                                >
                                    This Month
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>


                </div>
            </div>

            {/* Legend */}
            <div className='mt-6 flex justify-center space-x-[35px] xl-plus:space-x-[46px]'>
                <div className='flex items-center gap-[10px] xl-plus:gap-[17.9px]'>
                    <div className='w-3 xl-plus:w-[30px] h-3 xl-plus:h-[30px] bg-[#3A8DFF] rounded-[2px] xl-plus:rounded-[4px]'></div>
                    <span className='text-foreground text-[12px] xl-plus:text-[34px]'>In Process</span>
                </div>
                <div className='flex items-center gap-[10px] xl-plus:gap-[17.9px]'>
                    <div className='w-3 xl-plus:w-[30px] h-3 xl-plus:h-[30px] bg-[#FF6723] rounded-[2px] xl-plus:rounded-[4px]'></div>
                    <span className='text-foreground text-[12px] xl-plus:text-[34px]'>Pending</span>
                </div>
                <div className='flex items-center gap-[10px] xl-plus:gap-[17.9px]'>
                    <div className='w-3 xl-plus:w-[30px] h-3 xl-plus:h-[30px] bg-[#9DEB48] rounded-[2px] xl-plus:rounded-[4px]'></div>
                    <span className='text-foreground text-[12px] xl-plus:text-[34px]'>Completed</span>
                </div>
            </div>
        </div>
    )
}

export default DieLineStats