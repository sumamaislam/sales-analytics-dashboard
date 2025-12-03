"use client"

import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import { useSocketData } from "@/components/socket/socket-data-context"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/header"
import SalesDashboard from "@/components/SalesDashboard"
import SalesMarquee from "@/components/SalesDashboard/salesMarquee"

export default function UserPage() {
  const router = useRouter()
  const { userId } = router.query
  const { salesAnalytics, setSalesAnalytics } = useSocketData()
  const [filteredData, setFilteredData] = useState(null)
  const [userName, setUserName] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userNames, setUserNames] = useState([])
  const originalDataRef = useRef(null)
  const isFilteredRef = useRef(false)

  
  
  // Store original data only once on mount (before filtering)
  useEffect(() => {
    if (salesAnalytics && !originalDataRef.current && !isFilteredRef.current) {
      // Only store if it's not already filtered data
      const hasMultipleUsers = Object.keys(salesAnalytics?.data?.salesAnalyticsUserWise || {}).length > 1
      if (hasMultipleUsers) {
        originalDataRef.current = salesAnalytics
      }
    }
  }, [salesAnalytics])

  // Filter data for specific user - only once when userId changes
  useEffect(() => {
    if (!userId || !originalDataRef.current?.data?.salesAnalyticsUserWise || isFilteredRef.current) {
      return
    }

    const originalData = originalDataRef.current
    console.log(originalData, "originalData");
    
    const userData = Object.values(originalData.data.salesAnalyticsUserWise).find(
      (item) => item?.userInfo?.id === parseInt(userId)
    )

    if (userData && !isFilteredRef.current) {
      setUserName(userData.userInfo?.name || "User")
      
      // Create filtered data structure from original data
      const filtered = {
        ...originalData,
        data: {
          ...originalData.data,
          salesAnalyticsUserWise: {
            [userId]: userData
          }
        }
      }
      setFilteredData(filtered)
      setUserNames([userData.userInfo?.name])
      
      // Update context with filtered data only once
      isFilteredRef.current = true
      setSalesAnalytics(filtered)
    }
  }, [userId, setSalesAnalytics])

  // Restore original data on unmount
  useEffect(() => {
    return () => {
      if (originalDataRef.current && isFilteredRef.current) {
        setSalesAnalytics(originalDataRef.current)
        isFilteredRef.current = false
      }
    }
  }, [setSalesAnalytics])

  if (!userId || !filteredData) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground text-xl">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[100vh] relative bg-background text-foreground">
      <main className="xl-plus:py-16 py-10 xl-plus:pt-[83px] pt-[30px]">
        <div>
          <div className="xl-plus:px-[100px] px-[50px]">
            {/* Back Button */}
            <button
              onClick={() => router.push("/")}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-card dark:bg-card border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>

            {/* User Name Header */}
            {/* <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground">
                {userName}'s Analytics
              </h1>
              <p className="text-muted-foreground mt-2">
                Detailed sales analytics for this user
              </p>
            </div> */}

            {/* <Header /> */}
            <div>
              <SalesDashboard
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                userNames={userNames}
                setUserNames={setUserNames}
              />
            </div>
          </div>
          <div className="xl-plus:mt-[51px] mt-[30px] 2xl:absolute bottom-0 w-full">
            <SalesMarquee />
          </div>
        </div>
      </main>
    </div>
  )
}

