// Shared data for buyer favorites

export interface FavoriteItem {
  id: number
  type: "product" | "vendor"
  name: string
  vendor?: string
  description?: string
  price?: string
  originalPrice?: string
  image: string
  rating: number
  reviews: number
  location: string
  inStock?: boolean
  discount?: number
  addedDate: string
  lastUpdated?: string
  products?: number
  followers?: number
}

export const favoriteItems: FavoriteItem[] = [
  {
    id: 1,
    type: "product",
    name: "Fresh Bananas",
    vendor: "Fresh Fruits Ghana",
    price: "GHS 8.00",
    originalPrice: "GHS 10.00",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 45,
    location: "Accra Central",
    inStock: true,
    discount: 20,
    addedDate: "2024-01-20",
    lastUpdated: "2024-01-22",
  },
  {
    id: 2,
    type: "product",
    name: "Organic Tomatoes",
    vendor: "Green Valley Farm",
    price: "GHS 12.00",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 32,
    location: "Kumasi",
    inStock: true,
    addedDate: "2024-01-18",
    lastUpdated: "2024-01-21",
  },
  {
    id: 3,
    type: "vendor",
    name: "Fresh Fruits Ghana",
    description: "Premium quality fruits and vegetables",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 156,
    location: "Accra Central",
    products: 45,
    followers: 234,
    addedDate: "2024-01-15",
  },
  {
    id: 4,
    type: "product",
    name: "Sweet Oranges",
    vendor: "Citrus Paradise",
    price: "GHS 15.00",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 28,
    location: "Takoradi",
    inStock: false,
    addedDate: "2024-01-10",
    lastUpdated: "2024-01-20",
  },
  {
    id: 5,
    type: "product",
    name: "Fresh Pineapples",
    vendor: "Tropical Delights",
    price: "GHS 6.00",
    originalPrice: "GHS 8.00",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 67,
    location: "Cape Coast",
    inStock: true,
    discount: 25,
    addedDate: "2024-01-08",
    lastUpdated: "2024-01-19",
  },
]