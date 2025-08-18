"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Heart,
  Search,
  Filter,
  Star,
  MapPin,
  ShoppingCart,
  Trash2,
  Grid3X3,
  List,
  SortAsc,
  Package,
  Store,
  Clock,
} from "lucide-react"

export default function BuyerFavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const { toast } = useToast()

  const favoriteItems = [
    {
      id: 1,
      type: "product",
      name: "Fresh Bananas",
      vendor: "Fresh Fruits Ghana",
      price: "GHS 8.00",
      originalPrice: "GHS 10.00",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
      reviews: 45,
      location: "Accra Central",
      inStock: true,
      discount: 20,
      addedDate: "2024-01-20",
      lastUpdated: "2024-01-22",
    },
    {
      id: 2,
      type: "product",
      name: "Organic Tomatoes",
      vendor: "Green Valley Farm",
      price: "GHS 12.00",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      reviews: 32,
      location: "Kumasi",
      inStock: true,
      addedDate: "2024-01-18",
      lastUpdated: "2024-01-21",
    },
    {
      id: 3,
      type: "vendor",
      name: "Fresh Fruits Ghana",
      description: "Premium quality fruits and vegetables",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.9,
      reviews: 156,
      location: "Accra Central",
      products: 45,
      followers: 234,
      addedDate: "2024-01-15",
    },
    {
      id: 4,
      type: "product",
      name: "Sweet Oranges",
      vendor: "Citrus Paradise",
      price: "GHS 15.00",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      reviews: 28,
      location: "Takoradi",
      inStock: false,
      addedDate: "2024-01-10",
      lastUpdated: "2024-01-20",
    },
    {
      id: 5,
      type: "product",
      name: "Fresh Pineapples",
      vendor: "Tropical Delights",
      price: "GHS 6.00",
      originalPrice: "GHS 8.00",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
      reviews: 67,
      location: "Cape Coast",
      inStock: true,
      discount: 25,
      addedDate: "2024-01-08",
      lastUpdated: "2024-01-19",
    },
  ]

  const filteredItems = favoriteItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === "product" && item.vendor.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterBy === "all" || item.type === filterBy
    return matchesSearch && matchesFilter
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        if (a.type === "product" && b.type === "product") {
          return Number.parseFloat(a.price.replace("GHS ", "")) - Number.parseFloat(b.price.replace("GHS ", ""))
        }
        return 0
      case "rating":
        return b.rating - a.rating
      case "recent":
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
  })

  const removeFromFavorites = (id: number, name: string) => {
    toast({
      title: "Removed from Favorites",
      description: `${name} has been removed from your favorites.`,
    })
  }

  const addToCart = (id: number, name: string) => {
    toast({
      title: "Added to Cart",
      description: `${name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>
        <p className="text-gray-600">Your saved products and vendors</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="product">Products</SelectItem>
                  <SelectItem value="vendor">Vendors</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedItems.length} of {favoriteItems.length} favorites
        </p>
      </div>

      {/* Favorites Grid/List */}
      {sortedItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No favorites found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterBy !== "all"
                ? "Try adjusting your search or filters"
                : "Start adding products and vendors to your favorites"}
            </p>
            <Button>Browse Products</Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {sortedItems.map((item) => (
            <Card
              key={item.id}
              className={`group hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex" : ""}`}
            >
              <div className={viewMode === "list" ? "flex w-full" : ""}>
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className={`object-cover ${viewMode === "list" ? "w-full h-32" : "w-full h-48"} rounded-t-lg`}
                  />

                  {item.type === "product" && item.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500">-{item.discount}%</Badge>
                  )}

                  {item.type === "product" && !item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                      <Badge variant="secondary">Out of Stock</Badge>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                    onClick={() => removeFromFavorites(item.id, item.name)}
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </Button>
                </div>

                <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      {item.type === "product" ? (
                        <p className="text-sm text-gray-600 mb-2">by {item.vendor}</p>
                      ) : (
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {item.type === "product" ? (
                        <Package className="w-3 h-3 mr-1" />
                      ) : (
                        <Store className="w-3 h-3 mr-1" />
                      )}
                      {item.type}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </div>

                  {item.type === "product" ? (
                    <div className="mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-purple-600">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      {item.lastUpdated && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>Updated {new Date(item.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{item.products} products</span>
                        <span>{item.followers} followers</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {item.type === "product" ? (
                      <>
                        <Button
                          size="sm"
                          className="flex-1"
                          disabled={!item.inStock}
                          onClick={() => addToCart(item.id, item.name)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                        <Store className="w-4 h-4 mr-2" />
                        Visit Store
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => removeFromFavorites(item.id, item.name)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    Added {new Date(item.addedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
