"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BarChart3, TrendingUp, Eye, Phone, MessageCircle, Users, Download, Calendar } from "lucide-react"

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  const analyticsData = {
    totalViews: 8420,
    totalCalls: 156,
    totalMessages: 247,
    engagementRate: 3.2,
    topProducts: [
      { name: "Fresh Tomatoes", calls: 45, messages: 32, views: 1200 },
      { name: "Organic Carrots", calls: 38, messages: 28, views: 980 },
      { name: "Green Lettuce", calls: 32, messages: 24, views: 750 },
      { name: "Sweet Red Apples", calls: 28, messages: 20, views: 650 },
      { name: "Artisanal Bread", calls: 25, messages: 18, views: 580 },
    ],
    recentActivity: [
      { date: "2024-01-20", event: "Product viewed", product: "Fresh Tomatoes", count: 23, icon: Eye, color: "purple" },
      { date: "2024-01-20", event: "Vendor called", product: "Organic Carrots", count: 3, icon: Phone, color: "green" },
      { date: "2024-01-19", event: "Message sent", product: "Green Lettuce", count: 5, icon: MessageCircle, color: "blue" },
      { date: "2024-01-19", event: "Product viewed", product: "Sweet Red Apples", count: 15, icon: Eye, color: "purple" },
      { date: "2024-01-18", event: "Vendor called", product: "Artisanal Bread", count: 2, icon: Phone, color: "green" },
      { date: "2024-01-18", event: "Message sent", product: "Fresh Tomatoes", count: 8, icon: MessageCircle, color: "blue" },
    ],
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-4xl font-bold text-gradient">Analytics Dashboard</h1>
              <p className="text-lg text-gray-600 mt-2">Track your store performance and insights</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] h-12 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
                <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                <SelectItem value="7d" className="rounded-lg hover:bg-orange-50">Last 7 days</SelectItem>
                <SelectItem value="30d" className="rounded-lg hover:bg-orange-50">Last 30 days</SelectItem>
                <SelectItem value="90d" className="rounded-lg hover:bg-orange-50">Last 90 days</SelectItem>
                <SelectItem value="1y" className="rounded-lg hover:bg-orange-50">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Views */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Views</CardTitle>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{analyticsData.totalViews.toLocaleString()}</div>
              <p className="text-sm text-purple-600 flex items-center gap-1 font-medium">
                <TrendingUp className="h-4 w-4" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          {/* Total Calls */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Calls Received</CardTitle>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{analyticsData.totalCalls}</div>
              <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                <TrendingUp className="h-4 w-4" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          {/* Messages Received */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">Messages Received</CardTitle>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{analyticsData.totalMessages}</div>
              <p className="text-sm text-blue-600 flex items-center gap-1 font-medium">
                <TrendingUp className="h-4 w-4" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          {/* Engagement Rate */}
          <Card className="card-interactive">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">Engagement Rate</CardTitle>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 mb-2">{analyticsData.engagementRate}%</div>
              <p className="text-sm text-orange-600 flex items-center gap-1 font-medium">
                <TrendingUp className="h-4 w-4" />
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Popular Products */}
          <Card className="card">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Most Popular Products
              </CardTitle>
              <CardDescription className="text-gray-600">Your most viewed and contacted products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-sm font-bold text-white">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-green-600" />
                            {product.calls} calls
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 text-blue-600" />
                            {product.messages} messages
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-purple-600" />
                            {product.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{product.calls + product.messages} contacts</div>
                      <Badge className="badge-secondary text-xs">
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="card">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-600">Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  const getIconBg = (color: string) => {
                    switch (color) {
                      case 'purple': return 'bg-purple-100'
                      case 'green': return 'bg-green-100'
                      case 'blue': return 'bg-blue-100'
                      default: return 'bg-gray-100'
                    }
                  }
                  const getIconColor = (color: string) => {
                    switch (color) {
                      case 'purple': return 'text-purple-600'
                      case 'green': return 'text-green-600'
                      case 'blue': return 'text-blue-600'
                      default: return 'text-gray-600'
                    }
                  }
                  
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                      <div className={`w-10 h-10 ${getIconBg(activity.color)} rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${getIconColor(activity.color)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{activity.event}</span>
                          <Badge className="badge-outline text-xs">
                            {activity.count}x
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">{activity.product}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
