'use client'

import { Card, Title } from "@tremor/react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { MONTHLY_DATA, formatGLA, TOTAL_GLA_TARGET, PROJECTED_GLA } from "@/lib/data/dashboard-data"

  const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const terminations = payload[0]?.payload?.terminations;
    const signedDeals = payload[0]?.payload?.signedDeals;
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#4B2D84]/20 shadow-sm p-3">
        <p className="font-medium text-sm text-[#4B2D84] mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-sm" style={{ color: p.color }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span>{p.name}: {formatGLA(p.value)} sqm</span>
            </div>
        ))}
        <div className="mt-2 text-xs text-gray-700">Terminations: <span className="font-semibold">{terminations}</span></div>
        <div className="text-xs text-gray-700">Signed Deals: <span className="font-semibold">{signedDeals}</span></div>
      </div>
    );
  }
  return null;
};

export const ProgressChart = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let processedData = MONTHLY_DATA
  if (selectedMonth !== 'All') {
    processedData = processedData.filter(item => item.month === selectedMonth)
  }
  if (selectedTeam !== 'All') {
    processedData = processedData.map(item => ({ ...item }))
  }
  const lastActualIndex = processedData.map(d => d.actual).lastIndexOf(
    processedData.filter(d => d.actual !== null).pop()?.actual ?? 0
  );
  if (lastActualIndex !== -1 && processedData[lastActualIndex]) {
    processedData[lastActualIndex].forecast = processedData[lastActualIndex].actual;
  }

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-1">GLA Progress Over Time</Title>
        <p className="text-gray-500 text-xs">Actual vs. Target vs. Forecast</p>
        {/* Legend for Actual, Target, Forecast */}
        <div className="flex gap-6 items-center mt-2 mb-2" aria-label="Chart legend">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4B2D84' }} />
            <span className="text-xs text-[#4B2D84] font-medium">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A8A29E' }} />
            <span className="text-xs text-[#A8A29E] font-medium">Target (92% - 92k sqm)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-0.5 rounded-full border-b-2 border-dashed" style={{ borderColor: '#84B22D', backgroundColor: '#84B22D' }} />
            <span className="text-xs text-[#84B22D] font-medium">Forecast</span>
          </div>
        </div>
        <div className="h-[calc(100%-4rem-30px)] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={processedData} 
              margin={{ top: 10, right: 50, left: 20, bottom: 5 }}
            >
              <XAxis 
                dataKey="month" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                width={60}
                tickFormatter={formatGLA}
                label={{ value: 'GLA (sqm)', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12 }}
                domain={[75000, 100000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={50}
                domain={[0, 100]}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                tickFormatter={v => `${v}%`}
                label={{ value: '% of Target', angle: 90, position: 'insideRight', fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                name="Target (92% - 92k sqm)"
                dataKey="target" 
                stroke="#A8A29E" 
                strokeWidth={2}
                yAxisId="left"
                dot={({ cx, cy, payload }) => {
                  if (!cx || !cy || !payload) return <g />;
                  if (payload.month === 'Dec') {
                    return (
                      <g tabIndex={0} aria-label={`Target GLA for December: ${formatGLA(payload.target)} sqm`}>
                        <text
                          x={cx - 14}
                          y={cy - 8}
                          textAnchor="end"
                          className="fill-[#A8A29E] text-xs font-bold"
                          style={{ fontSize: '15px' }}
                        >
                          92% - {formatGLA(payload.target)} sqm
                        </text>
                        <circle cx={cx} cy={cy} r={5} fill="#A8A29E" />
                      </g>
                    );
                  }
                  return <g />;
                }}
              />
              <Line 
                type="monotone" 
                name="Actual"
                dataKey="actual" 
                stroke="#4B2D84" 
                strokeWidth={2}
                yAxisId="left"
                dot={({ cx, cy, payload }) => {
                  if (!cx || !cy || !payload) return <g />;
                  if (payload.month === 'Dec') {
                    return (
                      <g tabIndex={0} aria-label={`GLA for December: ${formatGLA(payload.actual)} sqm`}>
                        <text
                          x={cx - 14}
                          y={cy + 2}
                          textAnchor="end"
                          className="fill-[#4B2D84] text-xs font-bold"
                          style={{ fontSize: '15px' }}
                        >
                          {formatGLA(payload.actual)} sqm
                        </text>
                        <circle cx={cx} cy={cy} r={5} fill="#4B2D84" />
                      </g>
                    );
                  }
                  return <circle cx={cx} cy={cy} r={4} fill="#4B2D84" />;
                }}
                activeDot={{ r: 6, fill: "#4B2D84" }}
              />
              <Line 
                type="stepAfter" 
                name="Forecast"
                dataKey="forecast" 
                stroke="#84B22D" 
                strokeWidth={2}
                strokeDasharray="4 4"
                yAxisId="left"
                dot={({ cx, cy, payload }) => {
                  if (!cx || !cy || !payload) return <g />;
                  if (payload.month === 'Dec') {
                    return (
                      <g tabIndex={0} aria-label="Forecast GLA for December: 92% - 92k sqm">
                        <text
                          x={cx - 14}
                          y={cy + 35}
                          textAnchor="end"
                          className="fill-[#84B22D] text-xs font-bold"
                          style={{ fontSize: '15px' }}
                        >
                          92% - 92k sqm
                        </text>
                        <circle cx={cx} cy={cy} r={5} fill="#84B22D" />
                      </g>
                    );
                  }
                  return <circle cx={cx} cy={cy} r={3} fill="#84B22D" />;
                }}
                activeDot={{ r: 5, fill: "#84B22D" }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* GLA (sqm) indicator */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-2" aria-label="GLA unit legend">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4B2D84' }} />
          <span>GLA (sqm)</span>
        </div>
      </div>
    </Card>
  )
} 