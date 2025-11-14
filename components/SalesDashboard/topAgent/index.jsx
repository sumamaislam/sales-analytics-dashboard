// import React from "react";

// function TopAgent() {
//   const agents = [
//     {
//       name: "Ayaan Tariq",
//       progress: 78,
//       change: "+12%",
//       isPositive: true,
//       rankImg: "/images/salesDashboard/one_prem.svg",
//     },
//     {
//       name: "Omar Rehman",
//       progress: 64,
//       change: "+8%",
//       isPositive: true,
//       rankImg: "/images/salesDashboard/two_prem.svg",
//     },
//     {
//       name: "Sara Naveed",
//       progress: 51,
//       change: "+5%",
//       isPositive: true,
//       rankImg: "/images/salesDashboard/three_prem.svg",
//     },
//     {
//       name: "Sophia Parker",
//       progress: 37,
//       change: "-1%",
//       isPositive: false,
//     },
//     {
//       name: "David Parker",
//       progress: 33,
//       change: "-2%",
//       isPositive: false,
//     },
//     {
//       name: "Adam Parker",
//       progress: 29,
//       change: "-3%",
//       isPositive: false,
//     },
//     {
//       name: "James Anderson",
//       progress: 24,
//       change: "-4%",
//       isPositive: false,
//     },
//   ];

//   return (
//     <div className="xl-plus:px-[40px] px-[20px] xl-plus:py-[36px] py-[15px] xl-plus:rounded-xl rounded-[10px] w-full xl-plus:space-y-[40px] space-y-[15px]">
//       <h2 className="xl-plus:text-[40px] text-[20px] text-foreground font-bold">
//         Top Agent
//       </h2>

//       {agents.map((agent, idx) => (
//         <div
//           key={idx}
//           className="flex items-center xl-plus:space-x-4 space-x-2"
//         >
//           <div className="flex-1">
//             {/* Name + Change */}
//             <div className="flex items-center justify-between">
//               <div className="xl-plus:mb-[24px] mb-[10px] flex items-center xl-plus:gap-[20px] gap-[10px]">
//                 {idx < 3 ? (
//                   <img
//                     src={agent.rankImg}
//                     alt="rank"
//                     className="xl-plus:w-[65px] xl-plus:h-auto w-[35px] h-auto"
//                   />
//                 ) : (
//                   <div className="xl-plus:w-[60px] w-[35px] text-foreground font-bold xl-plus:text-[28px] text-[14px]">
//                     {idx + 1}.
//                   </div>
//                 )}
//                 <div className="xl-plus:text-[32px] text-[16px] font-medium">
//                   {agent.name}
//                 </div>
//               </div>

//               <div
//                 className={`flex items-center space-x-1 ${agent.isPositive ? "text-[#B7FD6B]" : "text-[#FF0000]"
//                   }`}
//               >
//                 {agent.isPositive ? (
//                   <svg
//                     className="xl-plus:w-4 xl-plus:h-4 w-2 h-2"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="xl-plus:w-4 xl-plus:h-4 w-2 h-2"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 )}
//                 <span className="xl-plus:text-[30px] text-[16px] font-medium">
//                   {agent.change}
//                 </span>
//               </div>
//             </div>

//             {/* Progress Bar Container */}
//             <div className="relative w-full xl-plus:h-[88px] h-[44px] xl-plus:p-4 p-2 rounded-[44px]  bg-bar backdrop-blur-lg overflow-visible">
//               {/* Percentage Text */}
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center mx-auto justify-center z-60 text-foreground xl-plus:text-[28px] text-[14px] font-bold xl-plus:drop-shadow-2xl drop-shadow-2xl ">
//                 {agent.progress}%
//               </div>

//               {/* Blur effect only for Top 3 */}
//               {idx < 3 && (
//                 <div
//                   className="absolute left-0 top-0 xl-plus:rounded-[44px] rounded-[10px] blur-[33px] xl-plus:blur-[43px] h-[70%] xl-plus:h-[80%]"
//                   style={{
//                     width: `${agent.progress}%`,
//                     // filter: "blur(43px)",
//                     // height: "80%",
//                     marginTop: "10px",
//                     background:
//                       "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
//                   }}
//                 ></div>
//               )}

//               {/* Solid progress bar */}
//               <div
//                 className="xl-plus:h-[46px] h-[23px] xl-plus:mt-[5px] mt-[2px] flex items-center justify-center rounded-full relative overflow-hidden z-50"
//                 style={{
//                   width: `${agent.progress}%`,
//                   background:
//                     "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
//                 }}
//               >
//                 {idx < 3 && (
//                   <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-transparent"></div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TopAgent;



// import React from "react";

