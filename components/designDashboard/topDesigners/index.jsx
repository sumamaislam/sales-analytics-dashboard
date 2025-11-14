import React from "react";

function TopDesigners({ designAndDieAnalytics }) {
  const data = designAndDieAnalytics?.data?.topDesigners || {}
  console.log(data, "data")
  // Updated data structure based on your JSON
  // const topDesignersData = {
  //   "Henry Cavill": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 18.181818181818183,
  //     "designCount": 2
  //   },
  //   "Amir Jones": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Sam Stone": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Harry Wilson": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Kyle Ali": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Omar Fox": {
  //     "comparisonPercentage": -50,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Tyson Blake": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Ace Eli": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Zayna skye": {
  //     "comparisonPercentage": -50,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   },
  //   "Ian Burt": {
  //     "comparisonPercentage": 0,
  //     "barPercentage": 9.090909090909092,
  //     "designCount": 1
  //   }
  // };

  // Convert data to array and sort by design count (descending), then take only first 4
  const agents = Object.entries(data)
    .map(([name, data], index) => ({
      name,
      progress: `${data.designCount} Designs`,
      change: data.comparisonPercentage >= 0 ? `+${data.comparisonPercentage.toFixed(2)}%` : `${data.comparisonPercentage.toFixed(2)}%`,
      isPositive: data.comparisonPercentage >= 0,
      barPercentage: data.barPercentage,
      designCount: data.designCount,
      rank: index + 1,
      rankImg: index === 0 ? "/images/salesDashboard/one_prem.svg" : 
               index === 1 ? "/images/salesDashboard/two_prem.svg" : 
               index === 2 ? "/images/salesDashboard/three_prem.svg" : null
    }))
    // .sort((a, b) => b.designCount - a.designCount)
    .slice(0, 4); // Show only first 4 designers

  return (
    <div className="xl-plus:px-[40px] h-full bg-background-secondary px-[20px] xl-plus:py-[36px] py-[15px] xl-plus:rounded-[64px] rounded-[10px] w-full xl-plus:space-y-[40px] space-y-[15px]">
      <h2 className="xl-plus:text-[40px] text-[20px] text-foreground font-bold">
        Top Designers
      </h2>

      {agents.map((agent, idx) => (
        <div
          key={idx}
          className="flex items-center xl-plus:space-x-4 space-x-2"
        >
          <div className="flex-1">
            {/* Name + Change */}
            <div className="flex items-center justify-between">
              <div className="xl-plus:mb-[24px] mb-[10px] flex items-center xl-plus:gap-[20px] gap-[10px]">
                {agent.rankImg ? (
                  <img
                    src={agent.rankImg}
                    alt="rank"
                    className="xl-plus:w-[65px] xl-plus:h-auto w-[35px] h-auto"
                  />
                ) : (
                  <div className="xl-plus:w-[60px] w-[35px] text-foreground font-bold xl-plus:text-[28px] text-[14px]">
                    {agent.rank}.
                  </div>
                )}
                <div className="xl-plus:text-[32px] text-[16px] font-medium">
                  {agent.name}
                </div>
              </div>

              <div
                className={`flex items-center space-x-1 ${agent.isPositive ? "text-[#7CCF00]" : "text-[#FF0000]"
                  }`}
              >
                {agent.isPositive ? (
                  <svg
                    className="xl-plus:w-4 xl-plus:h-4 w-2 h-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="xl-plus:w-4 xl-plus:h-4 w-2 h-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="xl-plus:text-[30px] text-[16px] font-medium">
                  {agent.change}
                </span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full xl-plus:h-[90px] h-[44px] xl-plus:p-4 p-2 rounded-[44px]  bg-bar backdrop-blur-lg overflow-visible">
              {/* Percentage Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center mx-auto justify-center z-60 text-foreground xl-plus:text-[28px] text-[14px] font-bold xl-plus:drop-shadow-2xl drop-shadow-2xl ">
                {agent.progress}
              </div>

                {/* <div
                  className="absolute left-0 top-0 xl-plus:rounded-[44px] rounded-[10px] blur-[33px] xl-plus:blur-[43px] h-[70%] xl-plus:h-[80%]"
                  style={{
                    width: `${agent.progress}%`,
                    marginTop: "10px",
                    background:
                      "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
                  }}
                ></div> */}

              {/* Solid progress bar */}
              <div
                className="xl-plus:h-[48px] h-[23px] xl-plus:mt-[5px] mt-[2px] flex items-center justify-center rounded-full relative overflow-hidden z-50"
                style={{
                  width: `${agent.barPercentage}%`,
                  background:
                    "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
                }}
              >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopDesigners;
