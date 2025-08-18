"use client"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { PromotionAnalytics } from "@/components/promotion-analytics"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Promotions
          </Button>
        </div>

        <PromotionAnalytics
          promotionId={promotionData.id}
          productName={promotionData.productName}
          planName={promotionData.planName}
          startDate={promotionData.startDate}
          endDate={promotionData.endDate}
        />
      </div>
    </div>
  )
}
