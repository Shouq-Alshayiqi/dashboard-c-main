'use client'

import { Card, Title } from "@tremor/react"
import { PIPELINE_STAGES, PIPELINE_STAGES_PERFORMANCE } from "@/lib/data/dashboard-data"
import { useMemo } from "react"
import { PipelineStage } from "@/lib/data/dashboard-data"

interface StageWithMetrics extends PipelineStage {
  x: number;
  y: number;
  dropOffset: number;
}

const DealDurationBase = ({ title, stagesSource, showDropped }: { title: string, stagesSource: PipelineStage[], showDropped: boolean }) => {
  const stages = useMemo(() => {
    const maxDeals = Math.max(...stagesSource.map(stage => stage.totalDeals))
    let currentX = 150 // Start position
    let currentDropOffset = 0
    
    return stagesSource.map((stage, index) => {
      const x = currentX
      const y = 50 // Top margin
      const dropOffset = currentDropOffset
      
      // Calculate next drop based on deal reduction
      if (index < stagesSource.length - 1) {
        const dealDrop = stage.totalDeals - stagesSource[index + 1].totalDeals
        currentDropOffset += (dealDrop / maxDeals) * 40 // Scale drop by deal reduction
      }
      
      currentX += 180 // Space between stages
      
      return {
        ...stage,
        x,
        y,
        dropOffset
      }
    })
  }, [stagesSource])

  const totalDays = stages.reduce((acc: number, stage: StageWithMetrics) => acc + stage.duration, 0)

  const svgWidth = stages.length * 180 + 150;
  const stageChartSvg = (
    <svg
      width={svgWidth}
      height={300}
      viewBox={`0 0 ${svgWidth} 300`}
      className="overflow-visible"
    >
              {/* Stage blocks and connections */}
              {stages.map((stage: StageWithMetrics, index: number) => (
                <g key={stage.name} className="transition-all duration-500">
                  {/* Stage block */}
                  <rect
                    x={stage.x - 60}
                    y={stage.y + stage.dropOffset}
                    width={120}
                    height={60}
                    rx={4}
                    className="fill-[#4B2D84]/10 stroke-[#4B2D84] stroke-1"
                  />

                  {/* Stage name */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 25}
                    className="text-sm fill-[#4B2D84] font-medium"
                    textAnchor="middle"
                  >
                    {stage.name}
                  </text>

                  {/* Deal count */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 45}
                    className="text-sm fill-[#4B2D84]"
                    textAnchor="middle"
                  >
                    {stage.totalDeals} deals
                  </text>

                  {/* Duration bar */}
                  <g transform={`translate(${stage.x - 60}, ${stage.y + stage.dropOffset + 70})`}>
                    <rect
                      width={120}
                      height={24}
                      rx={2}
                      className="fill-[#4B2D84]"
                    />
                    <text
                      x={60}
                      y={16}
                      className="text-sm fill-white"
                      textAnchor="middle"
                    >
                      {stage.duration} days
                    </text>
                  </g>

                  {/* Connection to next stage */}
                  {index < stages.length - 1 && (
                    <>
                      {/* Diagonal line */}
                      <path
                        d={`M ${stage.x + 60} ${stage.y + stage.dropOffset + 30}
                           L ${stages[index + 1].x - 60} ${stages[index + 1].y + stages[index + 1].dropOffset + 30}`}
                        className="stroke-[#4B2D84] stroke-2"
                        strokeDasharray="4 4"
                      />
                      {/* Arrow */}
                      <path
                        d={`M ${stages[index + 1].x - 70} ${stages[index + 1].y + stages[index + 1].dropOffset + 25} 
                           l 10 5 l -10 5`}
                        className="fill-[#4B2D84]"
                      />
                      {showDropped && (
                      <g transform={`translate(${(stage.x + stages[index + 1].x) / 2}, ${(stage.y + stage.dropOffset + stages[index + 1].y + stages[index + 1].dropOffset) / 2})`}>
                        {/* Drop text */}
                        <text
                          x="0"
                          y="-30"
                          className="text-xs fill-[#4B2D84]"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {stage.totalDeals - stages[index + 1].totalDeals} dropped
                        </text>
                        {/* Vertical drop line */}
                        <line
                          x1="0"
                          y1="-20"
                          x2="0"
                          y2="20"
                          className="stroke-[#4B2D84] stroke-[1.5]"
                        />
                        {/* Downward arrow */}
                        <path
                          d="M -8 12 L 0 20 L 8 12"
                          className="fill-none stroke-[#4B2D84] stroke-[1.5]"
                        />
                      </g>
                      )}
                    </>
                  )}
                </g>
              ))}
            </svg>
  );

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <Title className="text-[#4B2D84] font-medium text-sm">{title}</Title>
          <div className="text-xs text-[#4B2D84]/70">
            Average Total Duration: {totalDays} days
          </div>
        </div>

        <div className="flex flex-col h-[calc(100%-3rem)]">
          <div className="flex-1 relative overflow-x-auto overflow-y-hidden">
            {stageChartSvg}
          </div>
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center text-xs text-[#4B2D84]/70">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#4B2D84] rounded"></div>
                <span>Duration bars show average time spent in each stage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export const DealDuration = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Simulate filtering for demo
  const multiplier = (selectedMonth !== 'All' || selectedTeam !== 'All') ? 0.2 : 1
  // ... use multiplier to scale durations or deal counts for demo ...
  return <DealDurationBase title="Deal Stage Analysis" stagesSource={PIPELINE_STAGES} showDropped={true} />
}

export const DealDurationSigned = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  // Simulate filtering for demo
  const multiplier = (selectedMonth !== 'All' || selectedTeam !== 'All') ? 0.2 : 1
  // ... use multiplier to scale durations or deal counts for demo ...
  return <DealDurationBase title="Deal Stage Analysis - Signed" stagesSource={PIPELINE_STAGES_PERFORMANCE} showDropped={false} />
} 