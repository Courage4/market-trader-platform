"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers"
import {
  Users,
  Store,
  AlertTriangle,
  TrendingUp,
  Globe,
  Shield,
  Settings,
  Database,
  Activity,
  DollarSign,
  MapPin,
  BarChart3,
  UserCheck,
  Server,
  Zap,
} from "lucide-react"

export default function SuperAdminDashboard() {
  const { user } = useAuth()

  const systemStats = [
    {
      title: "Total Platform Users",
      value: "15,847",
      change: "+18% from last month",
      icon: Users,
      color: "text-blue-600",
      trend: "up",
    },
    {
      title: "Active Markets",
      value: "52",
      change: "Across 16 regions",
      icon: MapPin,
      color: "text-green-600",
      trend: "stable",
    },
    {
      title: "System Revenue",
      value: "$284,500",
      change: "+24% from last month",
      icon: DollarSign,
      color: "text-purple-600",
      trend: "up",
    },
    {
      title: "Critical Alerts",
      value: "7",
      change: "3 require immediate attention",
      icon: AlertTriangle,
      color: "text-red-600",
      trend: "down",
    },
  ]

  const regionalStats = [
    { region: "Greater Accra", users: 4521, vendors: 892, transactions: 15420, growth: "+15%" },
    { region: "Ashanti", users: 3214, vendors: 678, transactions: 11230, growth: "+12%" },
    { region: "Western", users: 2103, vendors: 445, transactions: 7890, growth: "+8%" },
    { region: "Central", users: 1876, vendors: 398, transactions: 6540, growth: "+10%" },
    { region: "Eastern", users: 1654, vendors: 342, transactions: 5670, growth: "+6%" },
  ]

  const systemHealth = [
    { metric: "Server Uptime", value: 99.98, status: "excellent", color: "bg-green-500" },
    { metric: "Database Performance", value: 97.2, status: "excellent", color: "bg-green-500" },
    { metric: "API Response Time", value: 92.5, status: "good", color: "bg-blue-500" },
    { metric: "Payment Gateway", value: 99.1, status: "excellent", color: "bg-green-500" },
    { metric: "Mobile App Performance", value: 89.3, status: "good", color: "bg-blue-500" },
    { metric: "User Satisfaction", value: 94.7, status: "excellent", color: "bg-green-500" },
  ]

  const criticalAlerts = [
    {
      id: 1,
      type: "security",
      title: "Multiple Failed Login Attempts",
      description: "User account: vendor_12345 has 15 failed login attempts",
      priority: "high",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "system",
      title: "Database Connection Spike",
      description: "Unusual database connection pattern detected",
      priority: "medium",
      time: "12 minutes ago",
    },
    {
      id: 3,
      type: "financial",
      title: "Payment Processing Delay",
      description: "Payment gateway response time increased by 300%",
      priority: "high",
      time: "18 minutes ago",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_management",
      message: "Bulk user verification completed for Tamale region",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: 2,
      type: "system_update",
      message: "Platform security patch deployed successfully",
      time: "3 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "market_expansion",
      message: "New market integration: Techiman Market approved",
      time: "5 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "policy_update",
      message: "Terms of Service updated - vendor notification sent",
      time: "8 hours ago",
      status: "completed",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_management":
        return <UserCheck className="h-4 w-4" />
      case "system_update":
        return <Settings className="h-4 w-4" />
      case "market_expansion":
        return <Store className="h-4 w-4" />
      case "policy_update":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-muted-foreground">Complete system oversight and management</p>
            </div>
          </div>
          <Badge variant="outline" className="border-purple-200 text-purple-700">
            <Globe className="h-3 w-3 mr-1" />
            System-wide Access
          </Badge>
        </div>

        {/* System Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {stat.change}
                  </p>
                </CardContent>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 ${
                    stat.trend === "up" ? "bg-green-500" : stat.trend === "down" ? "bg-red-500" : "bg-blue-500"
                  }`}
                />
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Critical Alerts */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Critical System Alerts
                  </CardTitle>
                  <CardDescription>Immediate attention required</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Alerts
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 p-4 border border-red-200 rounded-lg bg-red-50/50"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
              <CardDescription>Real-time system metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
        </div>

        {/* Regional Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Regional Performance Overview
            </CardTitle>
            <CardDescription>Performance metrics across all regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Region</th>
                    <th className="text-center py-2 px-4">Users</th>
                    <th className="text-center py-2 px-4">Vendors</th>
                    <th className="text-center py-2 px-4">Transactions</th>
                    <th className="text-center py-2 px-4">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalStats.map((region, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{region.region}</td>
                      <td className="py-3 px-4 text-center">{region.users.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{region.vendors.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{region.transactions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {region.growth}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent System Activities */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Recent System Activities
                </CardTitle>
                <CardDescription>Latest system-wide activities and changes</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Activity Log
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Super Admin Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Super Admin Quick Actions
            </CardTitle>
            <CardDescription>System-wide administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
              >
                <Users className="h-6 w-6" />
                <span className="text-xs">User Management</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
              >
                <Store className="h-6 w-6" />
                <span className="text-xs">Market Control</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200"
              >
                <Shield className="h-6 w-6" />
                <span className="text-xs">Security Center</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-red-50 to-red-100 hover:from-red-100 hover:to-red-200"
              >
                <Database className="h-6 w-6" />
                <span className="text-xs">System Config</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200"
              >
                <BarChart3 className="h-6 w-6" />
                <span className="text-xs">Analytics</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-gradient-to-b from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200"
              >
                <Server className="h-6 w-6" />
                <span className="text-xs">Server Status</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
