"use client"

import { useSalesAnalytics, useMessage } from "./useSocketData"

// Example: How to use in existing components
export default function IntegrationExample() {
  // Get sales analytics data
  const { data: salesData, loading, error } = useSalesAnalytics()
  
  // Get message data
  const { message, sendMessage } = useMessage()

  if (loading) {
    return <div className="p-4">Loading sales data...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Integration Examples</h2>
      
      {/* Example 1: Display Sales Data */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Sales Data Display</h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {salesData ? (
            <div>
              <h4 className="font-medium mb-2">Current Sales Analytics:</h4>
              <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                {JSON.stringify(salesData, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No sales data available</p>
          )}
        </div>
      </div>

      {/* Example 2: Display Message */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Live Message Display</h3>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-lg">
            Current Message: <span className="font-bold text-blue-600">{message || "No message"}</span>
          </p>
        </div>
      </div>

      {/* Example 3: Specific Data Usage */}
      {salesData && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Specific Data Usage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Agent Efficiency */}
            {salesData.agentEfficiency && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Agent Efficiency</h4>
                <div className="space-y-2">
                  {salesData.agentEfficiency.map((agent, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <span>{agent.name}</span>
                      <span className="font-bold text-blue-600">{agent.efficiency}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total Quotes */}
            {salesData.totalQuotes && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Total Quotes</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {salesData.totalQuotes.current}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    +{salesData.totalQuotes.percentage}% from last month
                  </div>
                </div>
              </div>
            )}

            {/* Work Orders */}
            {salesData.workOrders && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Work Orders</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {salesData.workOrders.total}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {salesData.workOrders.completed} completed
                  </div>
                </div>
              </div>
            )}

            {/* Design Stats */}
            {salesData.designStats && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h4 className="font-medium mb-2">Design Stats</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {salesData.designStats.stats?.totalCompleted || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Completed
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}
