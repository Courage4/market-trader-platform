"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Store,
  DollarSign,
  MapPin,
  Download,
  Filter,
  Activity,
  PieChart,
  LineChart,
} from "lucide-react"

export default function SuperAdminAnalytics() {
  const overallStats = [
    {
      title: "Total Platform Revenue",
      value: "$2,847,500",
      change: "+24.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      period: "Last 30 days",
    },
    {
      title: "Active Users Growth",
      value: "+3,247",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      period: "This month",
    },
    {
      title: "Transaction Volume",
      value: "47,892",
      change: "+15.8%",
      trend: "up",
      icon: Activity,
      color: "text-purple-600",
      period: "Last 30 days",
    },
    {
      title: "Market Adoption Rate",
      value: "89.2%",
      change: "+5.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      period: "Overall",
    },
  ]

  const regionalPerformance = [
    {
      region: "Greater Accra",
      users: 12450,
      vendors: 2890,
      revenue: 1250000,
      growth: 24.5,
      marketShare: 35.2,
      avgOrderValue: 45.8,
    },
    {
      region: "Ashanti",
      users: 8760,
      vendors: 1980,
      revenue: 890000,
      growth: 18.3,
      marketShare: 24.8,
      avgOrderValue: 52.3,
    },
    {
      region: "Western",
      users: 5420,
      vendors: 1240,
      revenue: 520000,
      growth: 12.1,
      marketShare: 14.6,
      avgOrderValue: 38.9,
    },
    {
      region: "Central",
      users: 4380,
      vendors: 980,
      revenue: 410000,
      growth: 15.7,
      marketShare: 11.5,
      avgOrderValue: 41.2,
    },
    {
      region: "Eastern",
      users: 3650,
      vendors: 820,
      revenue: 340000,
      growth: 9.8,
      marketShare: 9.6,
      avgOrderValue: 39.5,
    },
    {
      region: "Northern",
      users: 2890,
      vendors: 650,
      revenue: 280000,
      growth: 8.4,
      marketShare: 8.1,
      avgOrderValue: 35.7,
    },
  ]

  const categoryPerformance = [
    { category: "Fresh Produce", revenue: 1250000, orders: 28450, avgOrder: 43.9, growth: 22.1 },
    { category: "Grains & Staples", revenue: 890000, orders: 18760, avgOrder: 47.4, growth: 18.5 },
    { category: "Protein", revenue: 720000, orders: 12340, avgOrder: 58.3, growth: 15.2 },
    { category: "Prepared Foods", revenue: 560000, orders: 15670, avgOrder: 35.7, growth: 28.7 },
    { category: "Dairy & Beverages", revenue: 340000, orders: 9870, avgOrder: 34.5, growth: 12.8 },
  ]

  const timeSeriesData = [
    { period: "Jan", users: 8500, revenue: 185000, transactions: 3450 },
    { period: "Feb", users: 9200, revenue: 210000, transactions: 3890 },
    { period: "Mar", users: 10100, revenue: 245000, transactions: 4320 },
    { period: "Apr", users: 11400, revenue: 285000, transactions: 4750 },
    { period: "May", users: 12800, revenue: 325000, transactions: 5180 },
    { period: "Jun", users: 14200, revenue: 370000, transactions: 5620 },
    { period: "Jul", users: 15600, revenue: 420000, transactions: 6100 },
  ]

  const topMarkets = [
    { name: "Makola Market", users: 3450, vendors: 890, revenue: 450000, efficiency: 92.1 },
    { name: "Kejetia Market", users: 2890, vendors: 720, revenue: 380000, efficiency: 89.7 },
    { name: "Kaneshie Market", users: 2340, vendors: 650, revenue: 320000, efficiency: 88.4 },
    { name: "Tema Market", users: 1980, vendors: 540, revenue: 280000, efficiency: 86.2 },
    { name: "Takoradi Market", users: 1650, vendors: 450, revenue: 240000, efficiency: 85.1 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Advanced Analytics</h1>
                <p className="text-muted-foreground">Comprehensive platform insights and performance metrics</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="30days">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-2 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs {stat.period}</span>
                  </div>
                </CardContent>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 ${
                    stat.trend === "up" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </Card>
            )
          })}
        </div>

        {/* Regional Performance */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Regional Performance Analysis
                </CardTitle>
                <CardDescription>Detailed breakdown by region</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter Regions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Region</th>
                    <th className="text-center py-3 px-4">Users</th>
                    <th className="text-center py-3 px-4">Vendors</th>
                    <th className="text-center py-3 px-4">Revenue</th>
                    <th className="text-center py-3 px-4">Growth Rate</th>
                    <th className="text-center py-3 px-4">Market Share</th>
                    <th className="text-center py-3 px-4">Avg Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalPerformance.map((region, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{region.region}</td>
                      <td className="py-3 px-4 text-center">{region.users.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">{region.vendors.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">${region.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          +{region.growth}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">{region.marketShare}%</td>
                      <td className="py-3 px-4 text-center">${region.avgOrderValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                Category Performance
              </CardTitle>
              <CardDescription>Revenue breakdown by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryPerformance.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{category.category}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{category.orders.toLocaleString()} orders</span>
                        <span>Avg: ${category.avgOrder}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${category.revenue.toLocaleString()}</div>
                      <Badge variant="secondary" className="text-green-700 bg-green-100 text-xs">
                        +{category.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Markets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-orange-500" />
                Top Performing Markets
              </CardTitle>
              <CardDescription>Best performing markets by efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMarkets.map((market, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{market.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{market.users.toLocaleString()} users</span>
                          <span>{market.vendors} vendors</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${market.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{market.efficiency}% efficiency</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Growth Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-500" />
              Platform Growth Timeline
            </CardTitle>
            <CardDescription>Monthly growth trends across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Month</th>
                    <th className="text-center py-3 px-4">Total Users</th>
                    <th className="text-center py-3 px-4">Revenue</th>
                    <th className="text-center py-3 px-4">Transactions</th>
                    <th className="text-center py-3 px-4">Growth Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSeriesData.map((data, index) => {
                    const prevData = timeSeriesData[index - 1]
                    const growthRate = prevData
                      ? (((data.users - prevData.users) / prevData.users) * 100).toFixed(1)
                      : "0"

                    return (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{data.period} 2024</td>
                        <td className="py-3 px-4 text-center">{data.users.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">${data.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">{data.transactions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">
                          {prevData && (
                            <Badge variant="secondary" className="text-green-700 bg-green-100">
                              +{growthRate}%
                            </Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
