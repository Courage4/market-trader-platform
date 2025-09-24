"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import ProductsHeader from "@/components/buyer/products-header"
import ProductsSearchFilters from "@/components/buyer/products-search-filters"
import ProductsGrid from "@/components/buyer/products-grid"
import { useProductsHandlers } from "@/components/buyer/products-handlers"
import { products, Product } from "@/components/buyer/products-data"

export default function BuyerProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 50])
  const [marketFilter, setMarketFilter] = useState("all")
  
  const { handleCallVendor, handleMessageVendor, handleViewProduct, handleFavoriteProduct } = useProductsHandlers()

  const filteredProducts: Product[] = products
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

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProductsHeader />
        
        <ProductsSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange as [number, number]}
          setPriceRange={(value: number[] | [number, number]) => setPriceRange(value as [number, number])}
          marketFilter={marketFilter}
          setMarketFilter={setMarketFilter}
        />

        <ProductsGrid
          filteredProducts={filteredProducts}
          onViewProduct={handleViewProduct}
          onCallVendor={handleCallVendor}
          onMessageVendor={handleMessageVendor}
          onFavoriteProduct={handleFavoriteProduct}
        />
      </div>
    </DashboardLayout>
  )
}