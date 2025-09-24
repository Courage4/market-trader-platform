"use client"

import DashboardLayout from "@/components/dashboard-layout"
import SuperAdminDashboardHeader from "@/components/super-admin/dashboard-header"
import SystemStats from "@/components/super-admin/system-stats"
import AlertsHealth from "@/components/super-admin/alerts-health"
import RegionalPerformance from "@/components/super-admin/regional-performance"
import ActivitiesQuickActions from "@/components/super-admin/activities-quick-actions"

export default function SuperAdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <SuperAdminDashboardHeader />
        <SystemStats />
        <AlertsHealth />
        <RegionalPerformance />
        <ActivitiesQuickActions />
      </div>
    </DashboardLayout>
  )
}
