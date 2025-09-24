"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface ProductDetailsHeaderProps {
  productName: string
  vendorName: string
}

export default function ProductDetailsHeader({ productName, vendorName }: ProductDetailsHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => router.back()} className="btn btn-ghost btn-icon">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{productName}</h1>
        <p className="text-gray-600">by {vendorName}</p>
      </div>
    </div>
  )
}