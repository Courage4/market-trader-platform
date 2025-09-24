// Shared data and types for buyer products

export interface Product {
  id: number
  name: string
  vendor: string
  vendorId: number
  vendorPhone: string
  price: number
  unit: string
  category: string
  market: string
  image: string
  rating: number
  reviews: number
  distance: string
  stock: number
  description: string
  tags: string[]
  negotiable: boolean
  deliveryAvailable: boolean
  promoted: boolean
  promotionType: string
}

export const ghanaMarkets = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export const categories = [
  { value: "all", label: "All Categories" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "dairy", label: "Dairy" },
  { value: "bakery", label: "Bakery" },
  { value: "meat", label: "Meat & Poultry" },
]

export const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "distance", label: "Nearest First" },
]

export const products: Product[] = [
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