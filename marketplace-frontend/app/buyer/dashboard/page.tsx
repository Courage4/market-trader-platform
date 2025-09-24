"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"


export default function BuyerDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Dashboard Cards */}
        <DashboardCards />
        
        {/* Dashboard Charts */}
        {/* <DashboardCharts /> */}
      </div>
    </DashboardLayout>
  )
}
