"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  Star,
  Search,
  Heart,
  Bell,
  User,
  Settings,
  TrendingUp,
  Truck,
  Eye,
  MoreHorizontal,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const recentOrders = [
  {
    id: "ORD-001",
    vendor: "Kumasi Central Market",
    items: ["Fresh Tomatoes", "Onions", "Pepper"],
    total: "GHS 45.50",
    status: "delivered",
    date: "2024-01-15",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-002",
    vendor: "Accra Fish Market",
    items: ["Fresh Tilapia", "Prawns"],
    total: "GHS 78.00",
    status: "in-transit",
    date: "2024-01-14",
    rating: null,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-003",
    vendor: "Tema Fruit Hub",
    items: ["Pineapple", "Mangoes", "Oranges"],
    total: "GHS 32.75",
    status: "processing",
    date: "2024-01-13",
    rating: null,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const favoriteVendors = [
  {
    name: "Kumasi Central Market",
    category: "Vegetables & Fruits",
    rating: 4.8,
    orders: 12,
    image: "/placeholder.svg?height=80&width=80",
    badge: "Trusted",
  },
  {
    name: "Accra Fish Market",
    category: "Fresh Seafood",
    rating: 4.9,
    orders: 8,
    image: "/placeholder.svg?height=80&width=80",
    badge: "Premium",
  },
  {
    name: "Tema Fruit Hub",
    category: "Tropical Fruits",
    rating: 4.7,
    orders: 15,
    image: "/placeholder.svg?height=80&width=80",
    badge: "Popular",
  },
]

const recommendations = [
  {
    name: "Organic Plantain",
    vendor: "Accra Organic Farm",
    price: "GHS 12.00",
    originalPrice: "GHS 15.00",
    rating: 4.9,
    image: "/placeholder.svg?height=120&width=120",
    badge: "20% Off",
    badgeColor: "bg-purple-500",
  },
  {
    name: "Fresh Yam",
    vendor: "Kumasi Yam Market",
    price: "GHS 8.50",
    originalPrice: null,
    rating: 4.6,
    image: "/placeholder.svg?height=120&width=120",
    badge: "Fresh",
    badgeColor: "bg-purple-400",
  },
  {
    name: "Palm Oil",
    vendor: "Eastern Region Oils",
    price: "GHS 25.00",
    originalPrice: "GHS 30.00",
    rating: 4.8,
    image: "/placeholder.svg?height=120&width=120",
    badge: "Best Seller",
    badgeColor: "bg-purple-600",
  },
]

const stats = [
  {
    title: "Total Orders",
    value: "24",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Favorite Vendors",
    value: "8",
    change: "+2",
    icon: Heart,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Total Spent",
    value: "GHS 1,245",
    change: "+8%",
    icon: TrendingUp,
    color: "text-purple-700",
    bgColor: "bg-purple-200",
  },
  {
    title: "Saved Amount",
    value: "GHS 156",
    change: "+15%",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-100",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-purple-100 text-purple-800"
    case "in-transit":
      return "bg-purple-200 text-purple-900"
    case "processing":
      return "bg-purple-300 text-purple-900"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return CheckCircle
    case "in-transit":
      return Truck
    case "processing":
      return Clock
    default:
      return Package
  }
}

export default function BuyerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold gradient-text">
                MarketPlace Ghana
              </Link>
              <Badge className="bg-purple-100 text-purple-800">Buyer</Badge>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                <Input
                  placeholder="Search products, vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-modern"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-purple-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full text-xs"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Package className="w-4 h-4 mr-2" />
                    Order History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="gradient-text">John!</span>
              </h1>
              <p className="text-gray-600">Here's what's happening with your orders today.</p>
            </div>
            <Link href="/buyer/products">
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="modern-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-purple-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <Card className="modern-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2 text-purple-600" />
                      Recent Orders
                    </CardTitle>
                    <CardDescription>Track your latest purchases</CardDescription>
                  </div>
                  <Link href="/buyer/orders">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <div key={order.id} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt="Order"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{order.vendor}</h4>
                          <Badge className={getStatusColor(order.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.items.join(", ")}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-purple-600">{order.total}</span>
                          <div className="flex items-center space-x-2">
                            {order.rating && (
                              <div className="flex items-center">
                                {[...Array(order.rating)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-purple-400 text-purple-400" />
                                ))}
                              </div>
                            )}
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="w-4 h-4 mr-2" />
                            Track Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                  Recommended for You
                </CardTitle>
                <CardDescription>Based on your purchase history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {recommendations.map((product, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative bg-purple-50 rounded-xl p-4 mb-3 group-hover:bg-purple-100 transition-colors">
                        <Badge className={`absolute top-2 right-2 ${product.badgeColor} text-white`}>
                          {product.badge}
                        </Badge>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-24 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-600">{product.vendor}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-purple-600">{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                              <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/buyer/products">
                  <Button className="w-full justify-start btn-light">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/buyer/orders">
                  <Button className="w-full justify-start btn-light">
                    <Package className="w-4 h-4 mr-2" />
                    View Orders
                  </Button>
                </Link>
                <Link href="/buyer/favorites">
                  <Button className="w-full justify-start btn-light">
                    <Heart className="w-4 h-4 mr-2" />
                    Favorites
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Favorite Vendors */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Heart className="w-5 h-5 mr-2 text-purple-600" />
                  Favorite Vendors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {favoriteVendors.map((vendor, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={vendor.image || "/placeholder.svg"}
                      alt={vendor.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-gray-900">{vendor.name}</h4>
                        <Badge className="bg-purple-200 text-purple-800 text-xs">{vendor.badge}</Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{vendor.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                          <span className="text-xs text-gray-600 ml-1">{vendor.rating}</span>
                        </div>
                        <span className="text-xs text-purple-600">{vendor.orders} orders</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Progress */}
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-lg">This Month's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Orders Goal</span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Savings Goal</span>
                    <span className="font-semibold">GHS 156/200</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
