"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, X } from "lucide-react"

interface ProductEditImagesProps {
  images: string[]
  onImagesChange: (images: string[]) => void
}

export default function ProductEditImages({ images, onImagesChange }: ProductEditImagesProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file)
        newImages.push(imageUrl)
      }
    })

    onImagesChange([...images, ...newImages].slice(0, 5))
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="h-5 w-5 text-emerald-500" />
        <h3 className="text-lg font-semibold">Product Images</h3>
        <span className="text-sm text-gray-500">({images.length}/5)</span>
      </div>

      {/* Upload Area */}
      {images.length < 5 && (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Drop images here or click to upload
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG up to 10MB each (max 5 images)
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload" className="btn btn-outline mt-4 cursor-pointer">
            Choose Images
          </Label>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={() => removeImage(index)}
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}