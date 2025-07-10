'use client'

import { dealerPerformanceData, dealerBottomPerformers } from "@/lib/mock-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

export const DealerKPIs = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  const allDealers = [...dealerPerformanceData, ...dealerBottomPerformers]
    .filter(d => selectedMonth === 'All' || d.month === selectedMonth)
    .filter(d => selectedTeam === 'All' || d.team === selectedTeam)
  
  const totalGLA = allDealers.reduce((sum, dealer) => sum + dealer.totalGLA, 0)
  const avgDealSize = allDealers.reduce((sum, dealer) => sum + dealer.avgDealSize, 0) / allDealers.length
  const avgConversionRate = allDealers.reduce((sum, dealer) => sum + dealer.conversionRate, 0) / allDealers.length
  const avgDealDuration = allDealers.reduce((sum, dealer) => sum + dealer.avgDealDuration, 0) / allDealers.length
  
  const kpis = [
    {
      title: "Total GLA Secured",
      value: `${formatValue(totalGLA)} sqm`,
      subtext: "From all active lease managers",
      color: "#4B2D84"
    },
    {
      title: "Average Deal Size",
      value: `${avgDealSize.toFixed(1)} sqm`,
      subtext: "From all active lease managers",
      color: "#9B6A2D"
    },
    {
      title: "Avg Conversion Rate",
      value: `${Math.round(avgConversionRate * 100)}%`,
      subtext: "From all active lease managers",
      color: "#2D6A1F"
    },
    {
      title: "Avg Deal Duration",
      value: `${Math.round(avgDealDuration)} days`,
      subtext: "From all active lease managers",
      color: "#E67E93"
    }
  ]

  return (
    <div className="grid grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="relative">
          <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
            <div className="h-full flex flex-col">
              <div className="text-[#4B2D84]/70 text-sm font-medium">{kpi.title}</div>
              <div className="mt-1 text-3xl font-semibold" style={{ color: kpi.color }}>
                {kpi.value}
              </div>
              <div className="text-[#4B2D84]/70 mt-auto text-xs">
                {kpi.subtext}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 