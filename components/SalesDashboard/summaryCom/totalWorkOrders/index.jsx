import React from "react";

export default function TotalWorkOrders({ salesSummary }) {
  // Updated data structure based on your JSON
  const workOrdersData = {
    inProcess: {
      count: 661,
      bar_percentage: 330.5,
      comparison_percentage: -4.20289855072464
    },
    cancelled: {
      count: 81,
      bar_percentage: 40.5,
      comparison_percentage: -36.71875
    },
    completed: {
      count: 194,
      bar_percentage: 97,
      comparison_percentage: -38.21656050955414
    },
    total: {
      count: 936,
      bar_percentage: 468,
      comparison_percentage: -17.31448763250883
    }
  }
  
  const data = salesSummary || { data: { workOrdersAnalytics: workOrdersData } }
  const totalWorkOrders = data?.data?.workOrdersAnalytics || workOrdersData
  console.log(totalWorkOrders, "totalWorkOrders")
  
  // Extract data from the new structure
  const totalCount = totalWorkOrders?.total?.count || 0
  const completedCount = totalWorkOrders?.completed?.count || 0
  const inProcessCount = totalWorkOrders?.inProcess?.count || 0
  const cancelledCount = totalWorkOrders?.cancelled?.count || 0
  const totalComparison = totalWorkOrders?.total?.comparison_percentage || 0
  
  // Use the bar_percentage from the data for progress bars
  const completedPercentage = totalWorkOrders?.completed?.bar_percentage || 0
  const inProcessPercentage = totalWorkOrders?.inProcess?.bar_percentage || 0
  const cancelledPercentage = totalWorkOrders?.cancelled?.bar_percentage || 0
  
  const stats = [
    {
      label: "Completed",
      value: completedCount,
      change: totalWorkOrders?.completed?.comparison_percentage >= 0 ? `+${totalWorkOrders.completed.comparison_percentage.toFixed(1)}%` : `${totalWorkOrders.completed.comparison_percentage.toFixed(1)}%`,
      changeColor: totalWorkOrders?.completed?.comparison_percentage >= 0 ? "#B7FD6B" : "#FF0000",
      barColor: "#B7FD6B",
      progress: `${completedPercentage}%`,
    },
    {
      label: "In Process",
      value: inProcessCount,
      change: totalWorkOrders?.inProcess?.comparison_percentage >= 0 ? `+${totalWorkOrders.inProcess.comparison_percentage.toFixed(1)}%` : `${totalWorkOrders.inProcess.comparison_percentage.toFixed(1)}%`,
      changeColor: totalWorkOrders?.inProcess?.comparison_percentage >= 0 ? "#B7FD6B" : "#FF0000",
      barColor: "#FCD53F",
      progress: `${inProcessPercentage}%`,
    },
    {
      label: "Cancelled",
      value: cancelledCount,
      change: totalWorkOrders?.cancelled?.comparison_percentage >= 0 ? `+${totalWorkOrders.cancelled.comparison_percentage.toFixed(1)}%` : `${totalWorkOrders.cancelled.comparison_percentage.toFixed(1)}%`,
      changeColor: totalWorkOrders?.cancelled?.comparison_percentage >= 0 ? "#B7FD6B" : "#FF0000",
      barColor: "#FF5C5C",
      progress: `${cancelledPercentage}%`,
    },
  ];

  return (
    <div className="rounded-[24px] xl-plus:p-[34px] p-[20px] text-foreground">
      <h3 className="xl-plus:text-[42px] text-[20px] font-medium">Total Work orders</h3>

      <div className="xl-plus:mt-[25px] mt-[15px] xl-plus:mb-[40px] mb-[20px] flex items-end gap-[40px]">
        <h3 className="xl-plus:text-[80px] text-[32px] leading-none font-semibold">{totalCount}</h3>
        <p className={` xl-plus:text-[40px] text-[20px] font-semibold  ${totalComparison >= 0 ? 'text-[#B7FD6B]' : 'text-red-500'}`}>{totalComparison >= 0 ? '+' : ''}{totalComparison.toFixed(1)}%</p>
      </div>

      {/* Top pale bar with knob */}    
      <div>
        <div className="relative xl-plus:h-[82px] h-[32px] w-[100%] rounded-[10px] bg-[#E3E4FC]">
          <div className="absolute left-1/2 top-1/2 w-[100%] border-b border-[#ececec] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute xl-plus:right-[-6px] right-[-3px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
            <div className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9DDE3]" />
          </div>
        </div>
      </div>

      {/* Bars mapped from array */}
      <div className="mt-3 flex flex-col xl-plus:gap-[15px] gap-[10px]">
        {stats.map((item, i) => (
          <div key={i} className="flex items-center xl-plus:gap-[30px] gap-[15px]">
            {/* Bar */}
            <div className="relative xl-plus:h-[82px] h-[32px] rounded-[10px] bg-bar xl-plus:pr-[20px] pr-[10px]" style={{ width: `${item.progress}` }}>
              <div className="relative h-full w-full rounded-[10px]" style={{ backgroundColor: item.barColor }}>
                <div className="absolute left-1/2 top-1/2 w-full border-b border-b-[0.5px] border-black -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute xl-plus:right-[-6px] right-[-3px] top-1/2 xl-plus:h-[18px] h-[12px] xl-plus:w-[18px] w-[12px] -translate-y-1/2 rounded-full bg-white border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
                  <div className="absolute left-1/2 top-1/2 xl-plus:h-[6px] h-[4px] xl-plus:w-[6px] w-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9DDE3]" />
                </div>
              </div>
            </div>

            {/* Value + change */}
            <div className="flex items-baseline gap-2">
              <p className="xl-plus:text-[40px] text-[20px] text-foreground">{item.value}</p>
              <p className="xl-plus:text-[40px] text-[20px] font-semibold" style={{ color: item.changeColor }}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="xl-plus:mt-[24px] mt-[15px] flex items-center justify-between gap-4 xl-plus:text-[34px] text-[16px] text-foreground">
        {stats.map((item, i) => (
          <div key={i} className="flex items-center xl-plus:gap-[20px] gap-[10px]">
            <p className="inline-block xl-plus:h-[30px] h-[20px] xl-plus:w-[30px] w-[20px] rounded-[6px]" style={{ backgroundColor: item.barColor }} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}