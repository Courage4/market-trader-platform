export interface GhanaMarket {
  value: string
  label: string
  region: string
  city: string
}

export interface ProductCategory {
  group: string
  items: string[]
}

export interface MockProductData {
  [key: string]: {
    name: string
    description: string
    category: string
    price: string
    stock: string
    unit: string
    images: string[]
    tags: string
    location: string
    market: string
    deliveryAvailable: boolean
    negotiable: boolean
    minOrder: string
    maxOrder: string
    status: string
  }
}

export const ghanaMarkets: GhanaMarket[] = [
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
]

export const categories: ProductCategory[] = [
  { group: "Fresh Produce", items: ["Vegetables - Leafy Greens", "Vegetables - Root Vegetables", "Fruits - Tropical Fruits", "Fruits - Citrus Fruits"] },
  { group: "Grains & Staples", items: ["Rice & Grains", "Beans & Legumes", "Yams & Plantains", "Cassava Products"] },
  { group: "Protein", items: ["Fresh Fish", "Poultry - Live", "Meat - Beef", "Eggs"] },
  { group: "Prepared Foods", items: ["Bakery Items", "Cooked Foods", "Traditional Dishes"] },
]

export const units = ["kg", "g", "lb", "piece", "dozen", "bunch", "bag", "box", "liter", "ml"]

export const mockProductData: MockProductData = {
  "1": {
    name: "Fresh Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes, perfect for salads and sauces.",
    category: "vegetables-leafy-greens",
    price: "14.00",
    stock: "45",
    unit: "kg",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop&auto=format&q=80"
    ],
    tags: "organic, fresh, local",
    location: "Stall 12, Block B",
    market: "makola-market",
    deliveryAvailable: true,
    negotiable: true,
    minOrder: "1",
    maxOrder: "50",
    status: "active"
  }
}