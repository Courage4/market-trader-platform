import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Package, Plus, MoreHorizontal, Edit, Trash2, Eye, MapPin } from "lucide-react"
import { vendorProducts, ghanaMarkets, VendorProduct } from "./products-data"

interface ProductsGridProps {
  filteredProducts: VendorProduct[]
  searchTerm: string
  statusFilter: string
  categoryFilter: string
}

export default function ProductsGrid({ 
  filteredProducts, 
  searchTerm, 
  statusFilter, 
  categoryFilter 
}: ProductsGridProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="badge-success">Active</Badge>
      case "low_stock":
        return <Badge className="badge-warning">⚠ Low Stock</Badge>
      case "out_of_stock":
        return <Badge className="badge-error">Out of Stock</Badge>
      default:
        return <Badge className="badge-outline">Unknown</Badge>
    }
  }

  return (
    <>
      {/* Results Header */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-emerald-600 font-medium">{filteredProducts.length} products found</p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="card">
          <CardContent className="py-16 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search terms or filters"
                : "Start by adding your first product to get started"}
            </p>
            <Link href="/vendor/add-product">
              <Button className="btn btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid-responsive">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              {/* Image Section */}
              <div className="relative">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  {getStatusBadge(product.status)}
                </div>
                
                {/* Actions Menu */}
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border-gray-200 rounded-xl shadow-xl">
                      <DropdownMenuItem className="rounded-lg hover:bg-emerald-50">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg hover:bg-emerald-50">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg hover:bg-red-50 text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-seller">{product.category}</p>
                <p className="product-location">
                  <MapPin className="w-4 h-4" />
                  {ghanaMarkets.find((m) => m.value === product.market)?.label || "Market Location"}
                </p>
                <p className="product-description">{product.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold">{product.views}</span>
                    <span className="text-sm text-gray-500">views</span>
                  </div>
                  <span className="text-sm text-gray-500">Added {product.createdAt}</span>
                </div>

                <div className="flex-between">
                  <div>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <Link href={`/vendor/products/${product.id}/edit`}>
                    <button className="btn btn-primary w-full flex items-center justify-center gap-2 h-12">
                      <Edit className="w-4 h-4" />
                      Edit Product
                    </button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn btn-outline btn-sm flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    
                    <button className="btn btn-outline btn-sm flex items-center justify-center gap-1 text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}