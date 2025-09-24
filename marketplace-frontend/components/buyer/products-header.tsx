"use client"

import { Sparkles } from "lucide-react"

export default function ProductsHeader() {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Sparkles className="h-8 w-8 text-emerald-500" />
        <h1 className="text-4xl font-bold text-gradient">Browse Products</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover fresh products from local vendors and connect directly to negotiate prices and arrange pickup
      </p>
    </div>
  )
}