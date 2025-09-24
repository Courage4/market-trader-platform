"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Save, Eye, Trash2 } from "lucide-react"

interface ProductEditHeaderProps {
  productName: string
  isLoading: boolean
  hasChanges: boolean
  onSave: () => void
  onPreview: () => void
  onDelete: () => void
}

export default function ProductEditHeader({
  productName,
  isLoading,
  hasChanges,
  onSave,
  onPreview,
  onDelete,
}: ProductEditHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="btn btn-outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Edit className="h-6 w-6 text-emerald-500" />
            <h1 className="text-3xl font-bold text-gradient">Edit Product</h1>
          </div>
          <p className="text-gray-600">{productName}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onPreview}
          variant="outline"
          className="btn btn-outline"
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        
        <Button
          onClick={onDelete}
          variant="outline"
          className="btn btn-outline text-red-600 border-red-200 hover:bg-red-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
        
        <Button
          onClick={onSave}
          disabled={!hasChanges || isLoading}
          className="btn btn-primary"
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}