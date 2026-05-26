import React from 'react'

type Activity = { id: string; text: string; time: string }

const feed: Activity[] = [
  { id: 'F1', text: 'SHP-1004 marked as Delivered by carrier', time: '1h' },
  { id: 'F2', text: 'Manual hold placed on SHP-1010 (awaiting docs)', time: '2h' },
  { id: 'F3', text: 'New booking created for SHP-1022', time: '4h' },
]

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-4 space-y-3">
        {feed.map((f) => (
          <div key={f.id} className="text-sm text-gray-700">
            <div className="font-medium text-gray-800">{f.text}</div>
            <div className="text-xs text-gray-500">{f.time} ago</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityFeed
