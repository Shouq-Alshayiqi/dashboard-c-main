'use client'

import { Card, Title } from "@tremor/react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

// Mock data - replace with actual data later
const leaseExpiryData = [
  { month: 'Jan', updatedTarget: 105000 },
  { month: 'Feb', updatedTarget: 112500 },
  { month: 'Mar', updatedTarget: 115500 },
  { month: 'Apr', updatedTarget: 123500 },
  { month: 'May', updatedTarget: 128000 },
  { month: 'Jun', updatedTarget: 134000 },
]

export const LeaseExpiry = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let data = leaseExpiryData
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    data = data.map(item => ({ ...item, updatedTarget: Math.round(item.updatedTarget / 5) }))
  }
  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Target Progression</Title>
        <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 36, right: 30, left: 0, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)}k sqm`, "Updated Target"]}
                  />
                <Line
                  type="monotone"
                  dataKey="updatedTarget"
                  stroke="#4B2D84"
                  strokeWidth={2}
                  name="Updated Target"
                  dot={{ fill: '#4B2D84', r: 4 }}
                  activeDot={{ r: 6 }}
                  label={(props: any) => {
                    const { x, y, value } = props;
                    if (value === undefined || value === null) return <g />;
                    return (
                      <text
                        x={x}
                        y={y - 18}
                        fill="#4B2D84"
                        fontSize={11}
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {formatValue(value)}
                      </text>
                    );
                  }}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
} 