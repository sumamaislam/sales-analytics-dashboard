import { useSalesAnalytics } from "@/components/socket/useSocketData";
import React from "react";
import Marquee from "react-fast-marquee";

function SalesMarquee() {
  const { data: salesDataa, loading, error } = useSalesAnalytics();
  console.log(salesDataa, "salesData");
  const ordersReport = salesDataa?.data?.ordersReport;

  const lateOrders = ordersReport?.lateOrders;
  const dispatchToday = ordersReport?.dispatchToday;
  const inTransit = ordersReport?.inTransit;

  // Create content strings for all sections
  const inTransitContent =
    Object.keys(inTransit || {}).length > 0
      ? Object.entries(inTransit || {})
          .map(([name, data]) => `${name} ${data}`)
          .join(" ")
      : "No In Transit";

  const lateOrdersContent =
    Object.keys(lateOrders || {}).length > 0
      ? Object.entries(lateOrders || {})
          .map(([name, data]) => `${name} ${data}`)
          .join(" ")
      : "No Late Orders";

  const dispatchContent = Array.isArray(dispatchToday)
    ? dispatchToday.length > 0
      ? dispatchToday.join(" ")
      : "No Dispatch Today"
    : Object.keys(dispatchToday || {}).length > 0
    ? Object.entries(dispatchToday || {})
        .map(([name, data]) => `${name} ${data}`)
        .join(" ")
    : "No Dispatch Today";

  // Count total orders for each section
  const inTransitCount =
    Object.keys(inTransit || {}).length > 0
      ? Object.values(inTransit || {}).reduce((total, orders) => {
          const orderCount = orders.split(",").length;
          return total + orderCount;
        }, 0)
      : 0;

  const lateOrdersCount =
    Object.keys(lateOrders || {}).length > 0
      ? Object.values(lateOrders || {}).reduce((total, orders) => {
          const orderCount = orders.split(",").length;
          return total + orderCount;
        }, 0)
      : 0;

  const dispatchCount = Array.isArray(dispatchToday)
    ? dispatchToday.length
    : Object.keys(dispatchToday || {}).length > 0
    ? Object.values(dispatchToday || {}).reduce((total, orders) => {
        const orderCount = orders.split(",").length;
        return total + orderCount;
      }, 0)
    : 0;


  const renderMarqueeContent = (content, color) => {
    // Split content into parts while keeping delimiters
    const parts = content.split(/(\s+)/);

    return parts
      .map((part, index) => {
        if (part.trim() === "") {
          // Preserve whitespace as-is
          return <span key={index}>{part}</span>;
        }

        // Check if part contains order numbers
        if (part.match(/#\d+/) || part.match(/^\d+/) || part.includes(",")) {
          // Order numbers and commas - colored
          return (
            <span key={index} className={`${color} font-semibold mx-1`}>
              {part}
            </span>
          );
        } else if (/^[A-Za-z\s]+$/.test(part) && part.length > 1) {
          // Agent names - foreground color, minimal spacing
          return (
            <span key={index} className="text-foreground mx-2">
              {part}
            </span>
          );
        } else {
          // Default - foreground color
          return (
            <span key={index} className="text-foreground ml-3">
              {part}
            </span>
          );
        }
      })
      .filter((el, idx) => !(el.props.children.trim() === "" && idx === 0)); // Remove leading spaces
  };
  return (
    <div className="">
      {/* In Transit */}
      <div className="relative">
        <div className="flex items-center justify-center bg-background-secondary xl-plus:h-[96px] h-[48px] xl-plus:px-[10px] px-[5px] mt-2">
          {/* Marquee content */}
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={5}
              gradient={false}
              className="xl-plus:text-[40px] text-[20px]"
            >
              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}
              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}

              {renderMarqueeContent(inTransitContent, "text-[#00A6ED]")}
            </Marquee>
          </div>

          {/* Status bar - fixed on the right */}
          <div className="flex-shrink-0 xl-plus:ml-[120px] ml-[60px] xl-plus:w-[450px] w-[225px]">
            <div className="flex items-center">
              <h3 className="text-foreground xl-plus:mr-[40px] mr-[20px] xl-plus:text-[40px] text-[20px]">
                |
              </h3>
              <h3 className="text-[#00A6ED] font-semibold xl-plus:text-[40px] text-[20px]">
                In Transit: {inTransitCount}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Late Orders */}
      <div className="relative">
        <div className="flex items-center justify-center bg-background-secondary xl-plus:h-[96px] h-[48px] xl-plus:px-[10px] px-[5px] mt-2">
          {/* Marquee content */}
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={5}
              gradient={false}
              className="xl-plus:text-[40px] text-[20px]"
            >
              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}
              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}

              {renderMarqueeContent(lateOrdersContent, "text-[#F8312F]")}
            </Marquee>
          </div>

          {/* Status bar - fixed on the right */}
          <div className="flex-shrink-0 xl-plus:ml-[120px] ml-[60px] xl-plus:w-[450px] w-[225px]">
            <div className="flex items-center">
              <h3 className="text-foreground xl-plus:mr-[40px] mr-[20px] xl-plus:text-[40px] text-[20px]">
                |
              </h3>
              <h3 className="text-[#F8312F] font-semibold xl-plus:text-[40px] text-[20px]">
                Late Orders: {lateOrdersCount}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Today */}
      <div className="relative">
        <div className="flex items-center justify-center bg-background-secondary xl-plus:h-[96px] h-[48px] xl-plus:px-[10px] px-[5px] mt-2">
          {/* Marquee content */}
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={5}
              gradient={false}
              className="xl-plus:text-[40px] text-[20px]"
            >
              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}
              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}

              {renderMarqueeContent(dispatchContent, "text-[#FFB02E]")}
            </Marquee>
          </div>

          {/* Status bar - fixed on the right */}
          <div className="flex-shrink-0 xl-plus:ml-[120px] ml-[60px] xl-plus:w-[450px] w-[225px]">
            <div className="flex items-center">
              <h3 className="text-foreground xl-plus:mr-[40px] mr-[20px] xl-plus:text-[40px] text-[20px]">
                |
              </h3>
              <h3 className="text-[#FFB02E] font-semibold xl-plus:text-[40px] text-[20px]">
                Dispatch Today: {dispatchCount}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesMarquee;
