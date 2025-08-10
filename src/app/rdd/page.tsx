"use client";
import { DealDurationBase } from "@/components/dashboard/deal-duration";
import { PIPELINE_STAGES } from "@/lib/data/dashboard-data";

const leaseActiveStage = { name: 'Lease Active', total: 1200, weighted: 1200, probability: 1.00, duration: 4, totalDeals: 3, totalLeases: 4 };
const stagesWithLeaseActive = [...PIPELINE_STAGES, leaseActiveStage];

const RDDPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[#4B2D84] mb-4">RDD Page</h1>
      <p className="text-lg text-gray-700 mb-8">This is the new RDD page. Add your content here.</p>
      <div className="w-full max-w-6xl">
        <DealDurationBase title="Deal Stage Analysis (RDD)" stagesSource={stagesWithLeaseActive} showDropped={true} />
      </div>
    </main>
  );
};

export default RDDPage;