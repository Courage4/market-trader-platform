"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"

interface ProductsSearchFiltersProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
  statusFilter: string
  setStatusFilter: (value: string) => void
  categoryFilter: string
  setCategoryFilter: (value: string) => void
  viewRange: [number, number]
  setViewRange: (value: [number, number]) => void
  showFilters: boolean
  setShowFilters: (value: boolean) => void
}

export default function ProductsSearchFilters({
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
}: ProductsSearchFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
            <Input
              placeholder="Search products, categories, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-emerald-50/50 border-emerald-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] h-14 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="all" className="rounded-lg hover:bg-emerald-50">All Status</SelectItem>
              <SelectItem value="active" className="rounded-lg hover:bg-emerald-50">Active</SelectItem>
              <SelectItem value="low_stock" className="rounded-lg hover:bg-emerald-50">Low Stock</SelectItem>
              <SelectItem value="out_of_stock" className="rounded-lg hover:bg-emerald-50">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] h-14 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
              <SelectItem value="all" className="rounded-lg hover:bg-emerald-50">All Categories</SelectItem>
              <SelectItem value="vegetables" className="rounded-lg hover:bg-emerald-50">Vegetables</SelectItem>
              <SelectItem value="fruits" className="rounded-lg hover:bg-emerald-50">Fruits</SelectItem>
              <SelectItem value="bakery" className="rounded-lg hover:bg-emerald-50">Bakery</SelectItem>
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
                Views Range: {viewRange[0]} - {viewRange[1]}
              </label>
              <Slider 
                value={viewRange} 
                onValueChange={setViewRange} 
                max={500} 
                step={10} 
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}