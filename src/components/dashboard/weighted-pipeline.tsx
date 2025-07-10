'use client'

import { Card, Title } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'
import { PIPELINE_STAGES } from "@/lib/data/dashboard-data"

const formatValue = (value: number | null) => {
  if (value === null || value === undefined || isNaN(value)) return '-'
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-8 text-xs">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: item.fill }}
          />
          <span>{item.value !== null && !isNaN(item.value) ? `${formatValue(item.value)} sqm` : '-'}</span>
        </div>
      ))}
    </div>
  )
}

const TEAM_COLORS: Record<string, string> = {
  Central: '#2563EB',
  Western: '#F59E42',
  Eastern: '#2DB67C',
}
const TEAMS = Object.keys(TEAM_COLORS)

export const WeightedPipeline = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let data = PIPELINE_STAGES.map(stage => ({
      name: stage.name,
    'Total GLA': stage.total || 0,
      'Weighted GLA': stage.weighted || 0,
  }))
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    data = data.map(item => ({
      ...item,
      'Total GLA': Math.round(Number(item['Total GLA']) / 5),
      'Weighted GLA': Math.round(Number(item['Weighted GLA']) / 5)
    }))
  }

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-2 pb-2 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-4">Weighted Pipeline Projection</Title>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barSize={32}
              barGap={8}
            >
              <XAxis 
                dataKey="name"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
                height={45}
                tickMargin={8}
              />
              <YAxis
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value ? `${(value / 1000).toFixed(1)}k` : '-'}
                domain={[0, 'dataMax + 2000']}
              />
              <Tooltip content={<CustomTooltip />} />
                <Bar
                dataKey="Total GLA" 
                fill="#6B4E9B" 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="Total GLA" 
                  position="top" 
                  formatter={formatValue}
                  style={{ fill: "#6B4E9B", fontSize: "11px" }}
                  offset={10}
                  />
              </Bar>
              <Bar 
                dataKey="Weighted GLA" 
                fill="#4B2D84" 
                radius={[4, 4, 0, 0]}
              >
                <LabelList 
                  dataKey="Weighted GLA" 
                  position="top" 
                  formatter={formatValue}
                  style={{ fill: "#4B2D84", fontSize: "11px" }}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap gap-6 items-center justify-center text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#6B4E9B' }} />
            <span className="text-gray-600">Total GLA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4B2D84' }} />
            <span className="text-gray-600">Weighted GLA</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 