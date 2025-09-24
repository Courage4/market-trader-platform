// Super admin users data and types

import { Users, Shield, UserCheck, Ban } from "lucide-react"

export interface UserStat {
  title: string
  value: string
  change: string
  icon: any
  color: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: "vendor" | "buyer" | "admin" | "super-admin"
  status: "active" | "pending" | "suspended" | "banned"
  verified: boolean
  region: string
  city: string
  joinDate: string
  lastActive: string
  totalProducts?: number
  totalSales?: number
  totalOrders?: number
  totalSpent?: number
  managedUsers?: number
  resolvedComplaints?: number
  rating: number | null
  avatar: string
}

export const userStats: UserStat[] = [
  {
    title: "Total Users",
    value: "15,847",
    change: "+18% from last month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Active Vendors",
    value: "3,421",
    change: "+12% from last month",
    icon: Shield,
    color: "text-green-600",
  },
  {
    title: "Verified Users",
    value: "12,456",
    change: "78.6% verification rate",
    icon: UserCheck,
    color: "text-purple-600",
  },
  {
    title: "Suspended Accounts",
    value: "89",
    change: "0.56% of total users",
    icon: Ban,
    color: "text-red-600",
  },
]

export const users: User[] = [
  {
    id: 1,
    name: "John Vendor",
    email: "john.vendor@example.com",
    phone: "+233 24 123 4567",
    role: "vendor",
    status: "active",
    verified: true,
    region: "Greater Accra",
    city: "Accra",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalProducts: 24,
    totalSales: 1250,
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Buyer",
    email: "sarah.buyer@example.com",
    phone: "+233 20 987 6543",
    role: "buyer",
    status: "active",
    verified: true,
    region: "Ashanti",
    city: "Kumasi",
    joinDate: "2024-01-10",
    lastActive: "1 day ago",
    totalOrders: 45,
    totalSpent: 890,
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Admin",
    email: "michael.admin@example.com",
    phone: "+233 24 555 7890",
    role: "admin",
    status: "active",
    verified: true,
    region: "Western",
    city: "Takoradi",
    joinDate: "2023-12-01",
    lastActive: "30 minutes ago",
    managedUsers: 156,
    resolvedComplaints: 89,
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Grace Market",
    email: "grace.market@example.com",
    phone: "+233 26 444 3210",
    role: "vendor",
    status: "suspended",
    verified: false,
    region: "Central",
    city: "Cape Coast",
    joinDate: "2024-01-08",
    lastActive: "1 week ago",
    totalProducts: 8,
    totalSales: 120,
    rating: 3.2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Emmanuel Trade",
    email: "emmanuel.trade@example.com",
    phone: "+233 23 888 9999",
    role: "buyer",
    status: "pending",
    verified: false,
    region: "Northern",
    city: "Tamale",
    joinDate: "2024-01-20",
    lastActive: "3 days ago",
    totalOrders: 2,
    totalSpent: 45,
    rating: null,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]