// export default function WorkOrdersCard() {
//   const stats = [
//     {
//       label: "Completed",
//       value: 170,
//       change: "+6.25%",
//       changeColor: "#B7FD6B",
//       barColor: "#B7FD6B",
//       progress: "68%",
//     },
//     {
//       label: "In Process",
//       value: 40,
//       change: "-20%",
//       changeColor: "#FF0000",
//       barColor: "#FCD53F",
//       progress: "40%",
//     },
//     {
//       label: "Cancelled",
//       value: 10,
//       change: "-20%",
//       changeColor: "#FF0000",
//       barColor: "#FF5C5C",
//       progress: "18%",
//     },
//   ];

//   return (
//     <div className="bg-card rounded-[24px] px-8 py-4 text-white">
//       <p className="text-[42px] text-[#FFFFFF]">Total Work orders</p>

//       <div className="mt-[12px] mb-[30px] flex items-end gap-[40px]">
//         <p className="text-[80px] leading-none font-semibold">120</p>
//         <p className="text-[40px] font-semibold text-[#B7FD6B]">+33.3%</p>
//       </div>

//       {/* Top pale bar with knob */}
//       <div>
//         <div className="relative h-[82px] w-[100%] rounded-[10px] bg-[#E3E4FC]">
//           <div className="absolute left-1/2 top-1/2 w-[100%] border-b border-[#ececec] -translate-x-1/2 -translate-y-1/2" />
//           <div className="absolute right-[-6px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
//             <div className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9DDE3]" />
//           </div>
//         </div>
//       </div>

//       {/* Bars mapped from array */}
//       <div className="mt-3 flex flex-col gap-[15px]">
//         {stats.map((item, i) => (
//           <div key={i} className="flex items-center gap-[30px]">
//             {/* Bar */}
//             <div className="relative h-[82px] rounded-[10px] bg-[#E3E4FC] pr-[20px]" style={{ width: item.progress }}>
//               <div className="relative h-full w-full rounded-[10px]" style={{ backgroundColor: item.barColor }}>
//                 <div className="absolute left-1/2 top-1/2 w-full border-b border-[#ececec] -translate-x-1/2 -translate-y-1/2" />
//                 <div className="absolute right-[-6px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-white border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.06)]">
//                   <div className="absolute left-1/2 top-1/2 h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9DDE3]" />
//                 </div>
//               </div>
//             </div>

//             {/* Value + change */}
//             <div className="flex items-baseline gap-2">
//               <p className="text-[40px] text-[#E3E4FC]">{item.value}</p>
//               <p className="text-[40px] font-semibold" style={{ color: item.changeColor }}>
//                 {item.change}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Legend */}
//       <div className="mt-[24px] flex items-center justify-between gap-4 text-[34px] text-[#FFFFFF]">
//         {stats.map((item, i) => (
//           <div key={i} className="flex items-center gap-[20px]">
//             <p className="inline-block h-[30px] w-[30px] rounded-[6px]" style={{ backgroundColor: item.barColor }} />
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import React from "react";

// export default function InvoiceCard() {
//   return (
//     <div className="bg-[#1c1c1c] text-white rounded-[24px] p-6 font-sans">
//       {/* Header */}
//       <p className="text-[18px] text-gray-300">Total Invoices</p>
//       <div className="flex items-end gap-3 mt-1">
//         <h2 className="text-[56px] font-bold">200</h2>
//         <p className="text-green-400 text-sm font-medium">▲ +11.1%</p>
//       </div>

//       {/* Approved */}
//       <div>
//         <div className="w-full bg-gray-700 rounded-full h-[65px] mt-1 relative overflow-hidden">
//           <div
//             className="h-[65px] rounded-[18px] bg-[#9DEB48] relative"
//             style={{ width: "25%" }}
//           >
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold">
//               25%
//             </span>
//             <div className="absolute right-0 top-0 w-3 h-full backdrop-blur-[25px]"></div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <p className="text-gray-300 text-sm">Approved: 72</p>
//           <p className="text-green-400 text-xs">▲ +14.23%</p>
//         </div>
//       </div>

//       {/* Revision */}
//       <div>
//         <div className="w-full bg-gray-700 rounded-full h-[65px] mt-1 relative overflow-hidden">
//           <div
//             className="h-[65px] rounded-[18px] bg-[#DDB417] relative"
//             style={{ width: "15%" }}
//           >
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold">
//               15%
//             </span>
//             <div className="absolute right-0 top-0 w-3 h-full backdrop-blur-[25px]"></div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <p className="text-gray-300 text-sm">Revision: 30</p>
//           <p className="text-red-500 text-xs">▼ -33.33%</p>
//         </div>
//       </div>

