import React from 'react'

const insights = [
  'Predictive delay: 38 shipments likely to delay in the next 48h (root: port congestion).',
  'Opportunity: Re-route 14 high-priority shipments via air to meet SLAs.',
  'Cost saving: Consolidation suggestion for 9 shipments from same origin this week.',
]

const AiInsights: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-gray-900">AI Insights</h3>
      <ul className="mt-3 space-y-2">
        {insights.map((i, idx) => (
          <li key={idx} className="text-sm text-gray-700">{i}</li>
        ))}
      </ul>
    </div>
  )
}

export default AiInsights
