"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers"
import { Users, Store, Package, AlertTriangle, TrendingUp, Eye, MessageCircle, Shield, Activity } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Vendors",
      value: "342",
      change: "+8% from last month",
      icon: Store,
      color: "text-green-600",
    },
    {
      title: "Total Products",
      value: "5,234",
      change: "+15% from last month",
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: "Pending Complaints",
      value: "23",
      change: "5 urgent",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      message: 'New vendor "Fresh Market Co." registered',
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "complaint",
      message: 'Complaint filed against "Green Valley Produce"',
      time: "4 hours ago",
      status: "urgent",
    },
    {
      id: 3,
      type: "product_report",
      message: 'Product "Organic Tomatoes" reported for quality issues',
      time: "6 hours ago",
      status: "review",
    },
    {
      id: 4,
      type: "user_verification",
      message: 'Vendor "Local Bakery" verification completed',
      time: "1 day ago",
      status: "completed",
    },
  ]

  const topVendors = [
    {
      id: 1,
      name: "Fresh Farm Market",
      products: 45,
      rating: 4.8,
      revenue: 2340,
      status: "verified",
    },
    {
      id: 2,
      name: "Green Valley Produce",
      products: 32,
      rating: 4.6,
      revenue: 1890,
      status: "verified",
    },
    {
      id: 3,
      name: "Local Bakery",
      products: 18,
      rating: 4.9,
      revenue: 1560,
      status: "pending",
    },
  ]

  const systemHealth = [
    { metric: "Server Uptime", value: 99.9, status: "excellent" },
    { metric: "Database Performance", value: 95.2, status: "good" },
    { metric: "API Response Time", value: 87.5, status: "good" },
    { metric: "User Satisfaction", value: 92.1, status: "excellent" },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4" />
      case "complaint":
        return <AlertTriangle className="h-4 w-4" />
      case "product_report":
        return <Package className="h-4 w-4" />
      case "user_verification":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "review":
        return <Badge variant="outline">Review</Badge>
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Verified
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage the MarketPlace platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities and alerts</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Vendors */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Top Vendors</CardTitle>
                  <CardDescription>Best performing vendors this month</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVendors.map((vendor, index) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{vendor.name}</h4>
                          {getStatusBadge(vendor.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{vendor.products} products</span>
                          <span>★ {vendor.rating}</span>
                          <span>${vendor.revenue} revenue</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance and health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemHealth.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-muted-foreground">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                  <div className="flex justify-end">
                    <Badge variant={metric.status === "excellent" ? "default" : "secondary"} className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span className="text-xs">Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Store className="h-6 w-6" />
                <span className="text-xs">Vendor Approval</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Package className="h-6 w-6" />
                <span className="text-xs">Product Review</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-xs">Handle Complaints</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span className="text-xs">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <MessageCircle className="h-6 w-6" />
                <span className="text-xs">Announcements</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
