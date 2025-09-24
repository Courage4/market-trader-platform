export interface OverallStats {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: string
}

export interface RegionalStats {
  region: string
  users: number
  vendors: number
  transactions: number
  revenue: number
  growth: number
}

export interface CategoryPerformance {
  category: string
  products: number
  orders: number
  revenue: number
  avgRating: number
  growth: number
}

export interface TopMarket {
  name: string
  location: string
  vendors: number
  products: number
  orders: number
  revenue: number
  rating: number
}

export interface GrowthTimeline {
  period: string
  users: number
  vendors: number
  orders: number
  revenue: number
}

export const overallStats: OverallStats[] = [
  {
    title: "Total Users",
    value: "45,892",
    change: "+12.5% from last month",
    trend: "up",
    icon: "Users",
  },
  {
    title: "Active Vendors",
    value: "8,743",
    change: "+8.2% from last month",
    trend: "up",
    icon: "Store",
  },
  {
    title: "Total Orders",
    value: "156,847",
    change: "+23.1% from last month",
    trend: "up",
    icon: "ShoppingCart",
  },
  {
    title: "Platform Revenue",
    value: "₵2,847,392",
    change: "+18.7% from last month",
    trend: "up",
    icon: "DollarSign",
  },
  {
    title: "Avg Order Value",
    value: "₵18.15",
    change: "+5.3% from last month",
    trend: "up",
    icon: "TrendingUp",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-0.8% from last month",
    trend: "down",
    icon: "Target",
  },
]

export const regionalStats: RegionalStats[] = [
  {
    region: "Greater Accra",
    users: 18542,
    vendors: 3421,
    transactions: 78456,
    revenue: 1247392,
    growth: 15.2,
  },
  {
    region: "Ashanti",
    users: 12847,
    vendors: 2341,
    transactions: 45623,
    revenue: 892456,
    growth: 12.8,
  },
  {
    region: "Western",
    users: 8945,
    vendors: 1567,
    transactions: 23456,
    revenue: 567892,
    growth: 18.5,
  },
  {
    region: "Central",
    users: 3456,
    vendors: 789,
    transactions: 12345,
    revenue: 234567,
    growth: 22.1,
  },
  {
    region: "Northern",
    users: 2102,
    vendors: 425,
    transactions: 8967,
    revenue: 178234,
    growth: 25.7,
  },
]

export const categoryPerformance: CategoryPerformance[] = [
  {
    category: "Fresh Produce",
    products: 12456,
    orders: 45623,
    revenue: 892456,
    avgRating: 4.7,
    growth: 18.5,
  },
  {
    category: "Dairy Products",
    products: 3456,
    orders: 12345,
    revenue: 234567,
    avgRating: 4.5,
    growth: 12.3,
  },
  {
    category: "Grains & Cereals",
    products: 5678,
    orders: 18934,
    revenue: 345678,
    avgRating: 4.6,
    growth: 15.7,
  },
  {
    category: "Meat & Poultry",
    products: 2345,
    orders: 8765,
    revenue: 167892,
    avgRating: 4.4,
    growth: 8.9,
  },
  {
    category: "Beverages",
    products: 1890,
    orders: 6789,
    revenue: 123456,
    avgRating: 4.3,
    growth: 22.1,
  },
  {
    category: "Processed Foods",
    products: 4567,
    orders: 15678,
    revenue: 298765,
    avgRating: 4.2,
    growth: 6.8,
  },
]

export const topMarkets: TopMarket[] = [
  {
    name: "Kaneshie Market",
    location: "Greater Accra",
    vendors: 456,
    products: 2345,
    orders: 12345,
    revenue: 234567,
    rating: 4.8,
  },
  {
    name: "Kejetia Market",
    location: "Ashanti",
    vendors: 389,
    products: 1987,
    orders: 9876,
    revenue: 187654,
    rating: 4.7,
  },
  {
    name: "Takoradi Market",
    location: "Western",
    vendors: 234,
    products: 1234,
    orders: 5678,
    revenue: 123456,
    rating: 4.6,
  },
  {
    name: "Cape Coast Market",
    location: "Central",
    vendors: 156,
    products: 876,
    orders: 3456,
    revenue: 78901,
    rating: 4.5,
  },
  {
    name: "Tamale Market",
    location: "Northern",
    vendors: 98,
    products: 543,
    orders: 2345,
    revenue: 45678,
    rating: 4.4,
  },
]

export const growthTimeline: GrowthTimeline[] = [
  { period: "Jan 2024", users: 12500, vendors: 2100, orders: 34567, revenue: 456789 },
  { period: "Feb 2024", users: 15600, vendors: 2450, orders: 41234, revenue: 567890 },
  { period: "Mar 2024", users: 18900, vendors: 2780, orders: 47891, revenue: 678901 },
  { period: "Apr 2024", users: 22400, vendors: 3120, orders: 54568, revenue: 789012 },
  { period: "May 2024", users: 26100, vendors: 3450, orders: 61235, revenue: 890123 },
  { period: "Jun 2024", users: 30000, vendors: 3780, orders: 67902, revenue: 901234 },
  { period: "Jul 2024", users: 34100, vendors: 4110, orders: 74569, revenue: 1012345 },
  { period: "Aug 2024", users: 38400, vendors: 4440, orders: 81236, revenue: 1123456 },
  { period: "Sep 2024", users: 42900, vendors: 4770, orders: 87903, revenue: 1234567 },
  { period: "Oct 2024", users: 45892, vendors: 5143, orders: 94570, revenue: 1345678 },
]