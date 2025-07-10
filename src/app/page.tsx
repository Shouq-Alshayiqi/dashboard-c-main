'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { KPICards } from "@/components/dashboard/kpi-cards"
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel"
import { ProgressChart } from "@/components/dashboard/progress-chart"
import { WeightedPipeline } from "@/components/dashboard/weighted-pipeline"
import { LeaseExpiry } from "@/components/dashboard/lease-expiry"
import { PipelineAnalysisKPIs } from "@/components/dashboard/pipeline-analysis-kpis"
import { PerformanceKPIs } from "@/components/dashboard/performance-kpis"
import { TopBrands } from "@/components/dashboard/top-brands"
import { DealDuration, DealDurationSigned } from "@/components/dashboard/deal-duration"
import { DealerKPIs } from "@/components/dashboard/dealer-kpis"
import { DealerPerformanceTable } from "@/components/dashboard/dealer-performance-table"
import { DealerPerformanceTablePipeline } from "@/components/dashboard/dealer-performance-table-pipeline"
import { DealerBottomPerformers } from "@/components/dashboard/dealer-bottom-performers"
import { DealerMetrics } from "@/components/dashboard/dealer-metrics"
import TopDealerDurations from "@/components/dashboard/top-dealer-durations"
import DealerDealDurations from '@/components/dashboard/dealer-deal-durations'
import { DealerPipelineTable } from "@/components/dashboard/dealer-pipeline-table"
import { TopGroupsSigned } from '@/components/dashboard/top-brands'
import { MONTHLY_DATA } from '@/lib/data/dashboard-data'
import { Header } from "@/components/layout/header"
import DealsDetails from "./lease-manager-details/page"
import PipelineTeamTable from "@/components/dashboard/pipeline-team-table"

// Add custom animation class
const shineAnimation = `
@keyframes shine {
  0% {
    background-position: -100% 50%;
  }
  50% {
    background-position: 150% 50%;
  }
  100% {
    background-position: 150% 50%;
  }
}

.shine-once {
  position: relative;
  overflow: hidden;
  animation: none;
}

.shine-once::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 25%,
    rgba(255, 255, 255, 0.2) 45%,
    rgba(255, 255, 255, 0.4) 48%,
    rgba(255, 255, 255, 0.2) 51%,
    transparent 75%
  );
  background-size: 200% 100%;
  background-position: -100% 50%;
  animation: shine 2s ease-in-out 1s forwards;
}
`

