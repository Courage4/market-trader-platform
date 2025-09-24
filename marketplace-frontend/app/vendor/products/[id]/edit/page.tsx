"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { 
  Upload, 
  MapPin, 
  DollarSign, 
  Package, 
  ImageIcon, 
  X, 
  Edit, 
  Sparkles, 
  Save, 
  Eye, 
  Trash2,
  ArrowLeft,
  AlertTriangle,
  Star,
  Heart,
  ShoppingCart,
  Phone,
  MessageCircle
} from "lucide-react"

const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export default function EditProduct() {
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
    status: "active"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [originalData, setOriginalData] = useState<any>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const productId = params.id

  const categories = [
    { group: "Fresh Produce", items: ["Vegetables - Leafy Greens", "Vegetables - Root Vegetables", "Fruits - Tropical Fruits", "Fruits - Citrus Fruits"] },
    { group: "Grains & Staples", items: ["Rice & Grains", "Beans & Legumes", "Yams & Plantains", "Cassava Products"] },
    { group: "Protein", items: ["Fresh Fish", "Poultry - Live", "Meat - Beef", "Eggs"] },
    { group: "Prepared Foods", items: ["Bakery Items", "Cooked Foods", "Traditional Dishes"] },
  ]

  const units = ["kg", "g", "lb", "piece", "dozen", "bunch", "bag", "box", "liter", "ml"]

  // Mock product data - in a real app, this would come from an API
  const mockProductData = {
    1: {
      name: "Fresh Organic Tomatoes",
      description: "Fresh, locally grown organic tomatoes, perfect for salads and sauces.",
      category: "vegetables-leafy-greens",
      price: "14.00",
      stock: "45",
      unit: "kg",
      images: [
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&auto=format&q=80"
      ],
      tags: "organic, fresh, local",
      location: "Stall 12, Block B",
      market: "makola-market",
      deliveryAvailable: true,
      negotiable: true,
      minOrder: "1",
      maxOrder: "50",
      status: "active"
    }
  }

  useEffect(() => {
    // Load product data
    const loadProduct = () => {
      // Ensure productId is a string and a valid key of mockProductData
      const key = String(productId)
      const product = (mockProductData as any)[key]
      if (product) {
        setFormData(product)
        setOriginalData(product)
      } else {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        })
        router.push("/vendor/products")
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId, router, toast])

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
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
    setHasChanges(true)
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setHasChanges(true)
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
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Product updated successfully!",
      })

      setHasChanges(false)
      router.push("/vendor/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })

      setShowDeleteModal(false)
      router.push("/vendor/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'featured': return 'badge-featured'
      case 'premium': return 'badge-premium'
      case 'delivery': return 'badge-delivery'
      case 'negotiable': return 'badge-negotiable'
      case 'active': return 'badge-active'
      default: return 'badge-primary'
    }
  }

  const goBack = () => {
    if (hasChanges && !confirm("You have unsaved changes. Are you sure you want to leave?")) {
      return
    }
    router.push("/vendor/products")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-3 mb-4">
            <Button onClick={goBack} className="btn btn-ghost btn-icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Edit className="h-8 w-8 text-orange-500" />
            <div>
              <h1 className="text-4xl font-bold text-gradient">Edit Product</h1>
              <p className="text-lg text-gray-600 mt-2">
                Update your product information and settings
              </p>
            </div>
          </div>
          
          {hasChanges && (
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-700 font-medium">Unsaved changes</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Information */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Product Information</h2>
                </div>
                <p className="text-gray-600 mb-6">Update your product details</p>

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
                              <div className="px-3 py-2 text-sm font-semibold text-orange-600 border-b border-gray-100">
                                {group.group}
                              </div>
                              {group.items.map((category) => (
                                <SelectItem 
                                  key={category} 
                                  value={category.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                                  className="rounded-lg hover:bg-orange-50"
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
                  <DollarSign className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Pricing & Inventory</h2>
                </div>
                <p className="text-gray-600 mb-6">Update your price and stock levels</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="form-group">
                      <Label className="form-label form-label-required">Price (₵)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
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
                        <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
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
                            <SelectItem key={unit} value={unit} className="rounded-lg hover:bg-orange-50">
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
                  <ImageIcon className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Product Images</h2>
                </div>
                <p className="text-gray-600 mb-6">Update your product images (up to 5)</p>

                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? "border-orange-500 bg-orange-50" 
                      : "border-gray-300 hover:border-orange-400 hover:bg-orange-50/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
                      <ImageIcon className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Add more images</h3>
                    <p className="text-gray-500 mb-4">or replace existing ones</p>
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
                  <MapPin className="h-6 w-6 text-orange-500" />
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
                          <SelectItem key={market.value} value={market.value} className="rounded-lg hover:bg-orange-50">
                            <div className="flex flex-col">
                              <span className="font-medium">{market.label}</span>
                              <span className="text-xs text-orange-600">{market.city}, {market.region}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label className="form-label">Specific Stall/Shop Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-500" />
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

              {/* Product Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Product Status</h3>
                </div>

                <div className="space-y-4">
                  <div className="form-group">
                    <Label className="form-label">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger className="form-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                        <SelectItem value="active" className="rounded-lg hover:bg-orange-50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            Active
                          </div>
                        </SelectItem>
                        <SelectItem value="inactive" className="rounded-lg hover:bg-orange-50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                            Inactive
                          </div>
                        </SelectItem>
                        <SelectItem value="out_of_stock" className="rounded-lg hover:bg-orange-50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Out of Stock
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Save className="h-6 w-6 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Save Changes</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-orange-50 p-4 rounded-xl">
                    <p className="text-sm text-orange-700">
                      Your changes will be visible to buyers immediately after saving.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      disabled={isLoading || !hasChanges} 
                      className="btn btn-primary w-full h-12"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setShowPreviewModal(true)}
                      className="btn btn-outline w-full"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Preview Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trash2 className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-bold text-red-900">Danger Zone</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-xl">
                    <p className="text-sm text-red-700">
                      Deleting this product will permanently remove it from your store. This action cannot be undone.
                    </p>
                  </div>

                  <Button 
                    type="button" 
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isLoading}
                    className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Preview Modal */}
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-orange-500" />
                Product Preview
              </DialogTitle>
              <DialogDescription>
                This is how your product will appear to buyers
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Product Card Preview */}
              <div className="product-card group max-w-sm mx-auto">
                {/* Image Section */}
                <div className="relative">
                  <div className="product-image">
                    {formData.images.length > 0 ? (
                      <img
                        src={formData.images[0]}
                        alt={formData.name}
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
                    {formData.deliveryAvailable && (
                      <span className={getBadgeClass('delivery')}>Delivery</span>
                    )}
                    {formData.negotiable && (
                      <span className={getBadgeClass('negotiable')}>Negotiable</span>
                    )}
                    {formData.status === 'active' && (
                      <span className={getBadgeClass('active')}>Active</span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 p-2 rounded-full shadow-lg bg-white/90 text-gray-600 hover:bg-white transition-all duration-300">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-4">
                  {/* Product Info */}
                  <div>
                    <h3 className="product-title">{formData.name || "Product Name"}</h3>
                    <p className="product-seller">Your Store</p>
                    <p className="product-location">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {ghanaMarkets.find(m => m.value === formData.market)?.label || "Market Location"}
                      </span>
                    </p>
                  </div>

                  <p className="product-description">
                    {formData.description || "Product description will appear here"}
                  </p>

                  {/* Rating & Distance */}
                  <div className="flex items-center justify-between">
                    <div className="product-rating">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>4.5</span>
                      <span className="text-gray-500">(24)</span>
                    </div>
                    <div className="product-distance">
                      <MapPin className="w-3 h-3" />
                      <span>0.5 km</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {formData.tags && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        <span key={index} className="badge-outline">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between pt-2">
                    <p className="product-price">
                      ₵{formData.price || "0.00"}{formData.unit ? `/${formData.unit}` : ""}
                    </p>
                    <p className="product-stock">Stock: {formData.stock || "0"}</p>
                  </div>

                  <div className="space-y-3">
                    <button className="btn btn-primary w-full flex items-center justify-center gap-2 h-12">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                      <button className="btn btn-ghost btn-sm flex items-center justify-center gap-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="btn btn-outline btn-sm flex items-center justify-center gap-1">
                        <Phone className="w-4 h-4" />
                        Call
                      </button>
                      <button className="btn btn-outline btn-sm flex items-center justify-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600">
                      {categories.flatMap(g => g.items).find(item => 
                        item.toLowerCase().replace(/[^a-z0-9]/g, "-") === formData.category
                      ) || "Not selected"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Unit:</span>
                    <span className="ml-2 text-gray-600">{formData.unit || "Not specified"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Min Order:</span>
                    <span className="ml-2 text-gray-600">{formData.minOrder || "1"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Max Order:</span>
                    <span className="ml-2 text-gray-600">{formData.maxOrder || "No limit"}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Delivery:</span>
                    <span className="ml-2 text-gray-600">
                      {formData.deliveryAvailable ? "Available" : "Not available"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="ml-2 text-gray-600">
                      {formData.negotiable ? "Negotiable" : "Fixed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={() => setShowPreviewModal(false)} 
                className="btn btn-outline"
              >
                Close Preview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-red-900">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                Delete Product
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                This action cannot be undone. This will permanently delete your product and remove all associated data.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Product Info */}
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <div className="flex items-center gap-3">
                  {formData.images.length > 0 ? (
                    <img
                      src={formData.images[0]}
                      alt={formData.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-red-900">{formData.name}</h4>
                    <p className="text-sm text-red-700">₵{formData.price} • Stock: {formData.stock}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-yellow-900 mb-1">What happens when you delete:</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Product will be removed from all listings</li>
                      <li>• Customer favorites and cart items will be cleared</li>
                      <li>• Order history will remain but product will show as deleted</li>
                      <li>• This action cannot be reversed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button 
                onClick={() => setShowDeleteModal(false)} 
                className="btn btn-outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDelete}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </div>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}