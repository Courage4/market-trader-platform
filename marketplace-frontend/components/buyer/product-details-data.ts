// Product details data and types

export interface ProductDetails {
  id: number
  name: string
  vendor: string
  vendorId: number
  vendorPhone: string
  price: number
  unit: string
  category: string
  market: string
  marketName: string
  image: string
  rating: number
  reviews: number
  distance: string
  stock: number
  description: string
  tags: string[]
  negotiable: boolean
  promoted: boolean
  promotionType: string
  location: string
  minOrder: number
  maxOrder: number
}

export const productData: Record<string, ProductDetails> = {
  "1": {
    id: 1,
    name: "Fresh Organic Tomatoes",
    vendor: "Fresh Farm Market",
    vendorId: 1,
    vendorPhone: "+233 24 123 4567",
    price: 14.0,
    unit: "kg",
    category: "vegetables",
    market: "makola-market",
    marketName: "Makola Market",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop&auto=format&q=80",
    rating: 4.8,
    reviews: 24,
    distance: "0.5 km",
    stock: 45,
    description: "Fresh, locally grown organic tomatoes, perfect for salads and sauces. These tomatoes are harvested daily from our farm in the Greater Accra region and are completely free from pesticides and chemicals.",
    tags: ["organic", "fresh", "local"],
    negotiable: true,
    promoted: true,
    promotionType: "featured",
    location: "Stall 12, Block B",
    minOrder: 1,
    maxOrder: 50,
  },
  "2": {
    id: 2,
    name: "Sweet Red Apples",
    vendor: "Green Valley Produce",
    vendorId: 2,
    vendorPhone: "+233 20 987 6543",
    price: 16.8,
    unit: "kg",
    category: "fruits",
    market: "kaneshie-market",
    marketName: "Kaneshie Market",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=400&fit=crop&auto=format&q=80",
    rating: 4.6,
    reviews: 18,
    distance: "1.2 km",
    stock: 67,
    description: "Crisp and sweet red apples imported from South Africa. These premium quality apples are perfect for snacking, juicing, or baking.",
    tags: ["sweet", "fresh", "imported"],
    negotiable: false,
    promoted: true,
    promotionType: "premium",
    location: "Section A, Stall 5",
    minOrder: 2,
    maxOrder: 30,
  }
}