const slides = [
  {
    id: 'overview',
    title: 'Overview',
    component: (selectedMonth: string, selectedTeam: string) => (
      <div className="h-[calc(100vh-9rem)] overflow-hidden">
        <div className="h-[120px]">
          <KPICards selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
        </div>
        <div className="h-[calc(100%-120px)] mt-6">
          <div className="flex h-full gap-12">
            <div className="flex-1 h-full min-h-0 flex items-stretch">
              <ProgressChart selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
            <div className="flex-1 h-full min-h-0 flex items-stretch">
              <PipelineFunnel selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'performance',
    title: 'Performance Metrics',
    component: (selectedMonth: string, selectedTeam: string) => (
      <div className="h-[calc(100vh-9rem)] flex flex-col overflow-hidden">
        <div className="h-[120px] shrink-0">
          <PerformanceKPIs selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
        </div>
        <div className="mt-6 flex-1 min-h-0 flex flex-col gap-6">
          <div className="w-full min-h-0 overflow-x-auto rounded-lg bg-white p-2 flex items-stretch h-[600px]">
            <div className="w-full flex-1 flex items-stretch">
              <DealDurationSigned selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 h-full min-h-0">
            <div className="flex flex-col h-full min-h-0">
              <div className="flex-1 min-h-0 rounded-lg bg-white p-2 flex items-stretch h-[450px]">
                <div className="w-full flex-1 flex items-stretch">
                  <DealerDealDurations selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-0">
              <div className="flex-1 min-h-0 rounded-lg bg-white p-2 flex items-stretch h-[450px]">
                <div className="w-full flex-1 flex items-stretch">
                  <TopGroupsSigned selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'pipeline',
    title: 'Pipeline Analysis',
    component: (selectedMonth: string, selectedTeam: string) => (
      <div className="h-[calc(100vh-9rem)] flex flex-col overflow-hidden">
        <div className="h-[120px] shrink-0">
          <PipelineAnalysisKPIs selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto mt-6 flex flex-col gap-6 pr-2" tabIndex={0} aria-label="Pipeline Analysis Content Scroll Area">
          {/* Deal Stage Analysis - Large Middle Section */}
          <div className="h-[355px] min-h-[355px] rounded-lg bg-white p-2 flex items-stretch">
            <div className="w-full flex-1 flex items-stretch">
              <DealDuration selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
          </div>
          {/* Weighted Pipeline - Full Width (adjusted height for full chart visibility) */}
          <div className="h-[350px] min-h-[350px] rounded-lg bg-white p-2 flex items-stretch">
            <div className="w-full flex-1 flex items-stretch">
              <WeightedPipeline selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
          </div>
          {/* Bottom Row: Top Brands (left), Pipeline by Team Table (right) */}
          <div className="h-[500px] grid grid-cols-2 gap-6">
            <div className="flex flex-col h-full min-h-0">
              <div className="flex-1 min-h-0 rounded-lg bg-white p-8 flex items-stretch h-[250px] min-h-[250px]">
                <div className="w-full flex-1 flex items-stretch h-full">
                  <TopBrands selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full min-h-0">
              <div className="flex-1 min-h-0 rounded-lg bg-white p-8 flex items-stretch">
                <div className="w-full flex-1 flex items-stretch">
                  <PipelineTeamTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'dealers',
    title: 'Lease Manager Performance',
    component: (selectedMonth: string, selectedTeam: string) => (
      <div className="h-[calc(100vh-9rem)] overflow-hidden">
        <div className="h-[120px]">
          <DealerKPIs selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
        </div>
        <div className="h-[calc(100%-120px)] mt-6">
          <div className="grid grid-cols-2 gap-6 h-full items-stretch">
            <div className="h-full min-h-[600px] overflow-hidden">
              <DealerPerformanceTable selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
            <div className="h-full min-h-[600px] overflow-hidden">
              <DealerPerformanceTablePipeline selectedMonth={selectedMonth} selectedTeam={selectedTeam} />
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'deals-details',
    title: 'Deals Details',
    component: () => <DealsDetails />
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const months = MONTHLY_DATA.map((d) => d.month)
  const [selectedMonth, setSelectedMonth] = useState('All')
  const teamOptions = ['All', 'Central', 'Western', 'Eastern', 'Entertainment', 'Luxury']
  const [selectedTeam, setSelectedTeam] = useState('All')
  const hasNextSlide = currentSlide < slides.length - 1
  const hasPrevSlide = currentSlide > 0
  const nextSlide = hasNextSlide ? slides[currentSlide + 1] : null
  const prevSlide = hasPrevSlide ? slides[currentSlide - 1] : null
  const isOverviewSlide = currentSlide === 0

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && hasNextSlide) {
        setCurrentSlide(currentSlide + 1)
      } else if (e.key === 'ArrowLeft' && hasPrevSlide) {
        setCurrentSlide(currentSlide - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, hasNextSlide, hasPrevSlide])

  return (
    <>
      <style jsx global>{shineAnimation}</style>
      <div className="h-screen overflow-hidden bg-[#f5f5f7]">
        <header className="h-16 bg-[#4B2D84] text-white">
          <div className="container h-full flex items-center justify-between px-8">
            <div className="flex items-center h-full py-3">
              <Image 
                src="/cenomi-logo.png"
                alt="Cenomi Logo"
                width={65}
                height={22}
                className="mr-8"
                style={{ objectFit: 'contain' }}
              />
              {hasPrevSlide ? (
                <button
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 transition-colors group focus:outline-none focus:ring-0"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium">{prevSlide?.title}</span>
                </button>
              ) : (
                <div className="w-[200px]" />
              )}
            </div>
            
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <span className="font-bold text-2xl">{slides[currentSlide].title}</span>
            </div>
            
            {hasNextSlide ? (
              <button
                onClick={() => setCurrentSlide(currentSlide + 1)}
                className={`flex items-center space-x-2 px-6 py-3 hover:bg-white/5 rounded-full transition-colors group bg-white/10 focus:outline-none focus:ring-0 ${isOverviewSlide ? 'shine-once' : ''}`}
              >
                <span className="text-sm">
                  <span className="text-white/70">Next: </span>
                  <span className="font-medium">{nextSlide?.title}</span>
                </span>
                <ChevronRightIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
            ) : (
              <div className="w-[200px]" />
            )}
          </div>
        </header>

        <main className="h-[calc(100vh-4rem)] p-8">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap items-center gap-4 justify-end">
            {/* Month Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="month-select" className="text-[#4B2D84] font-medium mr-2">Filter by Month:</label>
              <select
                id="month-select"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[#4B2D84]/30 text-[#4B2D84] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4B2D84]"
                aria-label="Select month to filter charts"
              >
                <option value="All">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            {/* Team Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="team-select" className="text-[#4B2D84] font-medium mr-2">Filter by Team:</label>
              <select
                id="team-select"
                value={selectedTeam}
                onChange={e => setSelectedTeam(e.target.value)}
                className="px-4 py-2 rounded-lg border border-[#4B2D84]/30 text-[#4B2D84] bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4B2D84]"
                aria-label="Select team to filter charts"
              >
                {teamOptions.map(team => (
                  <option key={team} value={team}>{team === 'All' ? 'All Teams' : team}</option>
                ))}
              </select>
            </div>
          </div>
          {slides[currentSlide].component(selectedMonth, selectedTeam)}
        </main>
      </div>
    </>
  )
}
