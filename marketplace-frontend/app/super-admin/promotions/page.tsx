"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import PromotionsHeader from "@/components/super-admin/promotions-header"
import PromotionsStats from "@/components/super-admin/promotions-stats"
import PromotionsFilters from "@/components/super-admin/promotions-filters"
import PromotionsTable from "@/components/super-admin/promotions-table"
import PromotionPlans from "@/components/super-admin/promotion-plans"
import { activePromotions } from "@/components/super-admin/promotions-data"

export default function SuperAdminPromotions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const filteredPromotions = activePromotions.filter((promotion) => {
    const matchesSearch =
      promotion.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesPlan = planFilter === "all" || promotion.planId === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <DashboardLayout>

      <div className="space-y-8">
        <PromotionsHeader />
        <PromotionsStats />
        <PromotionsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          planFilter={planFilter}
          setPlanFilter={setPlanFilter}
        />
        <PromotionsTable filteredPromotions={filteredPromotions} />
        <PromotionPlans />
      </div>
    </DashboardLayout>
  )
}
