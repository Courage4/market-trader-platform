"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Package,
  DollarSign,
  Eye,
  Plus,
  MessageCircle,
  Star,
  MapPin,
  Send,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Clock,
} from "lucide-react"

export default function VendorDashboard() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)

  const stats = [
    {
      title: "Total Products",
      value: "24",
      change: "+2 this week",
      icon: Package,
      bgColor: "bg-purple-600",
      textColor: "text-purple-700",
    },
    {
      title: "Total Revenue",
      value: "₵12,960",
      change: "+12% from last month",
      icon: DollarSign,
      bgColor: "bg-purple-500",
      textColor: "text-purple-700",
    },
    {
      title: "Profile Views",
      value: "1,847",
      change: "+5% this week",
      icon: Eye,
      bgColor: "bg-purple-700",
      textColor: "text-purple-700",
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "128 reviews",
      icon: Star,
      bgColor: "bg-purple-800",
      textColor: "text-purple-700",
    },
  ]

  const recentProducts = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: "₵14.00/kg",
      stock: 45,
      status: "active",
      views: 234,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Organic Carrots",
      price: "₵11.20/kg",
      stock: 12,
      status: "low_stock",
      views: 156,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Green Lettuce",
      price: "₵4.80/head",
      stock: 0,
      status: "out_of_stock",
      views: 89,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const recentMessages = [
    {
      id: 1,
      buyer: "Sarah Johnson",
      message: "Hi, are your tomatoes still available?",
      time: "2 hours ago",
      unread: true,
      buyerEmail: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      buyer: "Mike Chen",
      message: "Can you deliver to downtown area?",
      time: "5 hours ago",
      unread: false,
      buyerEmail: "mike@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      buyer: "Emma Davis",
      message: "Thank you for the fresh vegetables!",
      time: "1 day ago",
      unread: false,
      buyerEmail: "emma@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleEditProduct = (productId: number) => {
    router.push(`/vendor/products/edit/${productId}`)
  }

  const handleViewAllProducts = () => {
    router.push("/vendor/products")
  }

  const handleViewAllMessages = () => {
    router.push("/vendor/messages")
  }

  const handleReplyToMessage = (message: any) => {
    setSelectedMessage(message)
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message",
        variant: "destructive",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reply Sent",
        description: `Your reply has been sent to ${selectedMessage.buyer}`,
      })

      setIsReplyDialogOpen(false)
      setReplyText("")
      setSelectedMessage(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleViewAnalytics = () => {
    router.push("/vendor/analytics")
  }

  const handleMessageCenter = () => {
    router.push("/vendor/messages")
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Active" },
      low_stock: { color: "bg-purple-200 text-purple-900 border-purple-300", label: "Low Stock" },
      out_of_stock: { color: "bg-purple-300 text-purple-900 border-purple-400", label: "Out of Stock" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active

    return <Badge className={`${config.color} border font-medium px-2 py-1 rounded-full text-xs`}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold gradient-text">Welcome back, {user?.name}!</h1>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-lg text-purple-600">Here's what's happening with your store today.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/vendor/add-product">
              <Button className="btn-primary">
                <Plus className="mr-2 h-5 w-5" />
                Add Product
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Update Location
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="modern-card group hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.bgColor} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-purple-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-purple-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-purple-900">{stat.value}</p>
                    <p className="text-sm text-purple-600 font-medium">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Products */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    Recent Products
                  </CardTitle>
                  <CardDescription className="text-purple-600">Your latest product listings</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewAllProducts}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                >
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-purple-900 truncate">{product.name}</h4>
                        {getStatusBadge(product.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-600">
                        <span className="font-medium">{product.price}</span>
                        <span>Stock: {product.stock}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {product.views}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProduct(product.id)}
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-xl"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                    Recent Messages
                  </CardTitle>
                  <CardDescription className="text-purple-600">Messages from potential buyers</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewAllMessages}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 p-4 bg-purple-50 rounded-2xl border border-purple-100 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={message.avatar || "/placeholder.svg"}
                      alt={message.buyer}
                      className="w-10 h-10 rounded-full ring-2 ring-purple-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-purple-900 text-sm">{message.buyer}</p>
                        {message.unread && (
                          <Badge className="bg-purple-600 text-white border-0 text-xs px-2 py-0.5 rounded-full">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-purple-700 mb-2 line-clamp-2">{message.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-purple-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {message.time}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-purple-200 text-purple-700 hover:bg-purple-100 rounded-lg bg-white"
                          onClick={() => handleReplyToMessage(message)}
                        >
                          <Send className="mr-1 h-3 w-3" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 modern-card">
          <CardHeader>
            <CardTitle className="text-xl text-purple-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-purple-600">Common tasks to manage your store efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/vendor/add-product">
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col gap-3 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="p-2 bg-purple-600 rounded-xl">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold">Add New Product</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full h-24 flex flex-col gap-3 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={handleViewAnalytics}
              >
                <div className="p-2 bg-purple-500 rounded-xl">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold">View Analytics</span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-24 flex flex-col gap-3 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                onClick={handleMessageCenter}
              >
                <div className="p-2 bg-purple-700 rounded-xl">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold">Message Center</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white border-purple-200 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-purple-900 flex items-center gap-2">
                <Send className="h-5 w-5 text-purple-600" />
                Reply to {selectedMessage?.buyer}
              </DialogTitle>
              <DialogDescription className="text-purple-600">
                Replying to: "{selectedMessage?.message}"
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-purple-900">Your Reply</label>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  className="bg-purple-50 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-purple-400 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleSendReply} className="btn-primary flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsReplyDialogOpen(false)}
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
