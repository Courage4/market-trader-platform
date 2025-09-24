import { useState } from "react"
import { vendorProducts } from "./products-data"

export function useProductsHandlers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewRange, setViewRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = vendorProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter
    const matchesViews = product.views >= viewRange[0] && product.views <= viewRange[1]

    return matchesSearch && matchesStatus && matchesCategory && matchesViews
  })

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    viewRange,
    setViewRange,
    showFilters,
    setShowFilters,
    filteredProducts,
  }
}