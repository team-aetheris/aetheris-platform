import React from 'react'

type Alert = { id: string; title: string; severity: 'critical' | 'warning' | 'info'; time: string }

const alerts: Alert[] = [
  { id: 'A1', title: 'Port congestion — Rotterdam', severity: 'warning', time: '2h ago' },
  { id: 'A2', title: 'Customs hold resolved — SHP-1003', severity: 'info', time: '3h ago' },
  { id: 'A3', title: 'Temperature excursion — SHP-0987', severity: 'critical', time: '5h ago' },
]

const severityBadge = (s: Alert['severity']) => {
  if (s === 'critical') return 'bg-red-100 text-red-800'
  if (s === 'warning') return 'bg-yellow-100 text-yellow-800'
  return 'bg-blue-50 text-blue-800'
}

const AlertsPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Operational Risk Alerts</h3>
      </div>
      <div className="p-4 space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium text-gray-800">{a.title}</div>
              <div className="text-xs text-gray-500 mt-1">{a.time}</div>
            </div>
            <div className={`ml-4 inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${severityBadge(a.severity)}`}>
              {a.severity.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlertsPanel
