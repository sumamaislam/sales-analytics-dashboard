"use client"
import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Grid, Pagination } from "swiper/modules"

function DieTeamOverview({ designAndDieAnalytics }) {
    const [progress, setProgress] = useState(0)

    // Updated data structure based on your JSON
  

    const data = designAndDieAnalytics?.data?.dielineTeamOverview ;
    console.log(data, "overview");
    
    
    // Convert data to the format expected by the component
    const teamMembers = data?.map((member, index) => {
        const completionRate = member.assigned > 0 ? Math.round((member.completed / member.assigned) * 100) : 0;
    
        const barColor = completionRate >= 70 ? "#9DEB48" : completionRate >= 50 ? "#FCD53F" : "#C03D3C";
        const online = member?.isActive
        return {
            name: member.designer.name,
            progressData: [
                { label: "Assigned:", number: member.assigned, color: "#EC4899" },
                { label: "Completed:", number: member.completed, color: "#B7FD6B" },
                { label: "Pending:", number: member.pending, color: "#3B82F6" },
                { label: "Cancelled:", number: member.cancelled, color: "#FF5C5C" },
            ],
            completedValue: completionRate,
            barColor: barColor,
            isOnline: online, // Random online status
        };
    });

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <>
        <div className="h-full bg-background-secondary py-[20px] xl-plus:py-[40px] xl-plus:rounded-[64px] rounded-[10px] w-full">
            <h2 className="xl-plus:text-[42px] text-[20px] text-foreground font-bold px-[20px] xl-plus:px-[40px] pb-[20px] ">
                Dieline Team Overview
            </h2>
<div className="w-[97%] m-auto">
            <Swiper
                modules={[Autoplay, Pagination, Grid]}
                spaceBetween={20}
                slidesPerView={3}
                grid={{ rows: 2, fill: "row" }}
                autoplay={{ delay: 9000 }}
                onSlideChange={(swiper) => {
                    let percent = ((swiper.activeIndex + 1) / swiper.slides.length) * 100
                    if (swiper.isEnd) percent = 100
                    setProgress(percent)
                }}

            >
                <div className="grid grid-cols-3 gap-[15px] items-center mr-[15px]">

                    {teamMembers?.map((member, idx) => {
                        const chartDataLarge = [
                            { name: "completed", value: member.completedValue, fill: member.barColor },
                            { name: "remaining", value: 100 - member.completedValue, fill: "#4D4C4E" },
                        ]

                        return (
                            <SwiperSlide key={idx}>
                                <div className={`flex items-center gap-[37px] h-full w-full bg-background-secondary border rounded-[46px] px-[40px] py-[15px] transition-all duration-300 ${
                                    !member.isOnline 
                                        ? ' ' 
                                        : ''
                                }`}>
                                    <div className="text-foreground">
                                        <div className="flex gap-[20px] items-center">
                                            <div className="relative bg-[linear-gradient(67deg,#30B8FF_0%,#C77FCF_48%,#F5E503_100%)]  rounded-full w-[54px] xl-plus:w-[94px] h-[54px] xl-plus:h-[94px] flex items-center justify-center">
                                                <span className="text-white text-[18px] xl-plus:text-[28px] font-bold">
                                                    {getInitials(member.name)}
                                                </span>
                                                {/* STATUS DOT */}
                                                <span className={`absolute bottom-[6px] right-0 w-[14px] h-[14px] xl-plus:w-[22px] xl-plus:h-[22px] rounded-full  ${member.isOnline ? "bg-[#9DEB48]" : "bg-gray-500"}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-[36px] font-medium">{member.name}</h3>
                                                <h3 className={`text-[26px] font-medium flex items-center gap-2 ${
                                                    member.isOnline 
                                                        ? 'text-green-400' 
                                                        : 'text-red-400'
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        member.isOnline ? 'bg-green-400' : 'bg-red-400'
                                                    }`}></span>
                                                    {member.isOnline ? "Online" : "Offline"}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-[37px] h-full w-full mt-[30px]">
                                            <div>
                                                {member?.progressData.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-[20px]">
                                                        <p className="text-[34px] text-foreground">{item.label}</p>
                                                        <p className="text-[34px] font-medium">{item.number}</p>
                                                        {/* <p className="text-[40px] font-medium text-[#B7FD6B]">{item.percent ? `+${item.percent}` : ""}</p> */}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex-1 flex justify-center w-[40%] items-center">
                                                <div className="w-[171px] h-[171px]">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={chartDataLarge}
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={75}
                                                                outerRadius={85}
                                                                startAngle={90}
                                                                endAngle={450}
                                                                dataKey="value"
                                                                stroke="none"
                                                            >
                                                                {chartDataLarge.map((entry, index) => (
                                                                    <Cell key={`cell-large-${index}`} fill={entry.fill} />
                                                                ))}
                                                            </Pie>
                                                            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-[40px] font-medium fill-foreground">
                                                                {member.completedValue}%
                                                            </text>
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </div>
            </Swiper>
            </div>
            {/* PROGRESS BAR SECTION (based on average progress) */}
            <div className="w-[350px] bg-[#2A2C30] rounded-full h-[12px] mt-[30px] mx-auto relative overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#30B8FF] via-[#C77FCF] to-[#F5E503] transition-all duration-300" style={{ width: `${progress}%` }} />
                <span className="absolute top-[-28px] right-0 text-white text-sm font-medium">{Math.round(progress)}%</span>
            </div>
        </div>
        </>
    )
}

export default DieTeamOverview