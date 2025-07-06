'use client'

import { monthlyConversionData } from "@/lib/mock-data"

const formatNumber = (num: number) => {
  return (num / 1000).toFixed(1) + 'k'
}

export const PerformanceKPIs = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Simulate filtering for demo
  let avgDealTime = 45 // days
  let totalDealsStarted = monthlyConversionData.reduce((acc, item) => acc + item["Deals Started"], 0)
  let totalDealsClosed = monthlyConversionData.reduce((acc, item) => acc + item["Deals Closed"], 0)

  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    avgDealTime = Math.round(avgDealTime * 0.8)
    totalDealsStarted = Math.round(totalDealsStarted / 5)
    totalDealsClosed = Math.round(totalDealsClosed / 5)
  }
  const conversionRate = Math.round((totalDealsClosed / totalDealsStarted) * 100)

  const kpis = [
    {
      title: "Avg Deal Closure Time",
      value: `${avgDealTime} days`,
      subtext: "From initial contact to closure",
      color: "#4B2D84"
    },
    {
      title: "Deal Success Rate",
      value: `${conversionRate}%`,
      subtext: `${formatNumber(totalDealsClosed)} closed of ${formatNumber(totalDealsStarted)} started`,
      color: "#2D6A1F"
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 mb-8">
      {kpis.map((kpi, index) => (
        <div key={index} className="relative">
          <div className="relative min-h-[120px] rounded-lg px-6 py-4 bg-white flex flex-col justify-between">
            <div className="h-full flex flex-col">
              <div className="text-[#4B2D84]/70 text-sm font-medium">{kpi.title}</div>
              <div className="mt-1 text-3xl font-semibold" style={{ color: kpi.color }}>
                {kpi.value}
              </div>
              <div className="text-[#4B2D84]/70 text-xs mt-1">
                {kpi.subtext}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 