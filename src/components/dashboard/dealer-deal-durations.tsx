'use client'

import { Card, Title } from "@tremor/react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { dealerPerformanceData, dealerBottomPerformers, dealerPipelineTableData } from '@/lib/mock-data'

function getMonthlyDealDurations() {
  // Combine all dealer data
  const allDealers = [
    ...dealerPerformanceData,
    ...dealerBottomPerformers,
    ...dealerPipelineTableData
  ];

  // Get all unique months
  const months = Array.from(new Set(allDealers.map(d => d.month))).filter(Boolean) as string[];

  return months.map(month => {
    // All durations for this month
    const durations = allDealers.filter(d => d.month === month && typeof d.avgDealDuration === 'number').map(d => d.avgDealDuration);
    if (durations.length === 0) return undefined;
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    const best = Math.min(...durations);
    const worst = Math.max(...durations);
    return {
      month: month as string,
      bestTime: Math.round(best),
      avgTime: Math.round(avg),
      worstTime: Math.round(worst)
    };
  }).filter((d): d is { month: string; bestTime: number; avgTime: number; worstTime: number } => !!d);
}

const data = getMonthlyDealDurations();

export const DealerDealDurations = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let filteredData = [...data]
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    filteredData = filteredData.map((item: typeof data[0]) => ({ ...item, bestTime: Math.round(item.bestTime / 5), avgTime: Math.round(item.avgTime / 5), worstTime: Math.round(item.worstTime / 5) }))
  }

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Deal Duration Trends</Title>
        <div className="h-[calc(100%-4rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
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
                tickFormatter={(value) => `${value}d`}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
                formatter={(value: any, name: string) => {
                  let label = '';
                  if (name === 'bestTime') label = 'Avg Best Performance';
                  else if (name === 'avgTime') label = 'Average Time';
                  else if (name === 'worstTime') label = 'Avg Worst Performance';
                  return [`${value} days`, label];
                }}
              />
              <Line
                type="monotone"
                dataKey="bestTime"
                stroke="#2D6A1F"
                strokeWidth={2}
                dot={{ fill: '#2D6A1F', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="avgTime"
                stroke="#4B2D84"
                strokeWidth={2}
                dot={{ fill: '#4B2D84', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="worstTime"
                stroke="#F87171"
                strokeWidth={2}
                dot={{ fill: '#F87171', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A1F]" />
            <span className="text-gray-600">Avg Best Performance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4B2D84]" />
            <span className="text-gray-600">Average Time</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
            <span className="text-gray-600">Avg Worst Performance</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default DealerDealDurations 