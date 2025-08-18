"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Package, AlertTriangle, MapPin } from "lucide-react"

const ghanaMarkets = [
  // Greater Accra Region
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "madina-market", label: "Madina Market", region: "Greater Accra", city: "Accra" },
  { value: "dome-market", label: "Dome Market", region: "Greater Accra", city: "Accra" },
  { value: "tema-market", label: "Tema Market", region: "Greater Accra", city: "Tema" },
  { value: "ashaiman-market", label: "Ashaiman Market", region: "Greater Accra", city: "Ashaiman" },
  { value: "kasoa-market", label: "Kasoa Market", region: "Greater Accra", city: "Kasoa" },
  { value: "agbogbloshie-market", label: "Agbogbloshie Market", region: "Greater Accra", city: "Accra" },
  { value: "tudu-market", label: "Tudu Market", region: "Greater Accra", city: "Accra" },
  { value: "mallam-market", label: "Mallam Market", region: "Greater Accra", city: "Accra" },

  // Ashanti Region
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "central-market-kumasi", label: "Central Market", region: "Ashanti", city: "Kumasi" },
  { value: "adum-market", label: "Adum Market", region: "Ashanti", city: "Kumasi" },
  { value: "bantama-market", label: "Bantama Market", region: "Ashanti", city: "Kumasi" },
  { value: "asafo-market", label: "Asafo Market", region: "Ashanti", city: "Kumasi" },
  { value: "oforikrom-market", label: "Oforikrom Market", region: "Ashanti", city: "Kumasi" },
  { value: "ejisu-market", label: "Ejisu Market", region: "Ashanti", city: "Ejisu" },

  // Western Region
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "sekondi-market", label: "Sekondi Market", region: "Western", city: "Sekondi" },
  { value: "tarkwa-market", label: "Tarkwa Market", region: "Western", city: "Tarkwa" },
  { value: "axim-market", label: "Axim Market", region: "Western", city: "Axim" },

  // Central Region
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "elmina-market", label: "Elmina Market", region: "Central", city: "Elmina" },
  { value: "winneba-market", label: "Winneba Market", region: "Central", city: "Winneba" },
  { value: "kasoa-central-market", label: "Kasoa Central Market", region: "Central", city: "Kasoa" },

  // Eastern Region
  { value: "koforidua-market", label: "Koforidua Central Market", region: "Eastern", city: "Koforidua" },
  { value: "akropong-market", label: "Akropong Market", region: "Eastern", city: "Akropong" },
  { value: "nkawkaw-market", label: "Nkawkaw Market", region: "Eastern", city: "Nkawkaw" },
  { value: "akim-oda-market", label: "Akim Oda Market", region: "Eastern", city: "Akim Oda" },

  // Northern Region
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
  { value: "yendi-market", label: "Yendi Market", region: "Northern", city: "Yendi" },
  { value: "salaga-market", label: "Salaga Market", region: "Northern", city: "Salaga" },

  // Upper East Region
  { value: "bolgatanga-market", label: "Bolgatanga Market", region: "Upper East", city: "Bolgatanga" },
  { value: "navrongo-market", label: "Navrongo Market", region: "Upper East", city: "Navrongo" },

  // Upper West Region
  { value: "wa-market", label: "Wa Central Market", region: "Upper West", city: "Wa" },

  // Volta Region
  { value: "ho-market", label: "Ho Central Market", region: "Volta", city: "Ho" },
  { value: "keta-market", label: "Keta Market", region: "Volta", city: "Keta" },
  { value: "aflao-market", label: "Aflao Market", region: "Volta", city: "Aflao" },

  // Brong Ahafo Region
  { value: "sunyani-market", label: "Sunyani Central Market", region: "Brong Ahafo", city: "Sunyani" },
  { value: "techiman-market", label: "Techiman Market", region: "Brong Ahafo", city: "Techiman" },
  { value: "berekum-market", label: "Berekum Market", region: "Brong Ahafo", city: "Berekum" },

  // Western North Region
  { value: "sefwi-wiawso-market", label: "Sefwi Wiawso Market", region: "Western North", city: "Sefwi Wiawso" },

  // Ahafo Region
  { value: "goaso-market", label: "Goaso Market", region: "Ahafo", city: "Goaso" },

  // Bono East Region
  { value: "atebubu-market", label: "Atebubu Market", region: "Bono East", city: "Atebubu" },

  // North East Region
  { value: "nalerigu-market", label: "Nalerigu Market", region: "North East", city: "Nalerigu" },

  // Savannah Region
  { value: "damongo-market", label: "Damongo Market", region: "Savannah", city: "Damongo" },

  // Oti Region
  { value: "dambai-market", label: "Dambai Market", region: "Oti", city: "Dambai" },
]

export default function VendorProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 3.5,
      stock: 45,
      status: "active",
      views: 234,
      market: "makola-market",
      image: "/placeholder.svg?height=80&width=80",
      description: "Fresh, locally grown tomatoes",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Organic Carrots",
      category: "Vegetables",
      price: 2.8,
      stock: 12,
      status: "low_stock",
      views: 156,
      market: "makola-market",
      image: "/placeholder.svg?height=80&width=80",
      description: "Organic carrots from local farm",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Green Lettuce",
      category: "Vegetables",
      price: 1.2,
      stock: 0,
      status: "out_of_stock",
      views: 89,
      market: "kaneshie-market",
      image: "/placeholder.svg?height=80&width=80",
      description: "Fresh green lettuce heads",
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      name: "Red Apples",
      category: "Fruits",
      price: 4.2,
      stock: 67,
      status: "active",
      views: 312,
      market: "kejetia-market",
      image: "/placeholder.svg?height=80&width=80",
      description: "Sweet red apples",
      createdAt: "2024-01-12",
    },
    {
      id: 5,
      name: "Fresh Bread",
      category: "Bakery",
      price: 2.5,
      stock: 8,
      status: "low_stock",
      views: 145,
      market: "tamale-central-market",
      image: "/placeholder.svg?height=80&width=80",
      description: "Freshly baked bread",
      createdAt: "2024-01-11",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "low_stock":
        return <Badge variant="secondary">Low Stock</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-muted-foreground mt-2">Manage your product listings and inventory</p>
          </div>
          <Link href="/vendor/add-product">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding your first product"}
              </p>
              <Link href="/vendor/add-product">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">{getStatusBadge(product.status)}</div>
                  {product.status === "low_stock" && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Low Stock
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{product.name}</h4>
                        {getStatusBadge(product.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ghanaMarkets.find((m) => m.value === product.market)?.label || "Market Location"}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{product.price}</span>
                        <span>Stock: {product.stock}</span>
                        <span>{product.views} views</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{product.views} views</span>
                    <span>Added {product.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{products.length}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.filter((p) => p.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {products.filter((p) => p.status === "low_stock").length}
              </div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {products.filter((p) => p.status === "out_of_stock").length}
              </div>
              <div className="text-sm text-muted-foreground">Out of Stock</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
