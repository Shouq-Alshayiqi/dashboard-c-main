'use client'

import { Card, Title } from "@tremor/react"
import { dealerPerformanceData } from "@/lib/mock-data"

export const TopDealerDurations = () => {
  // Calculate overall average duration
  const overallAverage = Math.round(
    dealerPerformanceData.reduce((acc, dealer) => acc + dealer.avgDealDuration, 0) / 
    dealerPerformanceData.length
  )

  // Get top dealers by total GLA and calculate their variance from average
  const topDealers = [...dealerPerformanceData]
    .sort((a, b) => b.totalGLA - a.totalGLA)
    .slice(0, 4)
    .map(dealer => ({
      ...dealer,
      varianceFromAverage: dealer.avgDealDuration - overallAverage,
      percentageOfBar: ((dealer.avgDealDuration) / (overallAverage * 1.5)) * 100 // Using 1.5x average as max scale
    }))

  return (
    <Card className="h-full bg-white border-[#4B2D84] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-[#4B2D84] font-medium text-sm">Dealer Deal Durations</Title>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#2D6A1F]" />
            <span className="text-[#2D6A1F]">Faster than average</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#E67E93]" />
            <span className="text-[#E67E93]">Slower than average</span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 space-y-4">
        {/* Average line marker */}
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center pointer-events-none">
          <div className="w-full border-r border-dashed border-[#4B2D84]/30 mr-[66.7%]">
            <div className="absolute right-0 transform translate-x-1/2 -translate-y-6">
              <span className="text-xs text-[#4B2D84]/70">{overallAverage} days avg</span>
            </div>
          </div>
        </div>

        {topDealers.map((dealer) => {
          const isFaster = dealer.avgDealDuration <= overallAverage
          
          return (
            <div key={dealer.name} className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-[#4B2D84] leading-none">{dealer.name}</span>
                <div className="flex items-center gap-2">
                  <span 
                    className={`text-sm font-medium leading-none ${
                      isFaster ? 'text-[#2D6A1F]' : 'text-[#E67E93]'
                    }`}
                  >
                    {dealer.avgDealDuration} days
                  </span>
                  <span className="text-xs text-[#4B2D84]/70 leading-none">
                    ({isFaster ? '-' : '+'}
                    {Math.abs(dealer.varianceFromAverage)} from avg)
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-[#4B2D84]/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    isFaster ? 'bg-[#2D6A1F]' : 'bg-[#E67E93]'
                  }`}
                  style={{ 
                    width: `${Math.min(dealer.percentageOfBar, 100)}%`
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

export default TopDealerDurations 