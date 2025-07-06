'use client'

import { Card, Title } from "@tremor/react"
import { dealerPerformanceData, dealerBottomPerformers } from "@/lib/mock-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

const formatPercentage = (value: number) => {
  return `${Math.round(value * 100)}%`
}

export const DealerPerformanceTable = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Combine and sort all dealers by total GLA (highest to lowest)
  const allDealers = [...dealerPerformanceData, ...dealerBottomPerformers]
    .filter(d => selectedMonth === 'All' || d.month === selectedMonth)
    .filter(d => selectedTeam === 'All' || d.team === selectedTeam)
    .sort((a, b) => b.totalGLA - a.totalGLA)

  // Calculate additional metrics for each dealer
  const dealersWithMetrics = allDealers.map(dealer => ({
    ...dealer,
    totalDealsValue: dealer.totalGLA,
    efficiencyScore: (dealer.conversionRate * 100) / dealer.avgDealDuration * 100, // Higher is better
    performanceRating: dealer.conversionRate >= 0.7 ? 'High' : dealer.conversionRate >= 0.5 ? 'Medium' : 'Low'
  }))

  return (
    <Card className="overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-4 flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Dealer Performance Overview - Actual</Title>
        
        <div className="overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4B2D84]/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84]">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84]">Dealer Name</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Total GLA</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Deals Count</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Deal Size</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Conversion Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Duration</th>
                </tr>
              </thead>
              <tbody>
                {dealersWithMetrics.map((dealer, index) => (
                  <tr 
                    key={dealer.name} 
                    className="h-12 border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#4B2D84] text-white text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-[#4B2D84]">{dealer.name}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#4B2D84]">
                      {formatValue(dealer.totalGLA)} sqm
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{dealer.dealsCount}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {formatValue(dealer.avgDealSize)} sqm
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#4B2D84]/10 text-[#4B2D84]">
                        {formatPercentage(dealer.conversionRate)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{dealer.avgDealDuration} days</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="h-12 border-t border-[#4B2D84]/20 bg-white">
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Total Dealers</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{allDealers.length}</span>
                  </td>
                  <td></td>
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Average GLA</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{formatValue(allDealers.reduce((sum, d) => sum + d.totalGLA, 0) / allDealers.length)} sqm</span>
                  </td>
                  <td></td>
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Total GLA</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{formatValue(allDealers.reduce((sum, d) => sum + d.totalGLA, 0))} sqm</span>
                  </td>
                  <td></td>
                  <td className="py-2 px-4 text-center">
                    <span className="block text-sm text-[#4B2D84] font-semibold">Avg Conversion</span>
                    <span className="block text-lg text-[#4B2D84] font-extrabold">{formatPercentage(allDealers.reduce((sum, d) => sum + d.conversionRate, 0) / allDealers.length)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Card>
  )
} 