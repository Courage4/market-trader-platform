export interface VendorStat {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: string
  iconBg: string
  color: string
}

export interface RecentProduct {
  id: number
  name: string
  price: string
  stock: number
  status: "active" | "low_stock" | "out_of_stock"
  views: number
  image: string
}

export interface RecentMessage {
  id: number
  buyer: string
  message: string
  time: string
  unread: boolean
  buyerEmail: string
  avatar: string
}

export const vendorStats: VendorStat[] = [
  {
    title: "Total Products",
    value: "24",
    change: "+2 this week",
    changeType: "positive",
    icon: "Package",
    iconBg: "bg-emerald-500",
    color: "emerald"
  },
  {
    title: "Total Revenue",
    value: "₵12,960",
    change: "+12% from last month",
    changeType: "positive",
    icon: "DollarSign",
    iconBg: "bg-blue-500",
    color: "blue"
  },
  {
    title: "Profile Views",
    value: "1,847",
    change: "+5% this week",
    changeType: "positive",
    icon: "Eye",
    iconBg: "bg-purple-500",
    color: "purple"
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "128 reviews",
    changeType: "neutral",
    icon: "Star",
    iconBg: "bg-yellow-500",
    color: "yellow"
  },
]

export const recentProducts: RecentProduct[] = [
  {
    id: 1,
    name: "Fresh Organic Tomatoes",
    price: "₵14.00/kg",
    stock: 45,
    status: "active",
    views: 234,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=60&h=60&fit=crop&auto=format&q=80",
  },
  {
    id: 2,
    name: "Organic Carrots",
    price: "₵11.20/kg",
    stock: 12,
    status: "low_stock",
    views: 156,
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=60&h=60&fit=crop&auto=format&q=80",
  },
  {
    id: 3,
    name: "Fresh Green Lettuce",
    price: "₵4.80/head",
    stock: 0,
    status: "out_of_stock",
    views: 89,
    image: "https://images.unsplash.com/photo-1550987800-f1a7c7e7b2e7?w=60&h=60&fit=crop&auto=format&q=80",
  },
]

export const recentMessages: RecentMessage[] = [
  {
    id: 1,
    buyer: "Sarah Johnson",
    message: "Hi, are your tomatoes still available?",
    time: "2 hours ago",
    unread: true,
    buyerEmail: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    buyer: "Mike Chen",
    message: "Can you deliver to downtown area?",
    time: "5 hours ago",
    unread: false,
    buyerEmail: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    buyer: "Emma Davis",
    message: "Thank you for the fresh vegetables!",
    time: "1 day ago",
    unread: false,
    buyerEmail: "emma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]