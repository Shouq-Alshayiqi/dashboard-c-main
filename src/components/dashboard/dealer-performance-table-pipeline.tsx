'use client'

import { Card, Title } from "@tremor/react"
import { dealerPipelineTableData } from "@/lib/mock-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

const formatPercentage = (value: number) => {
  return `${Math.round(value * 100)}%`
}

export const DealerPerformanceTablePipeline = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Combine and sort all lease managers by total GLA (highest to lowest)
  const allLeaseManagers = [...dealerPipelineTableData]
    .filter(d => selectedMonth === 'All' || d.month === selectedMonth)
    .filter(d => selectedTeam === 'All' || d.team === selectedTeam)
    .sort((a, b) => b.totalGLA - a.totalGLA)

  // Calculate additional metrics for each lease manager
  const leaseManagersWithMetrics = allLeaseManagers.map(leaseManager => ({
    ...leaseManager,
    totalDealsValue: leaseManager.totalGLA,
    efficiencyScore: (leaseManager.conversionRate * 100) / leaseManager.avgDealDuration * 100, // Higher is better
    performanceRating: leaseManager.conversionRate >= 0.7 ? 'High' : leaseManager.conversionRate >= 0.5 ? 'Medium' : 'Low'
  }))

  return (
    <Card className="overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Lease Manager Performance Overview - Pipeline</Title>
        <div className="overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4B2D84]/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84]">Lease Manager Name</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Total GLA</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Deals Count</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Deal Size</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Duration</th>
                </tr>
              </thead>
              <tbody>
                {leaseManagersWithMetrics.map((leaseManager, index) => (
                  <tr 
                    key={leaseManager.name} 
                    className="h-12 border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-[#4B2D84]">{leaseManager.name}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#4B2D84]">
                      {formatValue(leaseManager.totalGLA)} sqm
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{leaseManager.dealsCount}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatValue(leaseManager.avgDealSize)} sqm
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{leaseManager.avgDealDuration} days</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="h-12 border-t border-[#4B2D84]/20 bg-white">
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Total Lease Managers</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{allLeaseManagers.length}</span>
                  </td>
                  <td></td>
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Average GLA</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{formatValue(allLeaseManagers.reduce((sum, d) => sum + d.totalGLA, 0) / allLeaseManagers.length)} sqm</span>
                  </td>
                  <td></td>
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Total GLA</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{formatValue(allLeaseManagers.reduce((sum, d) => sum + d.totalGLA, 0))} sqm</span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Card>
  )
} 