import { vendorProducts } from "./products-data"

export default function ProductsStats() {
  const totalProducts = vendorProducts.length
  const activeProducts = vendorProducts.filter(p => p.status === "active").length
  const lowStockProducts = vendorProducts.filter(p => p.status === "low_stock").length
  const outOfStockProducts = vendorProducts.filter(p => p.status === "out_of_stock").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Active</h3>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{activeProducts}</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Low Stock</h3>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{lowStockProducts}</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Out of Stock</h3>
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
        </div>
        <p className="text-3xl font-bold text-gray-900">{outOfStockProducts}</p>
      </div>
    </div>
  )
}