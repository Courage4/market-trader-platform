"use client"

import { Heart } from "lucide-react"

export default function FavoritesHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <Heart className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-bold">My Favorites</h1>
      </div>
      <p className="text-gray-600">Your saved products and vendors</p>
    </div>
  )
}