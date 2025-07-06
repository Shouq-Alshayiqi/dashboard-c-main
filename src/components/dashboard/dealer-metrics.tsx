'use client'

import { Card, Title } from "@tremor/react"
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell } from "recharts"

// Mock data - replace with actual data
const dealerData = [
  { name: "Sarah Johnson", avgDuration: 45, dealsCount: 15, successRate: 75, totalGLA: 2400 },
  { name: "Michael Chen", avgDuration: 40, dealsCount: 12, successRate: 82, totalGLA: 1800 },
  { name: "Emma Davis", avgDuration: 50, dealsCount: 8, successRate: 65, totalGLA: 1200 },
  { name: "James Wilson", avgDuration: 55, dealsCount: 10, successRate: 60, totalGLA: 1500 },
  { name: "Alex Thompson", avgDuration: 42, dealsCount: 14, successRate: 78, totalGLA: 2100 },
  { name: "Lisa Anderson", avgDuration: 48, dealsCount: 11, successRate: 70, totalGLA: 1600 },
  { name: "David Kim", avgDuration: 38, dealsCount: 16, successRate: 85, totalGLA: 2600 },
  { name: "Rachel Moore", avgDuration: 52, dealsCount: 9, successRate: 68, totalGLA: 1400 }
]

const avgDealDuration = 48 // Industry average

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-8 text-xs">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
      <span className="text-gray-600">Faster than average</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
      <span className="text-gray-600">Slower than average</span>
    </div>
  </div>
)

// Custom tooltip for dealer scatter chart
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;
  const dealer = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm shadow-md min-w-[180px]">
      <div className="font-semibold text-[#4B2D84] mb-2">{dealer.name}</div>
      <div className="text-gray-700">Deal Duration: <span className="font-medium">{dealer.avgDuration} days</span></div>
      <div className="text-gray-700">Success Rate: <span className="font-medium">{dealer.successRate}%</span></div>
      <div className="text-gray-700">Deals Closed: <span className="font-medium">{dealer.dealsCount}</span></div>
    </div>
  );
};

export const DealerMetrics = () => {
  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Dealer Performance Distribution</Title>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis 
                  type="number" 
                  dataKey="avgDuration" 
                  name="Deal Duration" 
                  unit=" days"
                  domain={['dataMin - 5', 'dataMax + 5']}
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                >
                  <text 
                    x="50%" 
                    y="35" 
                    textAnchor="middle" 
                    fill="#6B7280" 
                    fontSize="12"
                  >
                    Average Deal Duration (days)
                  </text>
                </XAxis>
                <YAxis 
                  type="number" 
                  dataKey="successRate" 
                  name="Success Rate"
                  unit="%"
                  domain={[50, 90]}
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                >
                  <text 
                    x="-35" 
                    y="50%" 
                    textAnchor="middle" 
                    fill="#6B7280" 
                    fontSize="12"
                    transform="rotate(-90, -35, 50%)"
                  >
                    Success Rate (%)
                  </text>
                </YAxis>
                <ZAxis 
                  type="number" 
                  dataKey="dealsCount" 
                  range={[50, 400]} 
                  name="Number of Deals"
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<CustomTooltip />}
                />
                <Scatter 
                  data={dealerData} 
                  name="Dealers"
                >
                  {dealerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.avgDuration < avgDealDuration ? '#22C55E' : '#EF4444'}
                      fillOpacity={0.6}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8">
            <CustomLegend />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DealerMetrics 