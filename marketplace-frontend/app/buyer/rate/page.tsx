"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Star, Search, Filter, Package, Clock, CheckCircle, Camera, Upload, Trash2, Send } from "lucide-react"

export default function BuyerRatePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const { toast } = useToast()

  const [reviews, setReviews] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      vendor: "Fresh Fruits Ghana",
      vendorAvatar: "/placeholder.svg?height=40&width=40",
      product: "Fresh Bananas",
      productImage: "/placeholder.svg?height=60&width=60",
      orderDate: "2024-01-22",
      status: "pending",
      rating: 0,
      comment: "",
      photos: [],
    },
    {
      id: 2,
      orderId: "ORD-002",
      vendor: "Green Valley Farm",
      vendorAvatar: "/placeholder.svg?height=40&width=40",
      product: "Organic Tomatoes",
      productImage: "/placeholder.svg?height=60&width=60",
      orderDate: "2024-01-20",
      status: "completed",
      rating: 5,
      comment: "Excellent quality tomatoes! Very fresh and tasty. Will definitely order again.",
      photos: ["/placeholder.svg?height=100&width=100"],
      reviewDate: "2024-01-23",
    },
    {
      id: 3,
      orderId: "ORD-003",
      vendor: "Tropical Delights",
      vendorAvatar: "/placeholder.svg?height=40&width=40",
      product: "Fresh Pineapples",
      productImage: "/placeholder.svg?height=60&width=60",
      orderDate: "2024-01-18",
      status: "pending",
      rating: 0,
      comment: "",
      photos: [],
    },
    {
      id: 4,
      orderId: "ORD-004",
      vendor: "Fresh Fruits Ghana",
      vendorAvatar: "/placeholder.svg?height=40&width=40",
      product: "Sweet Oranges",
      productImage: "/placeholder.svg?height=60&width=60",
      orderDate: "2024-01-15",
      status: "completed",
      rating: 4,
      comment: "Good quality oranges, sweet and juicy. Delivery was on time.",
      photos: [],
      reviewDate: "2024-01-18",
    },
  ])

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterBy === "all" || review.status === filterBy
    return matchesSearch && matchesFilter
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      case "rating_high":
        return b.rating - a.rating
      case "rating_low":
        return a.rating - b.rating
      case "recent":
      default:
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
    }
  })

  const updateReview = (id: number, field: string, value: any) => {
    setReviews(reviews.map((review) => (review.id === id ? { ...review, [field]: value } : review)))
  }

  const submitReview = (id: number) => {
    const review = reviews.find((r) => r.id === id)
    if (!review || review.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, status: "completed", reviewDate: new Date().toISOString().split("T")[0] } : r,
      ),
    )

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    })
  }

  const addPhoto = (id: number) => {
    // Simulate photo upload
    const newPhoto = "/placeholder.svg?height=100&width=100"
    const review = reviews.find((r) => r.id === id)
    if (review && review.photos.length < 5) {
      updateReview(id, "photos", [...review.photos, newPhoto])
      toast({
        title: "Photo Added",
        description: "Photo has been added to your review.",
      })
    }
  }

  const removePhoto = (reviewId: number, photoIndex: number) => {
    const review = reviews.find((r) => r.id === reviewId)
    if (review) {
      const newPhotos = review.photos.filter((_, index) => index !== photoIndex)
      updateReview(reviewId, "photos", newPhotos)
    }
  }

  const StarRating = ({
    rating,
    onRatingChange,
    readonly = false,
  }: {
    rating: number
    onRatingChange?: (rating: number) => void
    readonly?: boolean
  }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onRatingChange?.(star)}
            className={`${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"} transition-transform`}
          >
            <Star className={`w-6 h-6 ${star <= rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Star className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold">Rate & Review</h1>
        </div>
        <p className="text-gray-600">Share your experience with products and vendors</p>
      </div>

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
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="rating_high">Highest Rating</SelectItem>
                  <SelectItem value="rating_low">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      {sortedReviews.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterBy !== "all"
                ? "Try adjusting your search or filters"
                : "Complete some orders to start reviewing"}
            </p>
            <Button>Browse Products</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.vendorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{review.vendor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{review.vendor}</CardTitle>
                      <CardDescription>Order #{review.orderId}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        review.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {review.status === "completed" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Reviewed
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Review
                        </>
                      )}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered: {new Date(review.orderDate).toLocaleDateString()}
                    </p>
                    {review.reviewDate && (
                      <p className="text-sm text-gray-500">
                        Reviewed: {new Date(review.reviewDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Product Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={review.productImage || "/placeholder.svg"}
                    alt={review.product}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{review.product}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Product</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Your Rating</h4>
                    {review.status === "completed" && (
                      <span className="text-sm text-gray-500">{review.rating}/5 stars</span>
                    )}
                  </div>
                  <StarRating
                    rating={review.rating}
                    onRatingChange={(rating) => updateReview(review.id, "rating", rating)}
                    readonly={review.status === "completed"}
                  />
                </div>

                {/* Comment */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Your Review</h4>
                  {review.status === "completed" ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{review.comment || "No comment provided"}</p>
                    </div>
                  ) : (
                    <Textarea
                      placeholder="Share your experience with this product..."
                      value={review.comment}
                      onChange={(e) => updateReview(review.id, "comment", e.target.value)}
                      rows={4}
                    />
                  )}
                </div>

                {/* Photos */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Photos (Optional)</h4>
                    {review.status === "pending" && review.photos.length < 5 && (
                      <Button variant="outline" size="sm" onClick={() => addPhoto(review.id)}>
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                    )}
                  </div>

                  {review.photos.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {review.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Review photo ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          {review.status === "pending" && (
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removePhoto(review.id, index)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {review.photos.length === 0 && review.status === "pending" && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Add photos to help other buyers</p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                {review.status === "pending" && (
                  <div className="flex justify-end pt-4 border-t">
                    <Button onClick={() => submitReview(review.id)} disabled={review.rating === 0}>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
