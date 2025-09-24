"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import FavoritesHeader from "@/components/buyer/favorites-header"
import FavoritesFilters from "@/components/buyer/favorites-filters"
import FavoritesGrid from "@/components/buyer/favorites-grid"
import { favoriteItems } from "@/components/buyer/favorites-data"

export default function BuyerFavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const { toast } = useToast()

  const filteredItems = favoriteItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === "product" && item.vendor?.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = filterBy === "all" || item.type === filterBy
    return matchesSearch && matchesFilter
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price":
        if (a.type === "product" && b.type === "product" && a.price && b.price) {
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
      <FavoritesHeader />

      <FavoritesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedItems.length} of {favoriteItems.length} favorites
        </p>
      </div>

      <FavoritesGrid
        sortedItems={sortedItems}
        viewMode={viewMode}
        searchQuery={searchQuery}
        filterBy={filterBy}
        onRemoveFromFavorites={removeFromFavorites}
        onAddToCart={addToCart}
      />
    </div>
  )
}
