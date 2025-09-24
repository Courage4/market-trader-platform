"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import ProductDetailsHeader from "@/components/buyer/product-details-header"
import ProductDetailsImage from "@/components/buyer/product-details-image"
import ProductDetailsInfo from "@/components/buyer/product-details-info"
import ProductNotFound from "@/components/buyer/product-not-found"
import { productData } from "@/components/buyer/product-details-data"

export default function ProductDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  
  const productId = params.id as string
  const product = productData[productId]

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: `${product.name} has been ${isFavorite ? 'removed from' : 'saved to'} your favorites.`,
    })
  }

  if (!product) {
    return (
      <DashboardLayout>
        <ProductNotFound />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ProductDetailsHeader 
          productName={product.name} 
          vendorName={product.vendor} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductDetailsImage 
            product={product} 
            isFavorite={isFavorite} 
            onToggleFavorite={handleToggleFavorite} 
          />

          <ProductDetailsInfo 
            product={product} 
            productId={productId} 
            onToggleFavorite={handleToggleFavorite} 
          />
        </div>
      </div>
    </DashboardLayout>
  )
}