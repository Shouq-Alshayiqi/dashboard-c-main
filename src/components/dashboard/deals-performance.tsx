'use client'

import { Card, Title } from "@tremor/react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts"

// Mock data - replace with actual data
const data = [
  { month: 'Jan', newDeals: 25, activeDeals: 85, completedDeals: 15 },
  { month: 'Feb', newDeals: 30, activeDeals: 92, completedDeals: 18 },
  { month: 'Mar', newDeals: 28, activeDeals: 88, completedDeals: 22 },
  { month: 'Apr', newDeals: 35, activeDeals: 95, completedDeals: 20 },
  { month: 'May', newDeals: 32, activeDeals: 98, completedDeals: 25 },
  { month: 'Jun', newDeals: 40, activeDeals: 105, completedDeals: 28 }
]

export const DealsPerformance = () => {
  return (
    <Card className="h-full bg-white">
      <div className="flex items-center justify-between mb-2">
        <Title className="text-[#4B2D84] font-medium text-sm">Deals Performance Trends</Title>
      </div>

      <div className="flex items-center justify-center gap-6 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4B2D84]" />
          <span className="text-gray-600">New Deals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9B8AB5]" />
          <span className="text-gray-600">Active Pipeline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A1F]" />
          <span className="text-gray-600">Completed Deals</span>
        </div>
      </div>

      <div className="h-[calc(100%-4rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="newDealsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B2D84" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#4B2D84" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="activeDealsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9B8AB5" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#9B8AB5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="completedDealsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D6A1F" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#2D6A1F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value: any, name: string) => {
                const label = name === 'newDeals' ? 'New Deals' :
                            name === 'activeDeals' ? 'Active Pipeline' :
                            'Completed Deals'
                return [`${value}`, label]
              }}
            />
            <Area
              type="monotone"
              dataKey="newDeals"
              stroke="#4B2D84"
              strokeWidth={2}
              fill="url(#newDealsGradient)"
              dot={{ fill: '#4B2D84', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="activeDeals"
              stroke="#9B8AB5"
              strokeWidth={2}
              fill="url(#activeDealsGradient)"
              dot={{ fill: '#9B8AB5', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="completedDeals"
              stroke="#2D6A1F"
              strokeWidth={2}
              fill="url(#completedDealsGradient)"
              dot={{ fill: '#2D6A1F', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default DealsPerformance 