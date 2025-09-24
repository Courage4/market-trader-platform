"use client"

import DashboardLayout from "@/components/dashboard-layout"
import SystemHeader from "@/components/super-admin/system-header"
import SystemSettings from "@/components/super-admin/system-settings"
import SystemHealth from "@/components/super-admin/system-health"
import SystemSecurity from "@/components/super-admin/system-security"

export default function SuperAdminSystem() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <SystemHeader />
        <SystemSettings />
        <SystemHealth />
        <SystemSecurity />
      </div>
    </DashboardLayout>
  )
}