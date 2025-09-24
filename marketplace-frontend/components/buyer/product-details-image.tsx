"use client"

import { useState } from "react"
import { Heart, Sparkles } from "lucide-react"
import { ProductDetails } from "./product-details-data"

interface ProductDetailsImageProps {
  product: ProductDetails
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductDetailsImage({ product, isFavorite, onToggleFavorite }: ProductDetailsImageProps) {
  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'featured': return 'badge-featured'
      case 'premium': return 'badge-premium'
      case 'negotiable': return 'badge-negotiable'
      default: return 'badge-primary'
    }
  }

  return (
    <div className="relative">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-96 object-cover rounded-2xl shadow-lg"
      />
      
      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        {product.promoted && (
          <span className={getBadgeClass(product.promotionType)}>
            <Sparkles className="h-3 w-3 mr-1" />
            {product.promotionType === 'featured' ? 'Featured' : 'Premium'}
          </span>
        )}
        {product.negotiable && (
          <span className="badge-negotiable">Negotiable</span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={onToggleFavorite}
        className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:bg-white'
        }`}
      >
        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  )
}