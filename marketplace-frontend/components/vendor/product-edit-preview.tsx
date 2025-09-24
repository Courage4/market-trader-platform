import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Phone, MessageCircle, MapPin, Star } from "lucide-react"
import { ghanaMarkets } from "./product-edit-data"

interface ProductEditPreviewProps {
  isOpen: boolean
  onClose: () => void
  formData: any
}

export default function ProductEditPreview({ isOpen, onClose, formData }: ProductEditPreviewProps) {
  const selectedMarket = ghanaMarkets.find(market => market.value === formData.market)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Product Preview</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200">
              {formData.images.length > 0 ? (
                <img
                  src={formData.images[0]}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            {formData.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {formData.images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={`Product ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.name || "Product Name"}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-emerald-100 text-emerald-800">
                  {formData.category || "Category"}
                </Badge>
                <Badge variant="outline">
                  Stock: {formData.stock || "0"}
                </Badge>
                {formData.negotiable && (
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Negotiable
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-emerald-600">
                  ₵{formData.price || "0.00"}
                </span>
                <span className="text-gray-500">per {formData.unit || "unit"}</span>
              </div>

              {formData.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{formData.description}</p>
                </div>
              )}

              {formData.tags && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.split(",").map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedMarket?.label || "Market Location"}</span>
                </div>
                
                {formData.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{formData.location}</span>
                  </div>
                )}

                {formData.deliveryAvailable && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">
                      ✓ Delivery Available
                      {formData.minOrder && formData.maxOrder && (
                        <span className="ml-2 text-green-600">
                          (Min: {formData.minOrder}, Max: {formData.maxOrder})
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <Button className="btn btn-primary">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Contact Vendor
                </Button>
                <Button variant="outline" className="btn btn-outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="btn btn-outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" className="btn btn-outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}