import React from 'react'

const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Performance Analytics</h3>
        <div className="text-xs text-gray-500">Last 30 days</div>
      </div>
      <div className="mt-4 h-40 bg-gray-50 border border-dashed border-gray-100 rounded flex items-center justify-center text-gray-400">
        <span>Chart placeholder</span>
      </div>
    </div>
  )
}

export default PerformanceChart
