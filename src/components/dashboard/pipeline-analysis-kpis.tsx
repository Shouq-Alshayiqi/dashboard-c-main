'use client'

import { pipelineStages, leaseExpiryData, monthlyConversionData, topBrandsInPipeline } from "@/lib/mock-data"
import React from "react";
import PipelineTeamTable from "./pipeline-team-table";

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

interface MonthlyConversionItem {
  month: string;
  "Deals Started": number;
  "Deals Closed": number;
  "Deals Dropped": number;
  "Net GLA": number;
}

const pipelineTeams = [
  { name: "Eastern", total: 32000, weighted: 18000, avgProb: 0.56 },
  { name: "Western", total: 27000, weighted: 15000, avgProb: 0.51 },
  { name: "Center", total: 35000, weighted: 21000, avgProb: 0.60 },
  { name: "Entertainment", total: 12000, weighted: 7000, avgProb: 0.48 },
  { name: "Luxury", total: 9000, weighted: 6000, avgProb: 0.67 },
];

export const PipelineAnalysisKPIs = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let totalPipelineValue = pipelineStages.filter(stage => stage.name !== 'Closed').reduce((acc, stage) => acc + stage.value, 0)
  let totalWeightedValue = pipelineStages.filter(stage => stage.name !== 'Closed').reduce((acc, stage) => acc + (stage.value * stage.probability), 0)
  let topBrandsPotential = topBrandsInPipeline.reduce((acc, brand) => acc + (brand.gla * brand.probability), 0)
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    totalPipelineValue = Math.round(totalPipelineValue / 5)
    totalWeightedValue = Math.round(totalWeightedValue / 5)
    topBrandsPotential = Math.round(topBrandsPotential / 5)
  }

  // Calculate conversion metrics
  const totalDealsStarted = monthlyConversionData.reduce((acc: number, item: MonthlyConversionItem) => acc + item["Deals Started"], 0)
  const totalDealsClosed = monthlyConversionData.reduce((acc: number, item: MonthlyConversionItem) => acc + item["Deals Closed"], 0)
  const conversionRate = (totalDealsClosed / totalDealsStarted) * 100

  const kpis = [
    {
      title: "Total Pipeline Value",
      value: `${formatValue(totalPipelineValue)} sqm`,
      subtext: "Current active pipeline",
      color: "#4B2D84"
    },
    {
      title: "Weighted Pipeline",
      value: `${formatValue(totalWeightedValue)} sqm`,
      subtext: "Probability adjusted value",
      color: "#9B6A2D"
    },
    {
      title: "Avg Conversion Probability",
      value: `${Math.round(totalWeightedValue / totalPipelineValue * 100)}%`,
      subtext: "Based on weighted value",
      color: "#2D6A1F"
    },
    {
      title: "Top Groups Potential",
      value: `${formatValue(topBrandsPotential)} sqm`,
      subtext: "Weighted GLA from top 10 Groups",
      color: "#84B22D"
    }
  ]

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
    </>
  )
} 