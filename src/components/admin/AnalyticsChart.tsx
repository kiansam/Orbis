'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// Generate mock 30-day data
function generateData() {
  const data = []
  const now = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    data.push({
      date: label,
      visitors: Math.floor(Math.random() * 300 + 150 + (29 - i) * 4),
      apiCalls: Math.floor(Math.random() * 800 + 400 + (29 - i) * 12),
    })
  }
  return data
}

const data = generateData()

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-background-card border border-border rounded-lg px-4 py-3 shadow-xl text-xs">
      <p className="text-foreground-muted mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-foreground-muted capitalize">{entry.name}:</span>
          <span className="text-foreground font-medium">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsChart() {
  return (
    <div className="bg-background-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Site Analytics</h2>
          <p className="text-foreground-muted text-sm">Last 30 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-foreground-muted">Visitors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-foreground-muted">API Calls</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorApiCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f1f23" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#a1a1aa', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={6}
          />
          <YAxis
            tick={{ fill: '#a1a1aa', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorVisitors)"
            dot={false}
            activeDot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="apiCalls"
            stroke="#a78bfa"
            strokeWidth={2}
            fill="url(#colorApiCalls)"
            dot={false}
            activeDot={{ r: 4, fill: '#a78bfa', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
