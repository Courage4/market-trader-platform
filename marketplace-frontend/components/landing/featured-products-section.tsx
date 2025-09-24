"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import { StarIcon, ArrowRight } from "lucide-react"

const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

const featuredProducts = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    vendor: "Fresh Farm Market",
    vendorId: 1,
    vendorPhone: "+233 24 123 4567",
    price: 14.0,
    unit: "kg",
    category: "vegetables",
    market: "makola-market",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.8,
    reviews: 24,
    distance: "0.5 km",
    stock: 45,
    description: "Fresh, locally grown organic tomatoes",
    tags: ["organic", "fresh", "local"],
    negotiable: true,
    deliveryAvailable: true,
    promoted: true,
    promotionType: "featured",
  },
  {
    id: 2,
    name: "Sweet Red Apples",
    vendor: "Green Valley Produce",
    vendorId: 2,
    vendorPhone: "+233 20 987 6543",
    price: 16.8,
    unit: "kg",
    category: "fruits",
    market: "kaneshie-market",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.6,
    reviews: 18,
    distance: "1.2 km",
    stock: 67,
    description: "Crisp and sweet red apples",
    tags: ["sweet", "fresh"],
    negotiable: false,
    deliveryAvailable: true,
    promoted: true,
    promotionType: "premium",
  },
  {
    id: 3,
    name: "Fresh Bread Loaves",
    vendor: "Local Bakery",
    vendorId: 3,
    vendorPhone: "+233 26 555 7890",
    price: 10.0,
    unit: "piece",
    category: "bakery",
    market: "kejetia-market",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.9,
    reviews: 32,
    distance: "0.8 km",
    stock: 12,
    description: "Freshly baked bread, made daily",
    tags: ["fresh", "daily"],
    negotiable: false,
    deliveryAvailable: false,
    promoted: false,
  },
  {
    id: 4,
    name: "Organic Carrots",
    vendor: "Fresh Farm Market",
    vendorId: 1,
    vendorPhone: "+233 24 123 4567",
    price: 11.2,
    unit: "kg",
    category: "vegetables",
    market: "makola-market",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop&auto=format&q=80",
    rating: 4.7,
    reviews: 15,
    distance: "0.5 km",
    stock: 23,
    description: "Organic carrots from local farm",
    tags: ["organic", "local"],
    negotiable: true,
    deliveryAvailable: true,
    promoted: false,
  },
]

export default function FeaturedProductsSection() {
  // Handler functions for product actions
  const handleCallVendor = (productId: string) => {
    const product = featuredProducts.find(p => p.id.toString() === productId)
    if (product && product.vendorPhone) {
      window.location.href = `tel:${product.vendorPhone}`
    }
  }

  const handleMessageVendor = (productId: string) => {
    // Navigate to chat page with vendor context
    window.location.href = `/buyer/chat?vendor=${productId}`
  }

  const handleViewProduct = (productId: string) => {
    // Navigate to product details page
    window.location.href = `/buyer/products/${productId}`
  }

  const handleFavoriteProduct = (productId: string) => {
    const product = featuredProducts.find(p => p.id.toString() === productId)
    if (product) {
      // Here you would typically save to favorites in your state management or database
      console.log(`Added ${product.name} to favorites`)
    }
  }

  return (
    <section className="py-20">
      <div className="container-modern">
        <div className="text-center mb-16">
          <Badge className="badge-primary mb-4">
            <StarIcon className="w-3 h-3 mr-1" />
            Featured Products
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            Fresh Products from <span className="text-gradient">Local Vendors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best products from verified local vendors across Ghana's markets
          </p>
        </div>

        <div className="grid-responsive">
          {featuredProducts.map((product) => (
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
              onView={handleViewProduct}
              onCall={handleCallVendor}
              onChat={handleMessageVendor}
              onFavorite={handleFavoriteProduct}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/buyer/products">
            <Button size="lg" className="btn-primary">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}