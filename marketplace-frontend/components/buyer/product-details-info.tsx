"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Star, MapPin, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ProductDetails } from "./product-details-data"

interface ProductDetailsInfoProps {
  product: ProductDetails
  productId: string
  onToggleFavorite: () => void
}

export default function ProductDetailsInfo({ product, productId, onToggleFavorite }: ProductDetailsInfoProps) {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCallVendor = () => {
    setShowPhoneNumber(true)
    window.location.href = `tel:${product.vendorPhone}`
    toast({
      title: "Calling Vendor",
      description: `Calling ${product.vendor} at ${product.vendorPhone}`,
    })
    
    // Reset to "Call Vendor" after 3 seconds
    setTimeout(() => {
      setShowPhoneNumber(false)
    }, 3000)
  }

  const handleMessageVendor = () => {
    router.push(`/buyer/chat?vendor=${product.vendorId}&product=${productId}`)
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${product.vendor}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Price and Rating */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-emerald-600">₵{product.price.toFixed(2)}</p>
          <p className="text-gray-600">per {product.unit}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{product.rating}</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {product.distance} away
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      {/* Tags */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span key={index} className="badge-outline">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-bold text-gray-900 mb-3">Location</h4>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">{product.marketName}</span>
          </p>
          <p className="text-gray-600 ml-6">{product.location}</p>
        </div>
      </div>

      {/* Stock and Order Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 mb-2">Stock</h4>
          <p className="text-2xl font-bold text-emerald-600">{product.stock}</p>
          <p className="text-sm text-gray-600">units available</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 mb-2">Order Range</h4>
          <p className="text-lg font-bold text-gray-900">{product.minOrder} - {product.maxOrder}</p>
          <p className="text-sm text-gray-600">{product.unit} per order</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={handleCallVendor} 
            className="btn btn-primary h-14 text-sm"
            title={`Call ${product.vendorPhone}`}
          >
            <Phone className="w-5 h-5 mr-2" />
            {showPhoneNumber ? product.vendorPhone : "Call Vendor"}
          </Button>
          <Button onClick={handleMessageVendor} className="btn btn-secondary h-14">
            <MessageCircle className="w-5 h-5 mr-2" />
            Message Vendor
          </Button>
        </div>
        
        {product.negotiable && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-orange-900">Price Negotiable</span>
            </div>
            <p className="text-sm text-orange-700">
              Contact the vendor to discuss pricing for bulk orders or special arrangements.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}