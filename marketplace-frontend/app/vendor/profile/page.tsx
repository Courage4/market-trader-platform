"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Package,
  TrendingUp,
  Award,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Edit,
  Camera,
  Verified,
  Truck,
} from "lucide-react"

export default function VendorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const vendorData = {
    id: "vendor-001",
    businessName: "Fresh Fruits Ghana",
    ownerName: "John Doe",
    email: "vendor@demo.com",
    phone: "+233 24 123 4567",
    address: "Accra Central Market, Stall 45",
    description:
      "We provide fresh fruits and vegetables daily sourced from local farms. Quality guaranteed with competitive prices.",
    avatar: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=300&width=800",
    rating: 4.8,
    totalReviews: 156,
    totalProducts: 45,
    totalOrders: 1234,
    joinDate: "2023-01-15",
    verified: true,
    businessType: "Retail",
    deliveryRadius: "10 km",
    operatingHours: "6:00 AM - 6:00 PM",
    responseTime: "Within 2 hours",
    completionRate: 98,
    followers: 234,
    profileViews: 1567,
  }

  const recentProducts = [
    {
      id: 1,
      name: "Fresh Bananas",
      price: "GHS 8.00",
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      views: 45,
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      price: "GHS 12.00",
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      views: 32,
    },
    {
      id: 3,
      name: "Sweet Oranges",
      price: "GHS 15.00",
      image: "/placeholder.svg?height=80&width=80",
      status: "pending",
      views: 28,
    },
  ]

  const recentReviews = [
    {
      id: 1,
      customer: "Mary A.",
      rating: 5,
      comment: "Excellent quality fruits! Always fresh and reasonably priced.",
      date: "2024-01-20",
      product: "Fresh Bananas",
    },
    {
      id: 2,
      customer: "James K.",
      rating: 4,
      comment: "Good service and quick delivery. Will order again.",
      date: "2024-01-18",
      product: "Organic Tomatoes",
    },
    {
      id: 3,
      customer: "Sarah M.",
      rating: 5,
      comment: "Best vendor in the market! Highly recommended.",
      date: "2024-01-15",
      product: "Sweet Oranges",
    },
  ]

  const achievements = [
    {
      title: "Top Rated Vendor",
      description: "Maintained 4.5+ rating for 6 months",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Fast Responder",
      description: "Responds to messages within 2 hours",
      icon: MessageCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Reliable Seller",
      description: "98% order completion rate",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Popular Store",
      description: "Over 200 followers",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ]

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Cover Image and Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg overflow-hidden">
          <img src={vendorData.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Save" : "Edit Profile"}
            </Button>
          </div>
        </div>

        <div className="relative -mt-16 ml-8">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={vendorData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 text-2xl">
                    <span>{vendorData.businessName}</span>
                    {vendorData.verified && <Verified className="w-6 h-6 text-blue-500" />}
                  </CardTitle>
                  <CardDescription className="text-lg">Owned by {vendorData.ownerName}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  {vendorData.businessType}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{vendorData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vendorData.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{vendorData.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{vendorData.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{vendorData.operatingHours}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Delivers within {vendorData.deliveryRadius}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(vendorData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{vendorData.rating}</span>
                  <span className="text-gray-500">({vendorData.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{vendorData.profileViews} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{vendorData.followers} followers</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                      <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Recent Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-purple-600 font-medium">{product.price}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={product.status === "active" ? "default" : "secondary"}
                        className={product.status === "active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {product.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{product.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats and Reviews */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{vendorData.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{vendorData.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{vendorData.completionRate}%</span>
                </div>
                <Progress value={vendorData.completionRate} className="h-2" />
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-600">Response Time</div>
                <div className="text-xs text-gray-600">{vendorData.responseTime}</div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Recent Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{review.customer}</div>
                      <div className="text-sm text-gray-500">{review.product}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  <div className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Vendor
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