//       {/* Cancelled */}
//       <div>
//         <div className="w-full bg-gray-700 rounded-full h-[65px] mt-1 relative overflow-hidden">
//           <div
//             className="h-[65px] rounded-[18px] bg-[#FF5C5C] relative"
//             style={{ width: "15%" }}
//           >
//             <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold">
//               15%
//             </span>
//             <div className="absolute right-0 top-0 w-3 h-full backdrop-blur-[25px]"></div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//           <p className="text-gray-300 text-sm">Cancelled: 18</p>
//           <p className="text-red-500 text-xs">▼ -33.33%</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useSalesAnalytics } from "@/components/socket/useSocketData";
import React, { useMemo } from "react";

function TopAgent({currentUserIndex = 0}) {
  const { data: salesDataa, loading, error } = useSalesAnalytics()
  console.log(salesDataa, "salesData")
  
  // Memoize topAgents data extraction
  const topAgentsData = useMemo(() => {
    if (!salesDataa?.data?.topAgents) return [];
    
    const agents = salesDataa.data.topAgents;
    
    // If it's an array, return it directly
    if (Array.isArray(agents)) {
      return agents;
    }
    
    // If it's an object, use keys as names and values as data
    if (typeof agents === 'object') {
      return Object.entries(agents).map(([name, data]) => ({
        name: name,
        ...data
      }));
    }
    
    return [];
  }, [salesDataa])
  

  
  // Fallback data if API data is not available
 
  
  // Static rank images for first 3 positions
  const getRankImage = (index) => {
    switch(index) {
      case 0:
        return "/images/salesDashboard/one_prem.svg";
      case 1:
        return "/images/salesDashboard/two_prem.svg";
      case 2:
        return "/images/salesDashboard/three_prem.svg";
      default:
        return null;
    }
  };
  
  // Use API data if available, otherwise use fallback
  const allAgents = topAgentsData.length > 0 ? topAgentsData : [];
  
  // Show only top 7 agents
  const agents = allAgents.slice(0, 7);
  

  return (
    <div className="xl-plus:px-[40px] px-[20px] xl-plus:py-[36px] py-[15px] xl-plus:rounded-xl rounded-[10px] w-full xl-plus:space-y-[40px] space-y-[15px]">
      <h2 className="xl-plus:text-[40px] text-[20px] text-foreground font-bold">
        Top Agent
      </h2>

      {agents.map((agent, idx) => (
        <div
          key={idx}
          className="flex items-center xl-plus:space-x-4 space-x-2  "
        >
          <div className="flex-1">
            {/* Name + Change */}
            <div className="flex items-center justify-between">
              <div className="xl-plus:mb-[24px] mb-[10px] flex items-center xl-plus:gap-[20px] gap-[10px]">
                {idx < 3 ? (
                  <img
                    src={getRankImage(idx)}
                    alt="rank"
                    className="xl-plus:w-[65px] xl-plus:h-auto w-[35px] h-auto"
                  />
                ) : (
                  <div className="xl-plus:w-[60px] w-[35px] text-foreground font-bold xl-plus:text-[28px] text-[14px]">
                    {idx + 1}.
                  </div>
                )}
                <div className="xl-plus:text-[32px] text-[16px] font-medium">
                  {agent.name}
                </div>
              </div>

              <div
                className={`flex items-center space-x-1 ${agent?.comparisonPercentage > 0 ? "text-[#7CCF00]" : "text-[#FF0000]"
                  }`}
              >
                {agent?.comparisonPercentage > 0 ? (
                  <svg
                    className="xl-plus:w-4 xl-plus:h-4 w-2 h-2"
                    fill="#96FD6B"
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
                  {agent.comparisonPercentage.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full xl-plus:h-[88px] h-[44px] xl-plus:p-4 p-2 rounded-[44px]  bg-bar backdrop-blur-lg overflow-visible">
              {/* Percentage Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center mx-auto justify-center z-60 text-foreground xl-plus:text-[28px] text-[14px] font-bold xl-plus:drop-shadow-2xl drop-shadow-2xl ">
                {agent.barPercentage.toFixed(0)}%
              </div>

              {/* Blur effect only for Top 3 */}
              {idx < 3 && (
                <div
                  className="absolute left-0 top-0 xl-plus:rounded-[44px] rounded-[10px] blur-[33px] xl-plus:blur-[43px] h-[70%] xl-plus:h-[80%]"
                  style={{
                    width: `${agent.barPercentage}%`,
                    marginTop: "10px",
                    background:
                      "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
                  }}
                ></div>
              )}

              {/* Solid progress bar */}
              <div
                className="xl-plus:h-[46px] h-[23px] xl-plus:mt-[5px] mt-[2px] flex items-center justify-center rounded-full relative overflow-hidden z-50"
                style={{
                  width: `${agent.barPercentage}%`,
                  background:
                    "linear-gradient(to right, #196DFF, #E55EFF, #B27D02, #E1C300)",
                }}
              >
                {idx < 3 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-transparent"></div>
                )}
              </div>
            </div>
          </div>
          </div>
        ))}
    </div>
  );
}

export default TopAgent;
