'use client'

import { Card, Title } from "@tremor/react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  LabelList,
} from "recharts"
import { PIPELINE_STAGES, type PipelineStage } from "@/lib/data/dashboard-data"
import { formatGLA } from "@/lib/data/dashboard-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

type TooltipProps = {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
  }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#4B2D84]/20 shadow-sm p-3">
      <p className="font-medium text-sm text-[#4B2D84] mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-[#4B2D84]" />
          <span className="text-[#4B2D84]">
            {formatGLA(entry.value)} sqm
          </span>
        </div>
      ))}
    </div>
  );
};

// Custom tick renderer for wrapping long stage names
const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="end"
        fontSize="14"
        fill="#6B7280"
        transform="rotate(-45)"
        dy={16}
      >
        {words.map((word: string, i: number) => (
          <tspan x="0" dy={i === 0 ? 0 : 12} key={i}>{word}</tspan>
        ))}
      </text>
    </g>
  );
};

export const PipelineFunnel = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Highest GLA for Planned, decreasing stepwise to Ejar signed
  const maxGLA = 20000
  const minGLA = 2000
  const step = Math.floor((maxGLA - minGLA) / (PIPELINE_STAGES.length - 1))
  let data = PIPELINE_STAGES.map((stage, idx) => ({
      name: stage.name,
    value: maxGLA - idx * step,
    weightedValue: Math.round((maxGLA - idx * step) * stage.probability),
  }))

  // Team-specific adjustment for demo
  if (selectedTeam !== 'All') {
    let reduceIdx = -1
    let factor = 1
    if (selectedTeam === 'Central') {
      reduceIdx = data.findIndex(s => s.name === 'Proposal signed')
      factor = 0.8
    } else if (selectedTeam === 'Western') {
      reduceIdx = data.findIndex(s => s.name === 'Planned')
      factor = 0.3
    } else if (selectedTeam === 'Eastern') {
      reduceIdx = data.findIndex(s => s.name === 'Discussion initiated')
      factor = 0.6
    } else if (selectedTeam === 'Entertainment') {
      reduceIdx = data.findIndex(s => s.name === 'Proposal signed')
      factor = 0.1
    }
    if (reduceIdx !== -1) {
      data = data.map((item, idx) =>
        idx < reduceIdx
          ? item
          : { ...item, value: Math.round(item.value * factor), weightedValue: Math.round(item.weightedValue * factor) }
      )
    }
  }

  // Month-specific adjustment for demo
  if (selectedMonth !== 'All') {
    let reduceIdx = -1
    let factor = 1
    if (selectedMonth === 'Jan') {
      reduceIdx = data.findIndex(s => s.name === 'Planned')
      factor = 0.6
    } else if (selectedMonth === 'Feb') {
      reduceIdx = data.findIndex(s => s.name === 'Discussion initiated')
      factor = 0.4
    } else if (selectedMonth === 'Mar') {
      reduceIdx = data.findIndex(s => s.name === 'Location agreed')
      factor = 0.5
    } else if (selectedMonth === 'Apr') {
      reduceIdx = data.findIndex(s => s.name === 'Proposal signed')
      factor = 0.3
    } else if (selectedMonth === 'May') {
      reduceIdx = data.findIndex(s => s.name === 'AMC approved')
      factor = 0.2
    } else if (selectedMonth === 'Jun') {
      reduceIdx = data.findIndex(s => s.name === 'Ejar issued')
      factor = 0.1
    }
    if (reduceIdx !== -1) {
      data = data.map((item, idx) =>
        idx < reduceIdx
          ? item
          : { ...item, value: Math.round(item.value * factor), weightedValue: Math.round(item.weightedValue * factor) }
      )
    }
  }

  // Demo: scale all values if any filter is applied
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    data = data.map(item => ({ ...item, value: Math.round(item.value), weightedValue: Math.round(item.weightedValue) }))
  }

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Pipeline by Stage</Title>
        <div className="h-[calc(100%-4rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis
                type="category"
                dataKey="name"
                stroke="#6B7280"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                height={80}
                tickMargin={8}
                interval={0}
                tick={<CustomTick />}
              />
              <YAxis
                type="number"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, 'dataMax + 2000']}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#4B2D84', fillOpacity: 0.05 }} />
              <Bar
                dataKey="value"
                fill="#4B2D84"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(value: number) => `${formatGLA(value)} sqm`}
                  style={{ fill: "#4B2D84", fontWeight: 700, fontSize: "13px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

export default PipelineFunnel 