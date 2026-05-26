import React from 'react'

type Metric = {
  label: string
  value: string
  delta?: string
}

const metrics: Metric[] = [
  { label: 'Active Shipments', value: '1,248', delta: '+2.4%' },
  { label: 'Delayed', value: '42', delta: '+1.1%' },
  { label: 'On-time %', value: '96.3%', delta: '-0.4%' },
  { label: 'Avg Transit', value: '3.8 days', delta: '-0.2d' },
]

const TopMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">{m.label}</div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-2xl font-semibold text-gray-900">{m.value}</div>
            <div className="text-sm text-gray-600">{m.delta}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopMetrics
