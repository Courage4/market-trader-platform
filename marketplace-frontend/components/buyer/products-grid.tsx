"use client"

import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import { Search, Sparkles } from "lucide-react"
import { ghanaMarkets, Product } from "./products-data"

interface ProductsGridProps {
  filteredProducts: Product[]
  onViewProduct: (productId: string) => void
  onCallVendor: (productId: string) => void
  onMessageVendor: (productId: string) => void
  onFavoriteProduct: (productId: string) => void
}

export default function ProductsGrid({
  filteredProducts,
  onViewProduct,
  onCallVendor,
  onMessageVendor,
  onFavoriteProduct,
}: ProductsGridProps) {
  return (
    <>
      {/* Results Summary */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-emerald-600 font-medium">{filteredProducts.length} products found</p>
        {filteredProducts.some((p) => p.promoted) && (
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-100 px-3 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>Promoted products appear first</span>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card className="card">
          <CardContent className="py-16 text-center">
            <Search className="h-16 w-16 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid-responsive">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              name={product.name}
              seller={product.vendor}
              location={ghanaMarkets.find((m) => m.value === product.market)?.label || "Market Location"}
              description={product.description}
              rating={product.rating}
              reviews={product.reviews}
              distance={product.distance}
              price={`₵${product.price.toFixed(2)}/${product.unit}`}
              stock={product.stock}
              tags={product.tags}
              badges={[
                ...(product.promoted ? [{ type: product.promotionType as any, label: product.promotionType === 'featured' ? 'Featured' : 'Premium' }] : []),
                ...(product.negotiable ? [{ type: 'negotiable' as const, label: 'Negotiable' }] : [])
              ]}
              image={product.image}
              vendorPhone={product.vendorPhone}
              onView={onViewProduct}
              onCall={onCallVendor}
              onChat={onMessageVendor}
              onFavorite={onFavoriteProduct}
            />
          ))}
        </div>
      )}
    </>
  )
}