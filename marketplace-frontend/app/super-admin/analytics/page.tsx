"use client"

import DashboardLayout from "@/components/dashboard-layout"
import AnalyticsHeader from "@/components/super-admin/analytics-header"
import AnalyticsOverallStats from "@/components/super-admin/analytics-overall-stats"
import AnalyticsRegionalPerformance from "@/components/super-admin/analytics-regional-performance"
import AnalyticsCategoryPerformance from "@/components/super-admin/analytics-category-performance"
import AnalyticsTopMarkets from "@/components/super-admin/analytics-top-markets"
import AnalyticsGrowthTimeline from "@/components/super-admin/analytics-growth-timeline"

export default function SuperAdminAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <AnalyticsHeader />
        <AnalyticsOverallStats />
        <AnalyticsRegionalPerformance />
        <AnalyticsCategoryPerformance />
        <AnalyticsTopMarkets />
        <AnalyticsGrowthTimeline />
      </div>
    </DashboardLayout>
  )
}