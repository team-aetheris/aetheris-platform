import React from 'react'

type Shipment = {
  id: string
  origin: string
  destination: string
  status: string
  eta: string
}

const sample: Shipment[] = [
  { id: 'SHP-1001', origin: 'Rotterdam, NL', destination: 'NYC, USA', status: 'In Transit', eta: '2026-06-01' },
  { id: 'SHP-1002', origin: 'Hamburg, DE', destination: 'LA, USA', status: 'Delayed', eta: '2026-06-05' },
  { id: 'SHP-1003', origin: 'Shanghai, CN', destination: 'Rotterdam, NL', status: 'Customs', eta: '2026-05-28' },
  { id: 'SHP-1004', origin: 'Singapore', destination: 'Sydney, AU', status: 'Delivered', eta: '2026-05-20' },
]

const statusColor = (s: string) => {
  switch (s) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Delayed':
      return 'bg-yellow-100 text-yellow-800'
    case 'Customs':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-blue-50 text-blue-800'
  }
}

const LiveShipmentOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Live Shipment Overview</h3>
      </div>
      <div className="p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Shipment</th>
              <th className="pb-2">Origin</th>
              <th className="pb-2">Destination</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sample.map((s) => (
              <tr key={s.id} className="align-top">
                <td className="py-3 font-medium text-gray-800">{s.id}</td>
                <td className="py-3 text-gray-600">{s.origin}</td>
                <td className="py-3 text-gray-600">{s.destination}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(s.status)}`}>
                    {s.status}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{s.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LiveShipmentOverview
