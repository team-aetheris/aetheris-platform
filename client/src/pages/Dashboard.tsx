import React from 'react'
import TopMetrics from '../components/dashboard/TopMetrics'
import LiveShipmentOverview from '../components/dashboard/LiveShipmentOverview'
import AlertsPanel from '../components/dashboard/AlertsPanel'
import AiInsights from '../components/dashboard/AiInsights'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import PerformanceChart from '../components/dashboard/PerformanceChart'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Operational Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of shipments, risks and operational health</p>
        </div>
      </div>

      <TopMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LiveShipmentOverview />
          <PerformanceChart />
        </div>

        <div className="space-y-6">
          <AlertsPanel />
          <AiInsights />
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
