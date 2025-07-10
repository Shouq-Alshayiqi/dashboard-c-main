"use client"

import { Header } from "@/components/layout/header";
import { DealsTable } from "@/components/dashboard/lease-manager-table";

const DealsDetails = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <section className="flex-1 flex flex-col items-center p-8">
        <DealsTable />
      </section>
    </main>
  );
};

export default DealsDetails; 