"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BarChart3, TrendingUp, Eye, ShoppingCart, DollarSign, Users, Download } from "lucide-react"

export default function VendorAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  const analyticsData = {
    totalRevenue: "₵12,960", // GHS
    totalOrders: 156,
    totalViews: 8420,
    conversionRate: 3.2,
    topProducts: [
      { name: "Fresh Tomatoes", revenue: "₵3,240", orders: 45, views: 1200 },
      { name: "Organic Carrots", revenue: "₵2,880", orders: 38, views: 980 },
      { name: "Green Lettuce", revenue: "₵1,920", orders: 32, views: 750 },
    ],
    recentActivity: [
      { date: "2024-01-20", event: "Product viewed", product: "Fresh Tomatoes", count: 23 },
      { date: "2024-01-20", event: "Order placed", product: "Organic Carrots", count: 3 },
      { date: "2024-01-19", event: "Product viewed", product: "Green Lettuce", count: 18 },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">Track your store performance and insights</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalRevenue}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalOrders}</div>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.conversionRate}%</div>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>Your best-selling products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{product.orders} orders</span>
                          <span>{product.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{product.revenue}</div>
                      <Badge variant="secondary" className="text-xs">
                        Top Seller
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.event === "Product viewed" ? (
                        <Eye className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ShoppingCart className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.event}</span>
                        <Badge variant="outline" className="text-xs">
                          {activity.count}x
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.product}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
