'use client'

import { 
  TOTAL_GLA_TARGET, 
  CURRENT_GLA_LEASED, 
  GLA_IN_PIPELINE, 
  GLA_REMAINING,
  PROJECTED_GLA,
  formatGLA
} from "@/lib/data/dashboard-data"

export const KPICards = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Demo: If filtered, show smaller values, else show original
  let leased = CURRENT_GLA_LEASED;
  let pipeline = GLA_IN_PIPELINE;
  let projected = PROJECTED_GLA;
  let remaining = GLA_REMAINING;

  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    // For demo, just show 1/5th of each if filtered (simulate filtering)
    leased = Math.round(CURRENT_GLA_LEASED / 5);
    pipeline = Math.round(GLA_IN_PIPELINE / 5);
    projected = Math.round(PROJECTED_GLA / 5);
    remaining = Math.round(GLA_REMAINING / 5);
  }

  const leasedPercentage = (leased / TOTAL_GLA_TARGET) * 100;
  const pipelinePercentage = (pipeline / TOTAL_GLA_TARGET) * 100;
  const projectedPercentage = (projected / TOTAL_GLA_TARGET) * 100;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
      <div className="relative">
        <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
          <div className="h-full flex flex-col">
            <div className="text-[#4B2D84]/70 text-sm font-medium">Total GLA Target</div>
            <div className="text-[#4B2D84] text-3xl font-semibold mt-1">
              {formatGLA(TOTAL_GLA_TARGET)} sqm
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
          <div className="h-full flex flex-col">
            <div className="text-[#4B2D84]/70 text-sm font-medium">GLA Leased YTD</div>
            <div className="text-[#4B2D84] mt-1 text-3xl font-semibold">
              {formatGLA(leased)} sqm
            </div>
            <div className="text-[#4B2D84]/70 mt-auto text-xs">
              {Math.round(leasedPercentage)}% of target
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
          <div className="h-full flex flex-col">
            <div className="text-[#4B2D84]/70 text-sm font-medium">GLA in Pipeline</div>
            <div className="text-[#84B22D] mt-1 text-3xl font-semibold">
              {formatGLA(pipeline)} sqm
            </div>
            <div className="text-[#4B2D84]/70 mt-auto text-xs">
              {Math.round(pipelinePercentage)}% of target
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
          <div className="h-full flex flex-col">
            <div className="text-[#4B2D84]/70 text-sm font-medium">GLA Remaining</div>
            <div className="text-[#E86A6A] mt-1 text-3xl font-semibold">
              {formatGLA(remaining)} sqm
            </div>
            <div className="text-[#4B2D84]/70 mt-auto text-xs">
              To reach target
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[120px] rounded-lg px-6 pt-4 pb-6 bg-white">
          <div className="h-full flex flex-col">
            <div className="text-[#4B2D84]/70 text-sm font-medium">Projected GLA</div>
            <div className="text-[#84B22D] mt-1 text-3xl font-semibold">
              {formatGLA(projected)} sqm
            </div>
            <div className="text-[#4B2D84]/70 mt-auto text-xs">
              {Math.round(projectedPercentage)}% of target
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 