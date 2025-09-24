"use client"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { PromotionAnalytics } from "@/components/promotion-analytics"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3 } from "lucide-react"

export default function PromotionAnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const promotionId = params.id as string

  // Mock data - replace with actual API call
  const promotionData = {
    id: promotionId,
    productName: "Fresh Organic Tomatoes",
    planName: "Monthly Plan",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-02-15"),
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Button onClick={() => router.back()} className="btn btn-ghost btn-icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <BarChart3 className="h-8 w-8 text-emerald-500" />
              <h1 className="text-4xl font-bold text-gradient">Promotion Analytics</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Track your promotion performance and optimize your marketing strategy
            </p>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Button onClick={() => router.back()} className="btn btn-outline">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Promotions
            </Button>
          </div>
        </div>

        <PromotionAnalytics
          promotionId={promotionData.id}
          productName={promotionData.productName}
          planName={promotionData.planName}
          startDate={promotionData.startDate}
          endDate={promotionData.endDate}
        />
      </div>
    </DashboardLayout>
  )
}
