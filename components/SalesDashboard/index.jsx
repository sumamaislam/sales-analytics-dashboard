import React, { useEffect, useState, memo, useCallback } from "react";
import LineBar from "./lineBar";
import Efficiency from "./agentEfficiency";
import TotalQuotes from "./totalQuotes";
import TotalInvoices from "./totalInvoices";
import WorkOrders from "./workOrders";
import ProductAnalytics from "./productAnalytics";
import TopAgent from "./topAgent";
import RatioDesign from "./ratioDesign";
import CadRequest from "./cadRequest";
import SalesMarquee from "./salesMarquee";
import { useSalesAnalytics } from "../socket/useSocketData";

const SalesDashboard = memo(function SalesDashboard({
  currentIndex,
  userNames,
  setUserNames,
}) {
  const { data: salesData, loading, error } = useSalesAnalytics();
  console.log(salesData, "sumi");
  
  const [joiningDate, setJoiningDate] = useState([]);

  // Memoize userNames to prevent unnecessary re-renders
  useEffect(() => {
    if (salesData?.data?.salesAnalyticsUserWise) {
      const names = Object.values(salesData.data.salesAnalyticsUserWise).map(
        (item) => item?.userInfo?.name
      );
      setUserNames(names);
    }
  }, [salesData?.data?.salesAnalyticsUserWise]);

  useEffect(() => {
    if (salesData?.data?.salesAnalyticsUserWise) {
      const joiningDates = Object.values(
        salesData.data.salesAnalyticsUserWise
      ).map((item) => item?.userInfo?.joining);
      setJoiningDate(joiningDates);
    }
  }, [salesData?.data?.salesAnalyticsUserWise]);

  
  
  const topAgent = salesData?.data?.topAgents || {};
  const agentNames = Object.keys(topAgent).slice(0,3);

  
  return (
    <>
      <div className="w-[100%] 2xl:h-[72vh] flex xl-plus:gap-[20px] 2xl:gap-[20px] gap-[10px] xl-plus:mt-[69px] mt-[30px] transition-all duration-500 ease-in-out">
        <div className="w-[75%] bg-background-secondary xl-plus:rounded-[64px] rounded-[30px] xl-plus:px-[50px] px-[20px] xl-plus:py-[36px] py-[20px]">
          <div className="flex justify-between items-center xl-plus:gap-10 gap-5 xl-plus:mb-8 mb-4">
            <div className="flex items-center xl-plus:gap-10 gap-5">
              <h2 className="xl-plus:text-[44px] 2xl:text-[24px] text-[18px] text-foreground">
                Agent Overview{" "}
              </h2>
              <img
                className="w-[20px] xl-plus:w-[35px] h-auto"
                src="/images/salesDashboard/right_arrow_white.png"
                alt="arrow icon"
              />

              <h2
                key={currentIndex}
                className="xl-plus:text-[44px] 2xl:text-[24px] text-[18px] text-foreground transition-opacity duration-300"
              >
                {userNames[currentIndex] || "Loading..."}
              </h2>

              <p className="bg-[white]/50 xl-plus:text-[32px] 2xl:text-[16px] text-[12px] px-5 py-1 xl-plus:rounded-[21px] rounded-[10px] text-foreground">
                Since {joiningDate[currentIndex]}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* <img
                className="w-[40px] xl-plus:w-[85px] h-auto"
                src="/images/salesDashboard/one_prem.svg"
                alt="one icon"
              /> */}
              {userNames[currentIndex] === agentNames[0] && 
              (
                <img
                className="w-[60px] xl-plus:w-[85px] h-auto"
                src="/images/salesDashboard/one_prem.svg"
                alt="one icon"
              />)}
               {userNames[currentIndex] === agentNames[1] && 
              (
                <img
                className="w-[60px] xl-plus:w-[85px] h-auto"
                src="/images/salesDashboard/two_prem.svg"
                alt="one icon"
              />)}
               {userNames[currentIndex] === agentNames[2] && 
              (
                <img
                className="w-[60px] xl-plus:w-[85px] h-auto"
                src="/images/salesDashboard/three_prem.svg"
                alt="one icon"
              />)}
            </div>
          </div>

          {/* Sales Analytics Chart */}
          <div className="w-[100%] flex xl-plus:gap-[15px] gap-[10px]">
            <div className="w-[100%]">
              <LineBar currentUserIndex={currentIndex} />
            </div>
            <div className="w-[100%] flex xl-plus:gap-[15px] gap-[10px]">
              <div className="  w-[100%] ">
                <div className="w-[100%]">
                  <Efficiency currentUserIndex={currentIndex} />
                </div>
                <div className="w-[100%] xl-plus:mt-[15px] mt-[10px]">
                  <TotalQuotes currentUserIndex={currentIndex} />
                </div>
              </div>
              <div className=" flex w-[100%] gap-[15px]  ">
                <div className="w-[100%] ">
                  <TotalInvoices currentUserIndex={currentIndex} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] flex gap-[15px] xl-plus:mt-[15px] mt-[10px]">
            <div className="w-[100%]">
              <div>
                <WorkOrders currentUserIndex={currentIndex} />
              </div>
              <div className="w-[100%] flex xl-plus:gap-[15px] gap-[10px]">
                <div className="w-[100%] h-[100%]">
                  <ProductAnalytics currentUserIndex={currentIndex} />
                </div>
                <div className="w-[100%] h-[100%]">
                  <RatioDesign currentUserIndex={currentIndex} />
                </div>
              </div>
            </div>

            <div className="w-[100%] ">
              <CadRequest currentUserIndex={currentIndex} />
            </div>
          </div>
        </div>

        <div className="w-[25%]  bg-background-secondary xl-plus:rounded-[64px] rounded-[30px]">
          <TopAgent currentUserIndex={currentIndex} />
        </div>
      </div>
    </>
  );
});

export default SalesDashboard;
