import React from "react";
import { Card } from "@tremor/react";

const pipelineTeams = [
  { name: "Eastern", total: 32000, weighted: 18000, avgProb: 0.56 },
  { name: "Western", total: 27000, weighted: 15000, avgProb: 0.51 },
  { name: "Center", total: 35000, weighted: 21000, avgProb: 0.60 },
  { name: "Entertainment", total: 12000, weighted: 7000, avgProb: 0.48 },
  { name: "Luxury", total: 9000, weighted: 6000, avgProb: 0.67 },
];

const PipelineTeamTable = () => (
  <Card className="overflow-hidden bg-white mt-8 h-[450px]">
    <div className="px-6 pt-0 pb-0 flex flex-col h-full">
      <h3 className="text-[#4B2D84] font-medium text-sm mb-1">Pipeline by Team</h3>
      <div className="overflow-x-auto overflow-y-auto w-full flex-1 h-full">
        <table className="w-full h-full min-w-[800px] table-fixed" aria-label="Pipeline by Team Table">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-[#4B2D84]/20">
              <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Team</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Total Pipeline Value</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Weighted Pipeline</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-[#4B2D84] bg-white sticky top-0 z-10">Avg Conversion Probability</th>
            </tr>
          </thead>
          <tbody className="h-full align-top">
            {pipelineTeams.map((team) => (
              <tr
                key={team.name}
                className="h-12 border-b border-[#4B2D84]/10 hover:bg-[#4B2D84]/5 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-[#4B2D84]" tabIndex={0} aria-label={`Team ${team.name}`}>{team.name}</td>
                <td className="py-3 px-4 text-[#4B2D84]" tabIndex={0} aria-label={`Total Pipeline Value ${team.total.toLocaleString()} sqm`}>{team.total.toLocaleString()} sqm</td>
                <td className="py-3 px-4 text-[#4B2D84]" tabIndex={0} aria-label={`Weighted Pipeline ${team.weighted.toLocaleString()} sqm`}>{team.weighted.toLocaleString()} sqm</td>
                <td className="py-3 px-4 text-[#4B2D84]" tabIndex={0} aria-label={`Avg Conversion Probability ${(team.avgProb * 100).toFixed(0)}%`}>{(team.avgProb * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Card>
);

export default PipelineTeamTable; 