export interface GhanaMarket {
  value: string
  label: string
  region: string
  city: string
}

export interface VendorProduct {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "low_stock" | "out_of_stock"
  views: number
  market: string
  image: string
  description: string
  createdAt: string
}

export const ghanaMarkets: GhanaMarket[] = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export const vendorProducts: VendorProduct[] = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 3.5,
    stock: 45,
    status: "active",
    views: 234,
    market: "makola-market",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&auto=format&q=80",
    description: "Fresh, locally grown tomatoes",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Organic Carrots",
    category: "Vegetables",
    price: 2.8,
    stock: 12,
    status: "low_stock",
    views: 156,
    market: "makola-market",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop&auto=format&q=80",
    description: "Organic carrots from local farm",
    createdAt: "2024-01-14",
  },
  {
    id: 3,
    name: "Green Lettuce",
    category: "Vegetables",
    price: 1.2,
    stock: 0,
    status: "out_of_stock",
    views: 89,
    market: "kaneshie-market",
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=300&fit=crop&auto=format&q=80",
    description: "Fresh green lettuce heads",
    createdAt: "2024-01-13",
  },
  {
    id: 4,
    name: "Red Apples",
    category: "Fruits",
    price: 4.2,
    stock: 67,
    status: "active",
    views: 312,
    market: "kejetia-market",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop&auto=format&q=80",
    description: "Sweet red apples",
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Fresh Bread",
    category: "Bakery",
    price: 2.5,
    stock: 8,
    status: "low_stock",
    views: 145,
    market: "tamale-central-market",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&auto=format&q=80",
    description: "Freshly baked bread",
    createdAt: "2024-01-11",
  },
]