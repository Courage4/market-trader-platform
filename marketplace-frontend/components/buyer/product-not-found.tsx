"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package } from "lucide-react"

export default function ProductNotFound() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/buyer/products')} className="btn btn-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </div>
    </div>
  )
}