"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, MapPin, DollarSign, Package, ImageIcon, X, Plus, Sparkles, Save, Eye } from "lucide-react"

const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    unit: "",
    images: [] as string[],
    tags: "",
    location: "",
    market: "",
    deliveryAvailable: false,
    negotiable: false,
    minOrder: "",
    maxOrder: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const categories = [
    { group: "Fresh Produce", items: ["Vegetables - Leafy Greens", "Vegetables - Root Vegetables", "Fruits - Tropical Fruits", "Fruits - Citrus Fruits"] },
    { group: "Grains & Staples", items: ["Rice & Grains", "Beans & Legumes", "Yams & Plantains", "Cassava Products"] },
    { group: "Protein", items: ["Fresh Fish", "Poultry - Live", "Meat - Beef", "Eggs"] },
    { group: "Prepared Foods", items: ["Bakery Items", "Cooked Foods", "Traditional Dishes"] },
  ]

  const units = ["kg", "g", "lb", "piece", "dozen", "bunch", "bag", "box", "liter", "ml"]

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file)
        newImages.push(imageUrl)
      }
    })

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5),
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.market) {
      toast({
        title: "Error",
        description: "Please fill in all required fields including market selection",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Product added successfully!",
      })

      router.push("/vendor/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Plus className="h-8 w-8 text-emerald-500" />
              <h1 className="text-4xl font-bold text-gradient">Add New Product</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Create a new product listing and start selling across Ghana's markets
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Product Information</h2>
                </div>
                <p className="text-gray-600 mb-6">Basic details about your product</p>

                <div className="space-y-6">
                  <div className="form-group">
                    <Label className="form-label form-label-required">Product Name</Label>
                    <Input
                      placeholder="e.g., Fresh Organic Tomatoes"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <Label className="form-label form-label-required">Description</Label>
                    <Textarea
                      placeholder="Describe your product, its quality, origin, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="form-textarea"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <Label className="form-label form-label-required">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="form-select">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl max-h-80">
                          {categories.map((group) => (
                            <div key={group.group}>
                              <div className="px-3 py-2 text-sm font-semibold text-emerald-600 border-b border-gray-100">
                                {group.group}
                              </div>
                              {group.items.map((category) => (
                                <SelectItem 
                                  key={category} 
                                  value={category.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                                  className="rounded-lg hover:bg-emerald-50"
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Tags</Label>
                      <Input
                        placeholder="organic, fresh, local (comma separated)"
                        value={formData.tags}
                        onChange={(e) => handleInputChange("tags", e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Pricing & Inventory</h2>
                </div>
                <p className="text-gray-600 mb-6">Set your price and manage stock levels</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="form-group">
                      <Label className="form-label form-label-required">Price (₵)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          className="form-input pl-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <Label className="form-label form-label-required">Stock Quantity</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.stock}
                          onChange={(e) => handleInputChange("stock", e.target.value)}
                          className="form-input pl-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Unit</Label>
                      <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                        <SelectTrigger className="form-select">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit} className="rounded-lg hover:bg-emerald-50">
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                      <Label className="form-label">Minimum Order</Label>
                      <Input
                        type="number"
                        placeholder="1"
                        value={formData.minOrder}
                        onChange={(e) => handleInputChange("minOrder", e.target.value)}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Maximum Order</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={formData.maxOrder}
                        onChange={(e) => handleInputChange("maxOrder", e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="negotiable"
                      checked={formData.negotiable}
                      onCheckedChange={(checked) => handleInputChange("negotiable", checked as boolean)}
                      className="form-checkbox"
                    />
                    <Label htmlFor="negotiable" className="form-label">Price is negotiable</Label>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="h-6 w-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Product Images</h2>
                </div>
                <p className="text-gray-600 mb-6">Upload up to 5 high-quality images of your product</p>

                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? "border-emerald-500 bg-emerald-50" 
                      : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                      <ImageIcon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop images here</h3>
                    <p className="text-gray-500 mb-4">or click to select files</p>
                    <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB each</p>
                    
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload">
                      <Button type="button" className="btn btn-outline mt-6">
                        <Upload className="mr-2 h-5 w-5" />
                        Select Images
                      </Button>
                    </Label>
                  </div>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-xl border border-gray-200 group-hover:shadow-lg transition-shadow duration-300"
                        />
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 h-8 w-8 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Location & Delivery */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-gray-900">Location & Delivery</h3>
                </div>

                <div className="space-y-6">
                  <div className="form-group">
                    <Label className="form-label form-label-required">Market Location</Label>
                    <Select value={formData.market} onValueChange={(value) => handleInputChange("market", value)}>
                      <SelectTrigger className="form-select">
                        <SelectValue placeholder="Select your market" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl max-h-60">
                        {ghanaMarkets.map((market) => (
                          <SelectItem key={market.value} value={market.value} className="rounded-lg hover:bg-emerald-50">
                            <div className="flex flex-col">
                              <span className="font-medium">{market.label}</span>
                              <span className="text-xs text-emerald-600">{market.city}, {market.region}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label className="form-label">Specific Stall/Shop Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-500" />
                      <Input
                        placeholder="e.g., Stall 45, Block A"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="form-input pl-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="delivery"
                      checked={formData.deliveryAvailable}
                      onCheckedChange={(checked) => handleInputChange("deliveryAvailable", checked as boolean)}
                      className="form-checkbox"
                    />
                    <Label htmlFor="delivery" className="form-label">Delivery available</Label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                  <h3 className="text-xl font-bold text-gray-900">Publish Product</h3>
                </div>
                <p className="text-gray-600 mb-6">Review your product details before publishing</p>

                <div className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <p className="text-sm text-emerald-700">
                      Once published, your product will be visible to all buyers in your area.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button type="submit" disabled={isLoading} className="btn btn-primary w-full h-12">
                      {isLoading ? "Publishing..." : "Publish Product"}
                    </Button>
                    <Button type="button" className="btn btn-outline w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save as Draft
                    </Button>
                    <Button type="button" className="btn btn-ghost w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">💡 Tips for Success</h3>
                <ul className="text-sm space-y-3 text-emerald-800">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    Use high-quality, well-lit photos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    Write detailed, honest descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    Set competitive prices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    Keep your stock levels updated
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    Respond quickly to buyer inquiries
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}