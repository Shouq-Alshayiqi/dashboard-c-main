"use client";

import { Card, Title } from "@tremor/react";
import { dealerPerformanceData, dealerBottomPerformers, dealsData } from "@/lib/mock-data";
import React from "react";

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value;
};

const formatPercentage = (value: number) => {
  return `${Math.round(value * 100)}%`;
};

// Normalize stage for mapping
const normalizeStage = (stage: string) => stage.trim().toLowerCase();

// Stage color mapping
const stageStyles: Record<string, { border: string; text: string; dot: string }> = {
  "discussion initiated": {
    border: "border-blue-400",
    text: "text-blue-500",
    dot: "bg-blue-400",
  },
  "planned": {
    border: "border-blue-400",
    text: "text-blue-500",
    dot: "bg-blue-400",
  },
  "ejar issued": {
    border: "border-green-500",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  "lease activated": {
    border: "border-green-500",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  "contract signed": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  "amc approved": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  "proposal signed": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  "proposal issued": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  "amc initiated": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
  "location agreed": {
    border: "border-green-500",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  "terms agreed": {
    border: "border-green-500",
    text: "text-green-600",
    dot: "bg-green-500",
  },
  "contract issued": {
    border: "border-yellow-400",
    text: "text-yellow-600",
    dot: "bg-yellow-400",
  },
};

// Stage badge component
const StageBadge: React.FC<{ stage: string }> = ({ stage }) => {
  const style = stageStyles[normalizeStage(stage)] || {
    border: "border-gray-300",
    text: "text-gray-500",
    dot: "bg-gray-300",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 border ${style.border} ${style.text} rounded-full text-xs font-medium bg-white whitespace-nowrap`}
      tabIndex={0}
      aria-label={stage}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${style.dot}`}></span>
      {stage}
    </span>
  );
};

export const LeaseManagerTable = () => {
  // Combine and sort all dealers by total GLA (highest to lowest)
  const allDealers = [...dealerPerformanceData, ...dealerBottomPerformers].sort(
    (a, b) => b.totalGLA - a.totalGLA
  );

  return (
    <Card className="overflow-hidden bg-white mt-8">
      <div className="px-6 pt-4 pb-4 flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Lease Manager Details Table</Title>
        <div className="flex justify-end mb-2">
          <div className="relative w-44">
            <select className="appearance-none w-full px-4 py-2 rounded-lg border border-[#4B2D84]/30 text-[#4B2D84] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4B2D84] pr-8">
              <option>Filter By</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8L10 13L15 8" stroke="#4B2D84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="overflow-auto h-[700px] overflow-y-auto">
          <table className="w-full" aria-label="Lease Manager Table">
            <thead>
              <tr className="border-b border-[#4B2D84]/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84]">Dealer Name</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Total GLA</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Deals Count</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Deal Size</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Conversion Rate</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84]">Avg Duration</th>
              </tr>
            </thead>
            <tbody>
              {allDealers.map((dealer) => (
                <tr
                  key={dealer.name}
                  className="h-12 border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
                >
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
          </table>
        </div>
      </div>
    </Card>
  );
};

export const DealsTable = () => {
  return (
    <Card className="overflow-hidden bg-white mt-8">
      <div className="px-6 pt-4 pb-4 flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-6">Deals Details Table</Title>
        <div className="flex justify-end mb-2">
          <div className="relative w-44">
            <select className="appearance-none w-full px-4 py-2 rounded-lg border border-[#4B2D84]/30 text-[#4B2D84] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4B2D84] pr-8">
              <option>Filter By</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 8L10 13L15 8" stroke="#4B2D84" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto h-[830px] w-full">
          <table className="w-full min-w-[800px]" aria-label="Deals Table">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="border-b border-[#4B2D84]/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Deal Ref#</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">
                  Group Name
                  <button className="ml-2 align-middle text-gray-400 hover:text-[#4B2D84] focus:outline-none" aria-label="Filter Group Name">
                    <span className="block leading-none text-xs">▲</span>
                    <span className="block leading-none text-xs">▼</span>
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Brand Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">
                  Lease Manager
                  <button className="ml-2 align-middle text-gray-400 hover:text-[#4B2D84] focus:outline-none" aria-label="Filter Lease Manager">
                    <span className="block leading-none text-xs">▲</span>
                    <span className="block leading-none text-xs">▼</span>
                  </button>
                </th>
                <th className="text-left py-3 px-0 pr-12 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Leases</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">
                  Created On
                  <button className="ml-2 align-middle text-gray-400 hover:text-[#4B2D84] focus:outline-none" aria-label="Filter Created On">
                    <span className="block leading-none text-xs">▲</span>
                    <span className="block leading-none text-xs">▼</span>
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Stage</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10"> </th>
              </tr>
            </thead>
            <tbody>
              {dealsData.map((deal, idx) => (
                <tr
                  key={deal.name + idx}
                  className="h-12 border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-[#4B2D84]">{deal.name}</td>
                  <td className="py-3 px-4 text-[#4B2D84]">{deal.groupName}</td>
                  <td className="py-3 px-4 text-[#4B2D84]">{deal.brandName}</td>
                  <td className="py-3 px-4 text-[#4B2D84]">{deal.leaseManager}</td>
                  <td className="py-3 px-0 pr-12 text-left text-[#4B2D84]">{deal.stores}</td>
                  <td className="py-3 px-4 text-[#4B2D84]">{deal.createdOn}</td>
                  <td className="py-3 px-4 text-[#4B2D84]">
                    {/* Stage badge */}
                    <StageBadge stage={deal.stage} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      className="px-4 py-2 bg-[#4B2D84] text-white rounded hover:bg-[#3a236a] focus:outline-none focus:ring-2 focus:ring-[#4B2D84]"
                      aria-label={`Show details for ${deal.name}`}
                      tabIndex={0}
                      onClick={() => alert(`Show details for ${deal.name}`)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};