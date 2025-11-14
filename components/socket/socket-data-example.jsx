"use client"

import { useSalesAnalytics, useMessage, useSocketConnection } from "./useSocketData"
import { useState } from "react"

export default function SocketDataExample() {
  const { data: salesData, loading, error } = useSalesAnalytics()
  const { message, sendMessage } = useMessage()
  const { isConnected, socketId } = useSocketConnection()
  
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const result = await sendMessage(inputMessage)
      if (result.success) {
        setInputMessage("")
      }
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Socket Data Example
        </h2>

        {/* Connection Status */}
        <div className="mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}></span>
            {isConnected ? "Connected" : "Disconnected"}
            {socketId && <span className="ml-2">({socketId})</span>}
          </div>
        </div>

        {/* Message Section */}
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
            💬 Live Message
          </h3>
          <p className="text-lg mb-4">Current Message: {message || "No message yet"}</p>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type new message..."
              className="border border-gray-300 dark:border-gray-600 px-3 py-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={!isConnected || !inputMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
        </div>

        {/* Sales Analytics Section */}
        <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">
            📈 Sales Analytics
          </h3>
          
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-lg">⏳ Waiting for analytics...</div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center p-8">
              <div className="text-red-500">⚠️ Error: {error}</div>
            </div>
          )}

          {salesData ? (
            <div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Raw Data:
                </h4>
                <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm overflow-x-auto">
                  {JSON.stringify(salesData, null, 2)}
                </pre>
              </div>

              {/* Display specific data if available */}
              {salesData.agentEfficiency && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Agent Efficiency:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {salesData.agentEfficiency.map((agent, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Efficiency: {agent.efficiency}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {salesData.totalQuotes && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Total Quotes:
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        {salesData.totalQuotes.current}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900 rounded">
                      <div className="text-2xl font-bold text-green-600">
                        +{salesData.totalQuotes.percentage}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Growth</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="text-2xl font-bold text-gray-600">
                        {salesData.totalQuotes.previous}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Previous</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : !loading && !error && (
            <div className="flex items-center justify-center p-8">
              <div className="text-lg">⏳ Waiting for analytics...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
