"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Eye, ShoppingCart, DollarSign, Users, Clock } from "lucide-react"

interface PromotionAnalyticsProps {
  promotionId: string
  productName: string
  planName: string
  startDate: Date
  endDate: Date
}

export function PromotionAnalytics({
  promotionId,
  productName,
  planName,
  startDate,
  endDate,
}: PromotionAnalyticsProps) {
  // Mock analytics data - replace with actual API calls
  const analyticsData = {
    totalViews: 2847,
    viewsIncrease: 340,
    totalClicks: 456,
    clickThroughRate: 16.2,
    conversions: 23,
    conversionRate: 5.1,
    revenue: 287.5,
    revenueIncrease: 125,
    impressions: 8920,
    engagement: 12.4,
  }

  const timeSeriesData = [
    { day: "Day 1", views: 45, clicks: 8, conversions: 1 },
    { day: "Day 2", views: 67, clicks: 12, conversions: 2 },
    { day: "Day 3", views: 89, clicks: 15, conversions: 1 },
    { day: "Day 4", views: 123, clicks: 21, conversions: 3 },
    { day: "Day 5", views: 156, clicks: 28, conversions: 4 },
    { day: "Day 6", views: 189, clicks: 32, conversions: 2 },
    { day: "Day 7", views: 234, clicks: 41, conversions: 5 },
  ]

  const getRemainingDays = () => {
    const now = new Date()
    const remaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, remaining)
  }

  const getProgressPercentage = () => {
    const now = new Date()
    const total = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Promotion Analytics</h2>
        <div className="flex items-center gap-4">
          <Badge variant="outline">{productName}</Badge>
          <Badge variant="secondary">{planName}</Badge>
          <span className="text-sm text-muted-foreground">{getRemainingDays()} days remaining</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />+{analyticsData.viewsIncrease}% vs baseline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.clickThroughRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.totalClicks} clicks from {analyticsData.impressions.toLocaleString()} impressions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.conversions}</div>
            <p className="text-xs text-muted-foreground">{analyticsData.conversionRate}% conversion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.revenue}</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />+{analyticsData.revenueIncrease}% vs baseline
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Daily Performance
          </CardTitle>
          <CardDescription>Track your promotion performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeSeriesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="font-medium">{data.day}</div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-3 w-3 text-blue-500" />
                    <span>{data.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-purple-500" />
                    <span>{data.clicks} clicks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-3 w-3 text-green-500" />
                    <span>{data.conversions} sales</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key takeaways from your promotion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Strong Performance</p>
                <p className="text-sm text-green-700">
                  Your promotion is performing {analyticsData.viewsIncrease}% better than average, with excellent
                  engagement rates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">High Visibility</p>
                <p className="text-sm text-blue-700">
                  Your product is appearing in top search results, leading to increased visibility and clicks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <DollarSign className="h-4 w-4 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800">ROI Positive</p>
                <p className="text-sm text-orange-700">
                  Your promotion has generated ${analyticsData.revenue} in revenue, showing a positive return on
                  investment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
