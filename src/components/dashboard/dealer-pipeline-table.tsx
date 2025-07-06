'use client'

import { Card, Title } from "@tremor/react"
import { PIPELINE_STAGES, getCurrentMonthData, formatGLA } from "@/lib/data/dashboard-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

const formatPercentage = (value: number) => {
  return `${Math.round(value * 100)}%`
}

export const DealerPipelineTable = () => {
  // Calculate total pipeline metrics
  const totalPipelineValue = PIPELINE_STAGES
    .filter(stage => stage.name !== 'Closed')
    .reduce((acc, stage) => acc + stage.total, 0)

  const totalWeightedValue = PIPELINE_STAGES
    .filter(stage => stage.name !== 'Closed')
    .reduce((acc, stage) => acc + stage.weighted, 0)

  const avgSuccessProbability = totalWeightedValue / totalPipelineValue

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Pipeline Stages</Title>
        
        <div className="flex-1 min-h-0 overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#4B2D84]/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84]">Pipeline Stage</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Total GLA</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Weighted GLA</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Success Rate</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Duration</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Total Deals</th>
                </tr>
              </thead>
              <tbody>
                {PIPELINE_STAGES.map((stage) => (
                  <tr 
                    key={stage.name} 
                    className="border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-[#4B2D84]">{stage.name}</td>
                    <td className="py-3 px-4 text-right font-semibold text-[#4B2D84]">
                      {formatValue(stage.total)} sqm
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-[#6B4E9B]">
                      {formatValue(stage.weighted)} sqm
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#4B2D84]/10 text-[#4B2D84]">
                        {formatPercentage(stage.probability)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">{stage.duration} days</td>
                    <td className="py-3 px-4 text-right text-gray-600">{stage.totalDeals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-[#4B2D84] font-semibold">Total Pipeline</div>
              <div className="text-gray-600">
                {formatValue(totalPipelineValue)} sqm
              </div>
            </div>
            <div className="text-center">
              <div className="text-[#6B4E9B] font-semibold">Weighted Pipeline</div>
              <div className="text-gray-600">
                {formatValue(totalWeightedValue)} sqm
              </div>
            </div>
            <div className="text-center">
              <div className="text-[#4B2D84] font-semibold">Avg Success Rate</div>
              <div className="text-gray-600">
                {formatPercentage(avgSuccessProbability)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 