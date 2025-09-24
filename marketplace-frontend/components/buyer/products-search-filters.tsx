"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"
import { categories, sortOptions, ghanaMarkets } from "./products-data"

interface ProductsSearchFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  priceRange: [number, number]
  setPriceRange: (value: number[] | [number, number]) => void
  marketFilter: string
  setMarketFilter: (value: string) => void
}

export default function ProductsSearchFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  marketFilter,
  setMarketFilter,
}: ProductsSearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
            <Input
              placeholder="Search products, vendors, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-emerald-50/50 border-emerald-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] h-14 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="rounded-lg hover:bg-emerald-50">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={marketFilter} onValueChange={setMarketFilter}>
            <SelectTrigger className="w-[200px] h-14 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent className="max-h-60 bg-white border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="all" className="rounded-lg hover:bg-emerald-50">
                All Markets
              </SelectItem>
              {ghanaMarkets.map((market) => (
                <SelectItem key={market.value} value={market.value} className="rounded-lg hover:bg-emerald-50">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{market.label}</span>
                    <span className="text-xs text-emerald-600">{market.city}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-14 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-lg hover:bg-emerald-50">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="h-14 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl">
              <label className="text-sm font-semibold text-gray-800 mb-4 block">
                Price Range: ₵{priceRange[0]} - ₵{priceRange[1]}
              </label>
              <Slider 
                value={priceRange} 
                onValueChange={setPriceRange} 
                max={50} 
                step={0.5} 
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}