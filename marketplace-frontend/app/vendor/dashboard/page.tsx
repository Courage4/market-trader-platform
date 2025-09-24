"use client"

import DashboardLayout from "@/components/dashboard-layout"
import DashboardHeader from "@/components/vendor/dashboard-header"
import DashboardStats from "@/components/vendor/dashboard-stats"
import DashboardRecentProducts from "@/components/vendor/dashboard-recent-products"
import DashboardRecentMessages from "@/components/vendor/dashboard-recent-messages"
import DashboardQuickActions from "@/components/vendor/dashboard-quick-actions"

export default function VendorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader />
        <DashboardStats />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <DashboardRecentProducts />
          <DashboardRecentMessages />
        </div>
        <DashboardQuickActions />
      </div>
    </DashboardLayout>
  )
}
