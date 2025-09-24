"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import {
  Star,
  MapPin,
  ShoppingCart,
  Trash2,
  Package,
  Store,
  Clock,
} from "lucide-react"
import { FavoriteItem } from "./favorites-data"

interface FavoritesGridProps {
  sortedItems: FavoriteItem[]
  viewMode: "grid" | "list"
  searchQuery: string
  filterBy: string
  onRemoveFromFavorites: (id: number, name: string) => void
  onAddToCart: (id: number, name: string) => void
}

export default function FavoritesGrid({
  sortedItems,
  viewMode,
  searchQuery,
  filterBy,
  onRemoveFromFavorites,
  onAddToCart,
}: FavoritesGridProps) {
  if (sortedItems.length === 0) {
    return (
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
    )
  }

  return (
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
                onClick={() => onRemoveFromFavorites(item.id, item.name)}
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
                  <Button
                    size="sm"
                    className="flex-1"
                    disabled={!item.inStock}
                    onClick={() => onAddToCart(item.id, item.name)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                ) : (
                  <Button size="sm" className="flex-1 bg-transparent" variant="outline">
                    <Store className="w-4 h-4 mr-2" />
                    Visit Store
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={() => onRemoveFromFavorites(item.id, item.name)}>
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
  )
}