"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Heart, ShoppingCart, MapPin, Star, Phone, MessageCircle, Eye, Sparkles } from "lucide-react"

const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export default function BuyerProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [showFilters, setShowFilters] = useState(false)
  const [marketFilter, setMarketFilter] = useState("all")

  const products = [
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      vendor: "Fresh Farm Market",
      vendorId: 1,
      price: 14.0,
      unit: "kg",
      category: "vegetables",
      market: "makola-market",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 24,
      distance: "0.5 km",
      stock: 45,
      description: "Fresh, locally grown organic tomatoes",
      tags: ["organic", "fresh", "local"],
      negotiable: true,
      deliveryAvailable: true,
      promoted: true,
      promotionType: "featured",
    },
    {
      id: 2,
      name: "Sweet Red Apples",
      vendor: "Green Valley Produce",
      vendorId: 2,
      price: 16.8,
      unit: "kg",
      category: "fruits",
      market: "kaneshie-market",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 18,
      distance: "1.2 km",
      stock: 67,
      description: "Crisp and sweet red apples",
      tags: ["sweet", "fresh"],
      negotiable: false,
      deliveryAvailable: true,
      promoted: true,
      promotionType: "premium",
    },
    {
      id: 3,
      name: "Fresh Bread Loaves",
      vendor: "Local Bakery",
      vendorId: 3,
      price: 10.0,
      unit: "piece",
      category: "bakery",
      market: "kejetia-market",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 32,
      distance: "0.8 km",
      stock: 12,
      description: "Freshly baked bread, made daily",
      tags: ["fresh", "daily"],
      negotiable: false,
      deliveryAvailable: false,
      promoted: false,
    },
    {
      id: 4,
      name: "Organic Carrots",
      vendor: "Fresh Farm Market",
      vendorId: 1,
      price: 11.2,
      unit: "kg",
      category: "vegetables",
      market: "makola-market",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 15,
      distance: "0.5 km",
      stock: 23,
      description: "Organic carrots from local farm",
      tags: ["organic", "local"],
      negotiable: true,
      deliveryAvailable: true,
      promoted: false,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "dairy", label: "Dairy" },
    { value: "bakery", label: "Bakery" },
    { value: "meat", label: "Meat & Poultry" },
  ]

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "distance", label: "Nearest First" },
  ]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesMarket = marketFilter === "all" || product.market === marketFilter

      return matchesSearch && matchesCategory && matchesPrice && matchesMarket
    })
    .sort((a, b) => {
      if (a.promoted && !b.promoted) return -1
      if (!a.promoted && b.promoted) return 1

      switch (sortBy) {
        case "price_low":
          return a.price - b.price
        case "price_high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default:
          return 0
      }
    })

  const getPromotionBadge = (promotionType: string) => {
    const promotionConfig = {
      featured: { color: "bg-purple-600", label: "Featured" },
      premium: { color: "bg-purple-500", label: "Premium" },
    }

    const config = promotionConfig[promotionType as keyof typeof promotionConfig] || promotionConfig.featured

    return (
      <Badge className={`${config.color} text-white border-0 font-medium px-2 py-1 rounded-full text-xs shadow-lg`}>
        <Sparkles className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold gradient-text">Browse Products</h1>
          </div>
          <p className="text-lg text-purple-600 max-w-2xl mx-auto">
            Discover fresh products from local vendors in your area with our modern marketplace
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <Card className="modern-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
                    <Input
                      placeholder="Search products, vendors, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 bg-purple-50 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] h-12 bg-white border-purple-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-purple-200 rounded-xl">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value} className="rounded-lg">
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={marketFilter} onValueChange={setMarketFilter}>
                    <SelectTrigger className="w-[200px] h-12 bg-white border-purple-200 rounded-xl">
                      <SelectValue placeholder="Filter by market" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white border-purple-200 rounded-xl">
                      <SelectItem value="all" className="rounded-lg">
                        All Markets
                      </SelectItem>
                      {ghanaMarkets.map((market) => (
                        <SelectItem key={market.value} value={market.value} className="rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{market.label}</span>
                            <span className="text-xs text-purple-500">{market.city}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-12 bg-white border-purple-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-purple-200 rounded-xl">
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="rounded-lg">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-6 pt-6 border-t border-purple-200">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-purple-900 mb-3 block">
                        Price Range: ₵{priceRange[0]} - ₵{priceRange[1]}
                      </label>
                      <Slider value={priceRange} onValueChange={setPriceRange} max={50} step={0.5} className="w-full" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-purple-600 font-medium">{filteredProducts.length} products found</p>
          {filteredProducts.some((p) => p.promoted) && (
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-100 px-3 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>Promoted products appear first</span>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="modern-card">
            <CardContent className="py-16 text-center">
              <Search className="h-16 w-16 mx-auto text-purple-300 mb-6" />
              <h3 className="text-2xl font-semibold text-purple-900 mb-3">No products found</h3>
              <p className="text-purple-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`modern-card group hover:-translate-y-2 transition-all duration-500 ${
                  product.promoted ? "ring-2 ring-purple-200 shadow-xl shadow-purple-500/20" : ""
                }`}
              >
                <div className="aspect-square relative overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    >
                      <Heart className="h-4 w-4 text-purple-600" />
                    </Button>
                    {product.negotiable && (
                      <Badge className="bg-white/90 text-purple-700 border-0 text-xs px-2 py-1 rounded-full">
                        Negotiable
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.promoted && getPromotionBadge(product.promotionType)}
                    {product.deliveryAvailable && (
                      <Badge className="bg-purple-600 text-white border-0 text-xs px-2 py-1 rounded-full">
                        Delivery
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-purple-900 line-clamp-1 mb-1">{product.name}</h3>
                      <p className="text-sm text-purple-600 font-medium">{product.vendor}</p>
                      <p className="text-xs text-purple-500 flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {ghanaMarkets.find((m) => m.value === product.market)?.label || "Market Location"}
                      </p>
                    </div>

                    <p className="text-sm text-purple-700 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-purple-400 text-purple-400" />
                        <span className="text-sm font-semibold text-purple-900">{product.rating}</span>
                        <span className="text-sm text-purple-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-purple-500">
                        <MapPin className="h-3 w-3" />
                        <span>{product.distance}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-purple-200 text-purple-600 rounded-full bg-white"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-2xl font-bold text-purple-900">₵{product.price.toFixed(2)}</span>
                        <span className="text-sm text-purple-600">/{product.unit}</span>
                      </div>
                      <span className="text-sm text-purple-500 bg-purple-100 px-2 py-1 rounded-full">
                        Stock: {product.stock}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <Button className="btn-primary flex-1 h-10">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl bg-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl bg-white"
                      >
                        <MessageCircle className="mr-2 h-3 w-3" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
