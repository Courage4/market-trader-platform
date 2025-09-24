"use client"

import { useState } from "react"
import { 
  Heart, 
  MapPin, 
  Star, 
  Eye, 
  Phone, 
  MessageCircle,
  StarIcon
} from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  seller: string
  location: string
  description: string
  rating: number
  reviews: number
  distance: string
  price: string
  stock: number
  tags: string[]
  badges?: {
    type: 'featured' | 'premium' | 'negotiable'
    label: string
  }[]
  image?: string
  vendorPhone?: string
  onView?: (id: string) => void
  onCall?: (id: string) => void
  onChat?: (id: string) => void
  onFavorite?: (id: string) => void
}

export default function ProductCard({
  id,
  name,
  seller,
  location,
  description,
  rating,
  reviews,
  distance,
  price,
  stock,
  tags,
  badges = [],
  image,
  vendorPhone,
  onView,
  onCall,
  onChat,
  onFavorite
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.(id)
  }

  const handleCall = () => {
    setShowPhoneNumber(true)
    onCall?.(id)
    
    // Reset to "Call" after 3 seconds
    setTimeout(() => {
      setShowPhoneNumber(false)
    }, 3000)
  }

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'featured':
        return 'badge-featured'
      case 'premium':
        return 'badge-premium'
      case 'delivery':
        return 'badge-delivery'
      case 'negotiable':
        return 'badge-negotiable'
      default:
        return 'badge-primary'
    }
  }

  return (
    <div className="product-card group">
      {/* Image Section */}
      <div className="relative">
        <div className="product-image">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <p className="text-sm text-gray-500">No Image</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span key={index} className={`${getBadgeClass(badge.type)} flex items-center gap-1`}>
              {badge.type === 'featured' && <StarIcon className="w-3 h-3" />}
              {badge.type === 'premium' && <StarIcon className="w-3 h-3" />}
              {badge.label}
            </span>
          ))}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-seller">{seller}</p>
        <p className="product-location">
          <MapPin className="w-4 h-4" />
          {location}
        </p>
        <p className="product-description">{description}</p>
        
        <div className="product-rating">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>
          <span className="text-sm text-gray-500">{distance}</span>
        </div>

        <div className="product-tags">
          {tags.map((tag, index) => (
            <span key={index} className="badge-outline text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex-between">
          <div>
            <p className="product-price">{price}</p>
            <p className="product-stock">Stock: {stock}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCall}
              className="btn btn-primary flex items-center justify-center gap-2 h-12 text-sm"
              title={vendorPhone ? `Call ${vendorPhone}` : "Call vendor"}
            >
              <Phone className="w-4 h-4" />
              {showPhoneNumber && vendorPhone ? vendorPhone : "Call"}
            </button>
            
            <button
              onClick={() => onChat?.(id)}
              className="btn btn-secondary flex items-center justify-center gap-2 h-12"
            >
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
          </div>
          
          <button
            onClick={() => onView?.(id)}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}