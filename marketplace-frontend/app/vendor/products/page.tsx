"use client"

import DashboardLayout from "@/components/dashboard-layout"
import ProductsHeader from "@/components/vendor/products-header"
import ProductsSearchFilters from "@/components/vendor/products-search-filters"
import ProductsStats from "@/components/vendor/products-stats"
import ProductsGrid from "@/components/vendor/products-grid"
import { useProductsHandlers } from "@/components/vendor/products-handlers"

export default function VendorProducts() {
  const {
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
  } = useProductsHandlers()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProductsHeader />
        <ProductsSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          viewRange={viewRange}
          setViewRange={setViewRange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        <ProductsStats />
        <ProductsGrid
          filteredProducts={filteredProducts}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
        />
      </div>
    </DashboardLayout>
  )
}