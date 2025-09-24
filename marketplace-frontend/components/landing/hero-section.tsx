"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react"

const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    vendor: "Fresh Farm Market",
    price: 14.0,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.8,
    promoted: true,
  },
  {
    id: 2,
    name: "Sweet Red Apples",
    vendor: "Green Valley Produce",
    price: 16.8,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.6,
    promoted: true,
  },
]

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMarket, setSelectedMarket] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-teal-400/5" />
      <div className="container-modern relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <Badge className="badge-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                New Platform Launch
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">Connect</span> with Local{" "}
                <span className="text-gradient">Markets</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Discover fresh products from verified local vendors, support your community, and enjoy seamless
                shopping experiences across Ghana.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/role-switcher">
                <Button size="lg" className="btn-primary group">
                  Explore Dashboards
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/buyer/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-outline"
                >
                  Browse Products
                </Button>
              </Link>
            </div>

            {/* Enhanced Search Bar */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                  <Input
                    placeholder="Search products, vendors, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 bg-emerald-50/50 border-emerald-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                    <SelectTrigger className="flex-1 h-12 bg-gradient-to-br from-white to-gray-50 border-gray-200 rounded-xl hover:shadow-md transition-all duration-300">
                      <SelectValue placeholder="Select Market" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
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
                  <Link href="/buyer/products">
                    <Button className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-emerald-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gradient mb-2">Featured Products</h3>
                  <p className="text-gray-600">Fresh from local vendors</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <div className="aspect-square bg-emerald-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge className={`text-xs ${product.promoted ? 'badge-featured' : 'badge-outline'}`}>
                            {product.promoted ? 'Featured' : 'Local'}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900">{product.name}</h4>
                        <p className="text-emerald-600 font-bold text-sm">₵{product.price}/{product.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}