"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, MapPin, DollarSign, Package, ImageIcon, X } from "lucide-react"

const ghanaMarkets = [
  // Greater Accra Region
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "madina-market", label: "Madina Market", region: "Greater Accra", city: "Accra" },
  { value: "dome-market", label: "Dome Market", region: "Greater Accra", city: "Accra" },
  { value: "tema-market", label: "Tema Market", region: "Greater Accra", city: "Tema" },
  { value: "ashaiman-market", label: "Ashaiman Market", region: "Greater Accra", city: "Ashaiman" },
  { value: "kasoa-market", label: "Kasoa Market", region: "Greater Accra", city: "Kasoa" },
  { value: "agbogbloshie-market", label: "Agbogbloshie Market", region: "Greater Accra", city: "Accra" },
  { value: "tudu-market", label: "Tudu Market", region: "Greater Accra", city: "Accra" },
  { value: "mallam-market", label: "Mallam Market", region: "Greater Accra", city: "Accra" },

  // Ashanti Region
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "central-market-kumasi", label: "Central Market", region: "Ashanti", city: "Kumasi" },
  { value: "adum-market", label: "Adum Market", region: "Ashanti", city: "Kumasi" },
  { value: "bantama-market", label: "Bantama Market", region: "Ashanti", city: "Kumasi" },
  { value: "asafo-market", label: "Asafo Market", region: "Ashanti", city: "Kumasi" },
  { value: "oforikrom-market", label: "Oforikrom Market", region: "Ashanti", city: "Kumasi" },
  { value: "ejisu-market", label: "Ejisu Market", region: "Ashanti", city: "Ejisu" },

  // Western Region
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "sekondi-market", label: "Sekondi Market", region: "Western", city: "Sekondi" },
  { value: "tarkwa-market", label: "Tarkwa Market", region: "Western", city: "Tarkwa" },
  { value: "axim-market", label: "Axim Market", region: "Western", city: "Axim" },

  // Central Region
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "elmina-market", label: "Elmina Market", region: "Central", city: "Elmina" },
  { value: "winneba-market", label: "Winneba Market", region: "Central", city: "Winneba" },
  { value: "kasoa-central-market", label: "Kasoa Central Market", region: "Central", city: "Kasoa" },

  // Eastern Region
  { value: "koforidua-market", label: "Koforidua Central Market", region: "Eastern", city: "Koforidua" },
  { value: "akropong-market", label: "Akropong Market", region: "Eastern", city: "Akropong" },
  { value: "nkawkaw-market", label: "Nkawkaw Market", region: "Eastern", city: "Nkawkaw" },
  { value: "akim-oda-market", label: "Akim Oda Market", region: "Eastern", city: "Akim Oda" },

  // Northern Region
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
  { value: "yendi-market", label: "Yendi Market", region: "Northern", city: "Yendi" },
  { value: "salaga-market", label: "Salaga Market", region: "Northern", city: "Salaga" },

  // Upper East Region
  { value: "bolgatanga-market", label: "Bolgatanga Market", region: "Upper East", city: "Bolgatanga" },
  { value: "navrongo-market", label: "Navrongo Market", region: "Upper East", city: "Navrongo" },

  // Upper West Region
  { value: "wa-market", label: "Wa Central Market", region: "Upper West", city: "Wa" },

  // Volta Region
  { value: "ho-market", label: "Ho Central Market", region: "Volta", city: "Ho" },
  { value: "keta-market", label: "Keta Market", region: "Volta", city: "Keta" },
  { value: "aflao-market", label: "Aflao Market", region: "Volta", city: "Aflao" },

  // Brong Ahafo Region
  { value: "sunyani-market", label: "Sunyani Central Market", region: "Brong Ahafo", city: "Sunyani" },
  { value: "techiman-market", label: "Techiman Market", region: "Brong Ahafo", city: "Techiman" },
  { value: "berekum-market", label: "Berekum Market", region: "Brong Ahafo", city: "Berekum" },

  // Western North Region
  { value: "sefwi-wiawso-market", label: "Sefwi Wiawso Market", region: "Western North", city: "Sefwi Wiawso" },

  // Ahafo Region
  { value: "goaso-market", label: "Goaso Market", region: "Ahafo", city: "Goaso" },

  // Bono East Region
  { value: "atebubu-market", label: "Atebubu Market", region: "Bono East", city: "Atebubu" },

  // North East Region
  { value: "nalerigu-market", label: "Nalerigu Market", region: "North East", city: "Nalerigu" },

  // Savannah Region
  { value: "damongo-market", label: "Damongo Market", region: "Savannah", city: "Damongo" },

  // Oti Region
  { value: "dambai-market", label: "Dambai Market", region: "Oti", city: "Dambai" },
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
    market: "", // Add this field
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
    // Fresh Produce
    {
      group: "Fresh Produce",
      items: [
        "Vegetables - Leafy Greens",
        "Vegetables - Root Vegetables",
        "Vegetables - Herbs & Spices",
        "Fruits - Tropical Fruits",
        "Fruits - Citrus Fruits",
        "Fruits - Berries",
        "Fruits - Seasonal Fruits",
      ],
    },
    // Grains & Staples
    {
      group: "Grains & Staples",
      items: ["Rice & Grains", "Beans & Legumes", "Flour & Baking Ingredients", "Yams & Plantains", "Cassava Products"],
    },
    // Protein
    {
      group: "Protein",
      items: [
        "Fresh Fish",
        "Dried/Smoked Fish",
        "Poultry - Live",
        "Poultry - Processed",
        "Meat - Beef",
        "Meat - Goat",
        "Meat - Pork",
        "Eggs",
      ],
    },
    // Dairy & Beverages
    {
      group: "Dairy & Beverages",
      items: ["Fresh Milk", "Dairy Products", "Traditional Drinks", "Fruit Juices", "Water & Beverages"],
    },
    // Prepared Foods
    {
      group: "Prepared Foods",
      items: ["Bakery Items", "Cooked Foods", "Snacks & Confectionery", "Traditional Dishes"],
    },
    // Condiments & Seasonings
    {
      group: "Condiments & Seasonings",
      items: ["Palm Oil & Cooking Oils", "Traditional Spices", "Sauces & Condiments", "Salt & Seasonings"],
    },
    // Household & Personal
    {
      group: "Household & Personal",
      items: ["Soap & Detergents", "Personal Care Items", "Traditional Medicine", "Household Tools"],
    },
    // Textiles & Crafts
    {
      group: "Textiles & Crafts",
      items: ["Traditional Fabrics", "Clothing & Accessories", "Handmade Crafts", "Jewelry & Accessories"],
    },
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
        // In a real app, you'd upload to a service like S3
        const imageUrl = URL.createObjectURL(file)
        newImages.push(imageUrl)
      }
    })

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5), // Max 5 images
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
      // Mock API call - replace with actual API
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-muted-foreground mt-2">Create a new product listing for your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Product Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                  <CardDescription>Basic details about your product</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Fresh Organic Tomatoes"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product, its quality, origin, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-80">
                          {categories.map((group) => (
                            <div key={group.group}>
                              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-b">
                                {group.group}
                              </div>
                              {group.items.map((category) => (
                                <SelectItem key={category} value={category.toLowerCase().replace(/[^a-z0-9]/g, "-")}>
                                  {category}
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="organic, fresh, local (comma separated)"
                        value={formData.tags}
                        onChange={(e) => handleInputChange("tags", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Inventory</CardTitle>
                  <CardDescription>Set your price and manage stock levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stock">Stock Quantity *</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="stock"
                          type="number"
                          placeholder="0"
                          value={formData.stock}
                          onChange={(e) => handleInputChange("stock", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minOrder">Minimum Order</Label>
                      <Input
                        id="minOrder"
                        type="number"
                        placeholder="1"
                        value={formData.minOrder}
                        onChange={(e) => handleInputChange("minOrder", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxOrder">Maximum Order</Label>
                      <Input
                        id="maxOrder"
                        type="number"
                        placeholder="100"
                        value={formData.maxOrder}
                        onChange={(e) => handleInputChange("maxOrder", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="negotiable"
                      checked={formData.negotiable}
                      onCheckedChange={(checked) => handleInputChange("negotiable", checked as boolean)}
                    />
                    <Label htmlFor="negotiable">Price is negotiable</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>Upload up to 5 images of your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Drag and drop images here, or click to select</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label htmlFor="image-upload">
                      <Button type="button" variant="outline" className="mt-4 bg-transparent">
                        <Upload className="mr-2 h-4 w-4" />
                        Select Images
                      </Button>
                    </Label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location & Delivery */}
              <Card>
                <CardHeader>
                  <CardTitle>Location & Delivery</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="market">Market Location *</Label>
                    <Select value={formData.market} onValueChange={(value) => handleInputChange("market", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your market" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {ghanaMarkets.map((market) => (
                          <SelectItem key={market.value} value={market.value}>
                            <div className="flex flex-col">
                              <span>{market.label}</span>
                              <span className="text-xs text-muted-foreground">
                                {market.city}, {market.region}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Specific Stall/Shop Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="e.g., Stall 45, Block A"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="delivery"
                      checked={formData.deliveryAvailable}
                      onCheckedChange={(checked) => handleInputChange("deliveryAvailable", checked as boolean)}
                    />
                    <Label htmlFor="delivery">Delivery available</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Publish Product</CardTitle>
                  <CardDescription>Review your product details before publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Once published, your product will be visible to all buyers in your area.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Publishing..." : "Publish Product"}
                    </Button>
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Tips for Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Use high-quality, well-lit photos</li>
                    <li>• Write detailed, honest descriptions</li>
                    <li>• Set competitive prices</li>
                    <li>• Keep your stock levels updated</li>
                    <li>• Respond quickly to buyer inquiries</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
