"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PROMOTION_PLANS } from "@/lib/promotion-types"
import {
  TrendingUp,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Star,
  Plus,
  Calendar,
  Zap,
} from "lucide-react"

export default function SuperAdminPromotions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)

  const promotionStats = {
    totalPromotions: 1247,
    activePromotions: 342,
    totalRevenue: 28450.75,
    averageBoost: 285,
  }

  const activePromotions = [
    {
      id: "1",
      productName: "Fresh Organic Tomatoes",
      vendorName: "Fresh Farm Market",
      vendorId: "vendor_123",
      planName: "Monthly Pro",
      planId: "monthly",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-02-15"),
      status: "active",
      totalCost: 19.99,
      views: 2847,
      clicks: 456,
      conversions: 23,
      revenue: 287.5,
    },
    {
      id: "2",
      productName: "Sweet Red Apples",
      vendorName: "Green Valley Produce",
      vendorId: "vendor_456",
      planName: "Weekly Boost",
      planId: "weekly",
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-01-27"),
      status: "active",
      totalCost: 5.99,
      views: 1234,
      clicks: 189,
      conversions: 12,
      revenue: 156.8,
    },
    {
      id: "3",
      productName: "Organic Carrots",
      vendorName: "Fresh Farm Market",
      vendorId: "vendor_123",
      planName: "Quarterly Premium",
      planId: "quarterly",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2024-03-01"),
      status: "active",
      totalCost: 49.99,
      views: 4521,
      clicks: 678,
      conversions: 45,
      revenue: 567.25,
    },
    {
      id: "4",
      productName: "Fresh Bread",
      vendorName: "Local Bakery",
      vendorId: "vendor_789",
      planName: "Monthly Pro",
      planId: "monthly",
      startDate: new Date("2024-01-10"),
      endDate: new Date("2024-01-25"),
      status: "expired",
      totalCost: 19.99,
      views: 1876,
      clicks: 234,
      conversions: 18,
      revenue: 198.45,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "expired":
        return <Badge variant="secondary">Expired</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-700">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRemainingDays = (endDate: Date) => {
    const now = new Date()
    const remaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, remaining)
  }

  const filteredPromotions = activePromotions.filter((promotion) => {
    const matchesSearch =
      promotion.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter
    const matchesPlan = planFilter === "all" || promotion.planId === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Promotion Management</h1>
                <p className="text-muted-foreground">Manage promotion plans and monitor vendor promotions</p>
              </div>
            </div>
            <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Promotion Plan</DialogTitle>
                  <DialogDescription>Add a new promotion plan for vendors</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input id="planName" placeholder="e.g., Premium Monthly" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days)</Label>
                      <Input id="duration" type="number" placeholder="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" step="0.01" placeholder="19.99" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="features">Features</Label>
                    <Textarea id="features" placeholder="List features separated by commas" rows={3} />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1">Create Plan</Button>
                    <Button variant="outline" onClick={() => setIsCreatePlanOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotionStats.totalPromotions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotionStats.activePromotions}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${promotionStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From promotions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Boost</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{promotionStats.averageBoost}%</div>
              <p className="text-xs text-muted-foreground">In product visibility</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search promotions by product or vendor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Plans" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    {PROMOTION_PLANS.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Promotions Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Promotions ({filteredPromotions.length})</CardTitle>
                <CardDescription>Monitor and manage vendor promotions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product & Vendor</th>
                    <th className="text-center py-3 px-4">Plan</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Duration</th>
                    <th className="text-center py-3 px-4">Performance</th>
                    <th className="text-center py-3 px-4">Revenue</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPromotions.map((promotion) => (
                    <tr key={promotion.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{promotion.productName}</div>
                          <div className="text-sm text-muted-foreground">{promotion.vendorName}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline">{promotion.planName}</Badge>
                      </td>

                      <td className="py-4 px-4 text-center">{getStatusBadge(promotion.status)}</td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {promotion.status === "active"
                              ? `${getRemainingDays(promotion.endDate)} days left`
                              : "Ended"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {promotion.startDate.toLocaleDateString()} - {promotion.endDate.toLocaleDateString()}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-center gap-4">
                            <span>{promotion.views.toLocaleString()} views</span>
                            <span>{promotion.clicks} clicks</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{promotion.conversions} conversions</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1">
                          <div className="font-medium">${promotion.revenue.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">Cost: ${promotion.totalCost}</div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Promotion
                            </DropdownMenuItem>
                            {promotion.status === "active" && (
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Extend Duration
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Promotion
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPromotions.length === 0 && (
              <div className="py-12 text-center">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No promotions found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promotion Plans Management */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Available Promotion Plans</CardTitle>
            <CardDescription>Manage promotion plans available to vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROMOTION_PLANS.map((plan) => (
                <Card key={plan.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      {plan.popular && (
                        <Badge variant="default" className="bg-primary">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.duration} days</span>
                      </div>
                      {plan.discount && (
                        <Badge variant="secondary" className="text-green-700 bg-green-100">
                          {plan.discount}% OFF
                        </Badge>
                      )}
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
