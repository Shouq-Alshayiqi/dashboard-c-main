'use client'

import { Card, Title } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { dealerPerformanceData } from "@/lib/mock-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

const CustomLegend = () => (
  <div className="flex items-center justify-center gap-8 text-xs">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#4B2D84]" />
      <span className="text-gray-600">Total GLA</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#6B4E9B]" />
      <span className="text-gray-600">Deals Count</span>
    </div>
  </div>
)

export const DealerPerformance = () => {
  const data = [...dealerPerformanceData]
    .sort((a, b) => b.totalGLA - a.totalGLA)
    .map(dealer => ({
      name: dealer.name,
      "Total GLA": dealer.totalGLA,
      "Deals": dealer.dealsCount,
      "Conversion": Math.round(dealer.conversionRate * 100)
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#4B2D84]/20 shadow-sm p-3">
        <p className="font-medium text-sm text-[#4B2D84] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          if (!entry.value) return null;
          const metrics = dealerPerformanceData.find(d => d.name === label);
          if (!metrics) return null;

          return (
            <div key={index} className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4B2D84]" />
                <span className="text-[#4B2D84]">
                  Total GLA: {formatValue(metrics.totalGLA)} sqm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6B4E9B]" />
                <span className="text-[#6B4E9B]">
                  Deals: {metrics.dealsCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9B6A2D]" />
                <span className="text-[#9B6A2D]">
                  Avg Deal Size: {formatValue(metrics.avgDealSize)} sqm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2D6A1F]" />
                <span className="text-[#2D6A1F]">
                  Conversion Rate: {Math.round(metrics.conversionRate * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E67E93]" />
                <span className="text-[#E67E93]">
                  Avg Duration: {metrics.avgDealDuration} days
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-4">Top Performing Dealers</Title>
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                barSize={24}
                barGap={8}
              >
                <XAxis
                  type="number"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: '#4B2D84', fillOpacity: 0.05 }}
                />
                <Bar
                  dataKey="Total GLA"
                  fill="#4B2D84"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey="Total GLA"
                    position="right"
                    formatter={formatValue}
                    style={{ fill: "#4B2D84", fontSize: "11px" }}
                  />
                </Bar>
                <Bar
                  dataKey="Deals"
                  fill="#6B4E9B"
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList
                    dataKey="Deals"
                    position="right"
                    style={{ fill: "#6B4E9B", fontSize: "11px" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <CustomLegend />
          </div>
        </div>
      </div>
    </Card>
  )
} 