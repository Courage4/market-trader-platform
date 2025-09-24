"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Eye, Phone, MessageCircle, Users, Clock, Target, Zap, Calendar, AlertCircle } from "lucide-react"

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
    totalCalls: 123,
    totalMessages: 89,
    contactRate: 5.1,
    impressions: 8920,
    engagement: 12.4,
  }

  const timeSeriesData = [
    { day: "Day 1", views: 45, clicks: 8, calls: 3, messages: 2 },
    { day: "Day 2", views: 67, clicks: 12, calls: 5, messages: 4 },
    { day: "Day 3", views: 89, clicks: 15, calls: 7, messages: 3 },
    { day: "Day 4", views: 123, clicks: 21, calls: 8, messages: 6 },
    { day: "Day 5", views: 156, clicks: 28, calls: 12, messages: 9 },
    { day: "Day 6", views: 189, clicks: 32, calls: 15, messages: 11 },
    { day: "Day 7", views: 234, clicks: 41, calls: 18, messages: 14 },
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
    <div className="space-y-8">
      {/* Promotion Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <Target className="h-6 w-6 text-emerald-500" />
              Promotion Overview
            </h3>
            <div className="flex items-center gap-3">
              <span className="badge-primary">{productName}</span>
              <span className="badge-featured">{planName}</span>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 text-right">
            <p className="text-lg font-bold text-emerald-600">{getRemainingDays()} days remaining</p>
            <p className="text-sm text-gray-600">
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Campaign Progress</span>
            <span className="font-bold text-emerald-600">{Math.round(getProgressPercentage())}% Complete</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-4 bg-gray-200" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Total Views</p>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.totalViews.toLocaleString()}</p>
            <p className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />+{analyticsData.viewsIncrease}% vs baseline
            </p>
          </div>
        </div>

        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Click-Through Rate</p>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.clickThroughRate}%</p>
            <p className="text-sm font-medium text-gray-600">
              {analyticsData.totalClicks} clicks from {analyticsData.impressions.toLocaleString()} impressions
            </p>
          </div>
        </div>

        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Calls Received</p>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.totalCalls}</p>
            <p className="text-sm font-medium text-gray-600">{analyticsData.contactRate}% contact rate</p>
          </div>
        </div>

        <div className="card-interactive p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Messages Received</p>
            <p className="text-3xl font-bold text-gray-900">{analyticsData.totalMessages}</p>
            <p className="text-sm font-medium text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />Direct buyer engagement
            </p>
          </div>
        </div>
      </div>

      {/* Performance Timeline */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="h-6 w-6 text-emerald-500" />
            Daily Performance
          </h3>
          <p className="text-gray-600 mt-2">Track your promotion performance over time</p>
        </div>

          <div className="space-y-4">
            {timeSeriesData.map((data, index) => (
            <div key={index} className="card p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900">{data.day}</div>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{data.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{data.clicks} clicks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{data.calls} calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{data.messages} messages</span>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Zap className="h-6 w-6 text-emerald-500" />
            Performance Insights
          </h3>
          <p className="text-gray-600 mt-2">Key takeaways from your promotion campaign</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-2">Strong Performance</h4>
                <p className="text-sm text-emerald-800">
                  Your promotion is performing {analyticsData.viewsIncrease}% better than average, with excellent
                  engagement rates across Ghana's markets.
                </p>
              </div>
              </div>
            </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">High Visibility</h4>
                <p className="text-sm text-blue-800">
                  Your product is appearing in top search results, leading to increased visibility and customer engagement.
                </p>
              </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
              <div>
                  <h4 className="font-bold text-orange-900 mb-2">Strong Communication</h4>
                  <p className="text-sm text-orange-800">
                    Your promotion has generated {analyticsData.totalCalls + analyticsData.totalMessages} direct buyer contacts, 
                    showing strong interest in your products.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Quick Stats */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4">Quick Performance Summary</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-emerald-600">{analyticsData.engagement}%</p>
              <p className="text-sm text-gray-600">Engagement Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{Math.round(analyticsData.totalClicks / timeSeriesData.length)}</p>
              <p className="text-sm text-gray-600">Avg Daily Clicks</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{Math.round(analyticsData.totalViews / timeSeriesData.length)}</p>
              <p className="text-sm text-gray-600">Avg Daily Views</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-orange-600">{analyticsData.totalCalls}</p>
              <p className="text-sm text-gray-600">Total Calls</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
