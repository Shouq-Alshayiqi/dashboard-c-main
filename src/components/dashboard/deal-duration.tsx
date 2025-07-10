'use client'

import { Card, Title } from "@tremor/react"
import { PIPELINE_STAGES, PIPELINE_STAGES_PERFORMANCE, formatGLA } from "@/lib/data/dashboard-data"
import { useMemo } from "react"
import { PipelineStage } from "@/lib/data/dashboard-data"

interface StageWithMetrics extends PipelineStage {
  x: number;
  y: number;
  dropOffset: number;
}

const DealDurationBase = ({ title, stagesSource, showDropped }: { title: string, stagesSource: PipelineStage[], showDropped: boolean }) => {
  console.log('DealDurationBase stagesSource:', stagesSource);
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
      
      currentX += 190 // Space between stages (set to 190)
      
      return {
        ...stage,
        x,
        y,
        dropOffset
      }
    })
  }, [stagesSource])

  const totalDays = stages.reduce((acc: number, stage: StageWithMetrics) => acc + stage.duration, 0)

  // Calculate section totals
  const section1Stages = stages.filter(stage => 
    ['Planned', 'Discussion initiated', 'Location agreed', 'Terms Agreed', 'Proposal issued', 'Proposal signed'].includes(stage.name)
  )
  const section2Stages = stages.filter(stage => stage.name === 'AMC initiated')
  const section3Stages = stages.filter(stage => 
    ['AMC approved', 'Contract issued', 'Contract signed', 'Ejar issued', 'Ejar signed'].includes(stage.name)
  )

  const section1TotalDeals = section1Stages.reduce((acc, stage) => acc + stage.totalDeals, 0)
  const section1TotalGLA = section1Stages.reduce((acc, stage) => acc + stage.total, 0)
  const section2TotalDeals = section2Stages.reduce((acc, stage) => acc + stage.totalDeals, 0)
  const section2TotalGLA = section2Stages.reduce((acc, stage) => acc + stage.total, 0)
  const section3TotalDeals = section3Stages.reduce((acc, stage) => acc + stage.totalDeals, 0)
  const section3TotalGLA = section3Stages.reduce((acc, stage) => acc + stage.total, 0)

  const section1TotalLeases = section1Stages.reduce((acc, stage) => acc + (typeof stage.totalLeases === 'number' ? stage.totalLeases : stage.totalDeals + 3), 0)
  const section2TotalLeases = section2Stages.reduce((acc, stage) => acc + (typeof stage.totalLeases === 'number' ? stage.totalLeases : stage.totalDeals + 3), 0)
  const section3TotalLeases = section3Stages.reduce((acc, stage) => acc + (typeof stage.totalLeases === 'number' ? stage.totalLeases : stage.totalDeals + 3), 0)

  // Calculate total days for each section
  const section1TotalDays = section1Stages.reduce((acc, stage) => acc + stage.duration, 0);
  const section2TotalDays = section2Stages.reduce((acc, stage) => acc + stage.duration, 0);
  const section3TotalDays = section3Stages.reduce((acc, stage) => acc + stage.duration, 0);

  const svgWidth = stages.length * 180 + 150;
  const stageChartSvg = (
    <svg
      width={svgWidth}
      height={500}
      viewBox={`0 0 ${svgWidth} 500`}
      className="overflow-visible"
    >
      {/* Section Headers */}
      {/* Section 1: Planned to Proposal signed */}
      <text
        x={((stages[2]?.x || 0) + (stages[3]?.x || 0)) / 2}
        y={15}
        className="text-base fill-[#4B2D84] font-semibold"
        textAnchor="middle"
      >
        Leasing Activity
      </text>
      <text
        x={((stages[2]?.x || 0) + (stages[3]?.x || 0)) / 2}
        y={30}
        className="text-sm fill-[#4B2D84]/70"
        textAnchor="middle"
      >
        <tspan className="font-bold">{section1TotalDeals}</tspan> Deals • <tspan className="font-bold">{section1TotalLeases}</tspan> Leases • <tspan className="font-bold">{formatGLA(section1TotalGLA)}</tspan> Sqm • <tspan className="font-bold">{section1TotalDays}</tspan> Days
      </text>

      {/* Section 2: AMC initiated */}
      <text
        x={stages[6]?.x || 0}
        y={15}
        className="text-base fill-[#4B2D84] font-semibold"
        textAnchor="middle"
      >
        AMC Activity
      </text>

      {/* Section 3: AMC approved to Ejar signed */}
      <text
        x={stages[9]?.x || 0}
        y={15}
        className="text-base fill-[#4B2D84] font-semibold"
        textAnchor="middle"
      >
        Lease Admin Activity
      </text>
      <text
        x={stages[9]?.x || 0}
        y={30}
        className="text-sm fill-[#4B2D84]/70"
        textAnchor="middle"
      >
        <tspan className="font-bold">{section3TotalDeals}</tspan> Deals • <tspan className="font-bold">{section3TotalLeases}</tspan> Leases • <tspan className="font-bold">{formatGLA(section3TotalGLA)}</tspan> Sqm • <tspan className="font-bold">{section3TotalDays}</tspan> Days
      </text>

              {/* Stage blocks and connections */}
              {stages.map((stage: StageWithMetrics, index: number) => (
                <g key={stage.name} className="transition-all duration-500">
                  {/* Stage block */}
                  <rect
                    x={stage.x - 75}
                    y={stage.y + stage.dropOffset}
                    width={150}
                    height={90}
                    rx={4}
                    className="fill-[#4B2D84]/10 stroke-[#4B2D84] stroke-1"
                  />

                  {/* Stage name */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 20}
                    className="text-base fill-[#4B2D84] font-semibold"
                    textAnchor="middle"
                  >
                    {stage.name}
                  </text>

                  {/* Thin line under stage name */}
                  <line
                    x1={stage.x - 75}
                    x2={stage.x + 75}
                    y1={stage.y + stage.dropOffset + 27}
                    y2={stage.y + stage.dropOffset + 27}
                    stroke="#4B2D84"
                    strokeWidth={1}
                    opacity={0.6}
                  />

                  {/* Deal count */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 45}
                    className="text-sm fill-[#4B2D84]"
                    textAnchor="middle"
                  >
                    <tspan className="font-bold">{stage.totalDeals}</tspan> Deals
                  </text>

                  {/* Lease count */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 60}
                    className="text-sm fill-[#4B2D84]"
                    textAnchor="middle"
                  >
                    <tspan className="font-bold">{typeof stage.totalLeases === 'number' ? stage.totalLeases : stage.totalDeals + 3}</tspan> Leases
                  </text>

                  {/* Total GLA */}
                  <text
                    x={stage.x}
                    y={stage.y + stage.dropOffset + 75}
                    className="text-sm fill-[#4B2D84]"
                    textAnchor="middle"
                  >
                    <tspan className="font-bold">{formatGLA(stage.total)}</tspan> Sqm
                  </text>

                  {/* Duration bar */}
                  <g transform={`translate(${stage.x - 75}, ${stage.y + stage.dropOffset + 85})`}>
                    <rect
                      width={150}
                      height={24}
                      rx={2}
                      className="fill-[#4B2D84]"
                    />
                    <text
                      x={75}
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
                        d={`M ${stage.x + 75} ${stage.y + stage.dropOffset + 30}
                           L ${stages[index + 1].x - 75} ${stages[index + 1].y + stages[index + 1].dropOffset + 30}`}
                        className="stroke-[#4B2D84] stroke-2"
                        strokeDasharray="4 4"
                      />
                      {/* Arrow */}
                      <path
                        d={`M ${stages[index + 1].x - 85} ${stages[index + 1].y + stages[index + 1].dropOffset + 25} 
                           l 10 5 l -10 5`}
                        className="fill-[#4B2D84]"
                      />
                    </>
                  )}

                  {/* Vertical dotted lines for specific stage transitions */}
                  {(stage.name === 'Proposal signed' || stage.name === 'AMC initiated') && (
                    <line
                      x1={stage.x + 90}
                      y1={stage.y + stage.dropOffset - 80}
                      x2={stage.x + 90}
                      y2={stage.y + stage.dropOffset + 160}
                      className="stroke-[#4B2D84] stroke-1"
                      strokeDasharray="3 3"
                    />
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
            <div className="flex items-center justify-center text-sm text-[#4B2D84]/70">
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