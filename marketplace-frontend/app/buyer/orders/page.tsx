"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Package,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Star,
  MessageCircle,
  RotateCcw,
  Eye,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react"

export default function BuyerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const { toast } = useToast()

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-22",
      vendor: "Fresh Fruits Ghana",
      vendorImage: "/placeholder.svg?height=40&width=40",
      items: [
        { name: "Fresh Bananas", quantity: 2, price: "GHS 8.00", image: "/placeholder.svg?height=60&width=60" },
        { name: "Sweet Oranges", quantity: 1, price: "GHS 15.00", image: "/placeholder.svg?height=60&width=60" },
      ],
      total: "GHS 31.00",
      status: "delivered",
      deliveryAddress: "123 Main St, Accra",
      paymentMethod: "Mobile Money",
      trackingNumber: "TRK123456",
      estimatedDelivery: "2024-01-23",
      actualDelivery: "2024-01-23",
      canReview: true,
      canReorder: true,
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      vendor: "Green Valley Farm",
      vendorImage: "/placeholder.svg?height=40&width=40",
      items: [
        { name: "Organic Tomatoes", quantity: 3, price: "GHS 12.00", image: "/placeholder.svg?height=60&width=60" },
      ],
      total: "GHS 36.00",
      status: "in_transit",
      deliveryAddress: "456 Oak Ave, Kumasi",
      paymentMethod: "Cash on Delivery",
      trackingNumber: "TRK789012",
      estimatedDelivery: "2024-01-22",
      canTrack: true,
    },
    {
      id: "ORD-003",
      date: "2024-01-18",
      vendor: "Tropical Delights",
      vendorImage: "/placeholder.svg?height=40&width=40",
      items: [
        { name: "Fresh Pineapples", quantity: 2, price: "GHS 6.00", image: "/placeholder.svg?height=60&width=60" },
        { name: "Coconuts", quantity: 4, price: "GHS 4.00", image: "/placeholder.svg?height=60&width=60" },
      ],
      total: "GHS 28.00",
      status: "processing",
      deliveryAddress: "789 Pine St, Takoradi",
      paymentMethod: "Mobile Money",
      estimatedDelivery: "2024-01-25",
    },
    {
      id: "ORD-004",
      date: "2024-01-15",
      vendor: "Fresh Fruits Ghana",
      vendorImage: "/placeholder.svg?height=40&width=40",
      items: [{ name: "Mangoes", quantity: 5, price: "GHS 3.00", image: "/placeholder.svg?height=60&width=60" }],
      total: "GHS 15.00",
      status: "cancelled",
      deliveryAddress: "123 Main St, Accra",
      paymentMethod: "Mobile Money",
      cancellationReason: "Out of stock",
      canReorder: true,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "in_transit":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "amount_high":
        return Number.parseFloat(b.total.replace("GHS ", "")) - Number.parseFloat(a.total.replace("GHS ", ""))
      case "amount_low":
        return Number.parseFloat(a.total.replace("GHS ", "")) - Number.parseFloat(b.total.replace("GHS ", ""))
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const ordersByStatus = {
    all: orders.length,
    processing: orders.filter((o) => o.status === "processing").length,
    in_transit: orders.filter((o) => o.status === "in_transit").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  const handleReorder = (orderId: string) => {
    toast({
      title: "Items Added to Cart",
      description: `Order ${orderId} items have been added to your cart.`,
    })
  }

  const handleTrackOrder = (trackingNumber: string) => {
    toast({
      title: "Tracking Order",
      description: `Redirecting to tracking page for ${trackingNumber}`,
    })
  }

  const handleContactVendor = (vendor: string) => {
    toast({
      title: "Contact Vendor",
      description: `Opening chat with ${vendor}`,
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Package className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Order Status Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center space-x-2">
            <span>All</span>
            <Badge variant="secondary" className="ml-1">
              {ordersByStatus.all}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Processing</span>
            <Badge variant="secondary" className="ml-1">
              {ordersByStatus.processing}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in_transit" className="flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>In Transit</span>
            <Badge variant="secondary" className="ml-1">
              {ordersByStatus.in_transit}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Delivered</span>
            <Badge variant="secondary" className="ml-1">
              {ordersByStatus.delivered}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center space-x-2">
            <XCircle className="w-4 h-4" />
            <span>Cancelled</span>
            <Badge variant="secondary" className="ml-1">
              {ordersByStatus.cancelled}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search orders, vendors, or products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="in_transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="amount_high">Highest Amount</SelectItem>
                      <SelectItem value="amount_low">Lowest Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {sortedOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                <Button>Start Shopping</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.vendorImage || "/placeholder.svg"}
                          alt={order.vendor}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{order.vendor}</CardTitle>
                          <CardDescription>Order #{order.id}</CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.status)} mb-2`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status.replace("_", " ")}</span>
                        </Badge>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-purple-600">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Delivery Address</p>
                          <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {order.status === "delivered" ? "Delivered" : "Expected Delivery"}
                          </p>
                          <p className="text-sm text-gray-600">{order.actualDelivery || order.estimatedDelivery}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Total and Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <p className="text-lg font-bold text-purple-600">Total: {order.total}</p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {order.canTrack && (
                          <Button variant="outline" size="sm" onClick={() => handleTrackOrder(order.trackingNumber!)}>
                            <Truck className="w-4 h-4 mr-2" />
                            Track
                          </Button>
                        )}

                        <Button variant="outline" size="sm" onClick={() => handleContactVendor(order.vendor)}>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact
                        </Button>

                        {order.canReview && (
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        )}

                        {order.canReorder && (
                          <Button size="sm" onClick={() => handleReorder(order.id)}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                        )}

                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>

                    {order.status === "cancelled" && order.cancellationReason && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Cancellation Reason:</strong> {order.cancellationReason}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
