"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, ArrowUpRight, Eye } from "lucide-react"
import { recentProducts, RecentProduct } from "./dashboard-data"

export default function DashboardRecentProducts() {
  const router = useRouter()

  const handleEditProduct = (productId: number) => {
    router.push(`/vendor/products/edit/${productId}`)
  }

  const handleViewAllProducts = () => {
    router.push("/vendor/products")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge-active">Active</span>
      case 'low_stock':
        return <span className="badge-low-stock">Low Stock</span>
      case 'out_of_stock':
        return <span className="badge-out-of-stock">Out of Stock</span>
      default:
        return <span className="badge-primary">Active</span>
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-6 w-6 text-emerald-500" />
            Recent Products
          </h3>
          <p className="text-gray-600 mt-1">Your latest product listings</p>
        </div>
        <Button
          onClick={handleViewAllProducts}
          className="btn btn-outline btn-sm"
        >
          View All
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-200"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                {getStatusBadge(product.status)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{product.price}</span>
                <span>Stock: {product.stock}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {product.views}
                </span>
              </div>
            </div>
            <Button
              onClick={() => handleEditProduct(product.id)}
              className="btn btn-ghost btn-sm"
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}