'use client'

import { Card, Title } from "@tremor/react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts'
import { topBrandsInPipeline } from "@/lib/mock-data"
import { TOP_SIGNED_GROUPS } from "@/lib/data/dashboard-data"

const formatValue = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value
}

// Custom thin hover line
const CustomHoverCursor = (props: any) => {
  const { y, height, width, x } = props
  return (
    <rect
      x={x}
      y={y + height / 4}
      width={width}
      height={height / 2}
      fill="#4B2D84"
      fillOpacity={0.08}
      rx={2}
    />
  )
}

export const TopBrands = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let data = [...topBrandsInPipeline]
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    data = data.map(brand => ({ ...brand, gla: Math.round(brand.gla / 5) }))
  }

  const chartData = data
    .sort((a, b) => (b.gla * b.probability) - (a.gla * a.probability))
    .slice(0, 10)
    .map(brand => ({
      name: brand.name,
      "Potential GLA": Math.round(brand.gla * brand.probability),
      "Total GLA": brand.gla,
      probability: brand.probability
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#4B2D84]/20 shadow-sm p-3">
        <p className="font-medium text-sm text-[#4B2D84] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => {
          if (!entry.value) return null;
          const isPotential = entry.dataKey === 'Potential GLA';
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${isPotential ? 'bg-[#6B4E9B]' : 'bg-[#B7A8D9]'}`} />
              <span className={`${isPotential ? 'text-[#6B4E9B]' : 'text-[#B7A8D9]'}`}>
                {entry.dataKey}: {formatValue(entry.value)} sqm
                {isPotential && ` (${Math.round(entry.value / payload.find((p: any) => p.dataKey === 'Total GLA')?.value * 100)}% probability)`}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  const ProgressBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const total = payload['Total GLA'];
    const potential = payload['Potential GLA'];
    const probability = payload['probability'];
    const progressWidth = (potential / total) * width;
    const percentLabel = typeof probability === 'number' ? `${Math.round(probability * 100)}%` : '';
    const totalLabel = typeof total === 'number' ? formatValue(total) + ' sqm' : '';

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#B7A8D9" rx={4} />
        <rect x={x} y={y} width={progressWidth} height={height} fill="#6B4E9B" rx={4} />
        {percentLabel && progressWidth > 32 && (
          <text
            x={x + progressWidth / 2}
            y={y + height / 2}
            textAnchor="middle"
            alignmentBaseline="central"
            fill="#fff"
            fontWeight="700"
            fontSize="13px"
          >
            {percentLabel}
          </text>
        )}
        {totalLabel && (
          <text
            x={x + width + 8}
            y={y + height / 2}
            textAnchor="start"
            alignmentBaseline="central"
            fill="#4B2D84"
            fontWeight="700"
            fontSize="13px"
          >
            {totalLabel}
          </text>
        )}
      </g>
    )
  }

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-4">Top Groups</Title>
        <div className="min-h-[390px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
              barGap={0}
              barCategoryGap={4}
            >
              <XAxis
                type="number"
                stroke="#4B2D84"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, 'dataMax + 100']}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#4B2D84"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} cursor={<CustomHoverCursor />} />
              <Bar
                dataKey="Total GLA"
                fill="#B7A8D9"
                radius={[0, 4, 4, 0]}
                maxBarSize={28}
                shape={ProgressBar}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

export const TopGroupsSigned = ({ selectedMonth = 'All', selectedTeam = 'All' }) => {
  let data = [...TOP_SIGNED_GROUPS]
  if (selectedMonth !== 'All' || selectedTeam !== 'All') {
    data = data.map(brand => ({ ...brand, gla: Math.round(brand.gla / 5) }))
  }

  const chartData = data
    .sort((a, b) => b.gla - a.gla)
    .map(brand => ({
      name: brand.name,
      "Signed GLA": brand.gla,
      daysToSign: brand.daysToSign
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#4B2D84]/20 shadow-sm p-3">
        <p className="font-medium text-sm text-[#4B2D84] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4B2D84]" />
              <span className="text-[#4B2D84]">
                {entry.dataKey}: {formatValue(entry.value)} sqm
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Custom label for days to sign, positioned outside the bar
  const DaysLabel = (props: any) => {
    const { x, y, width, value, height } = props;
    if (!value) return null;
    return (
      <text
        x={x + width + 12}
        y={y + height / 2}
        textAnchor="start"
        alignmentBaseline="central"
        className="select-none"
        aria-label={`Days to sign: ${value} days`}
        fill="#4B2D84"
        fontSize="14px"
        fontWeight="600"
      >
        {`${value}d`}
      </text>
    );
  };

  return (
    <Card className="h-full overflow-hidden bg-white">
      <div className="px-6 pt-4 pb-6 h-full flex flex-col">
        <Title className="text-[#4B2D84] font-medium text-sm mb-4">Top Groups - Signed</Title>
        <div className="min-h-[455px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
              barGap={0}
              barCategoryGap={4}
            >
              <XAxis
                type="number"
                stroke="#4B2D84"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, 'dataMax + 100']}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#4B2D84"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} cursor={<CustomHoverCursor />} />
              <Bar
                dataKey="Signed GLA"
                fill="#4B2D84"
                radius={[0, 4, 4, 0]}
                maxBarSize={28}
              >
                <LabelList
                  dataKey="Signed GLA"
                  position="insideRight"
                  formatter={(value: number) => `${formatValue(value)} sqm`}
                  style={{ fill: "#fff", fontSize: "14px", fontWeight: 600 }}
                  offset={8}
                />
                <LabelList
                  dataKey="daysToSign"
                  content={DaysLabel}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
} 