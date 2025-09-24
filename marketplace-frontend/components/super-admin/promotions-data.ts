// Super admin promotions data and types

import { Star, Zap, DollarSign, TrendingUp } from "lucide-react"

export interface PromotionStat {
  title: string
  value: string | number
  icon: any
  color: string
  description: string
}

export interface Promotion {
  id: string
  productName: string
  vendorName: string
  vendorId: string
  planName: string
  planId: string
  startDate: Date
  endDate: Date
  status: "active" | "expired" | "pending" | "cancelled"
  totalCost: number
  views: number
  clicks: number
  conversions: number
  revenue: number
}

export const promotionStats: PromotionStat[] = [
  {
    title: "Total Promotions",
    value: 1247,
    icon: Star,
    color: "text-yellow-600",
    description: "All time",
  },
  {
    title: "Active Promotions",
    value: 342,
    icon: Zap,
    color: "text-green-600",
    description: "Currently running",
  },
  {
    title: "Total Revenue",
    value: 28450.75,
    icon: DollarSign,
    color: "text-blue-600",
    description: "From promotions",
  },
  {
    title: "Average Boost",
    value: 285,
    icon: TrendingUp,
    color: "text-purple-600",
    description: "In product visibility",
  },
]

export const activePromotions: Promotion[] = [
  {
    id: "1",
    productName: "Fresh Organic Tomatoes",
    vendorName: "Fresh Farm Market",
    vendorId: "vendor_123",
    planName: "Monthly Pro",
    planId: "monthly",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-02-15"),
    status: "active",
    totalCost: 19.99,
    views: 2847,
    clicks: 456,
    conversions: 23,
    revenue: 287.5,
  },
  {
    id: "2",
    productName: "Sweet Red Apples",
    vendorName: "Green Valley Produce",
    vendorId: "vendor_456",
    planName: "Weekly Boost",
    planId: "weekly",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-01-27"),
    status: "active",
    totalCost: 5.99,
    views: 1234,
    clicks: 189,
    conversions: 12,
    revenue: 156.8,
  },
  {
    id: "3",
    productName: "Organic Carrots",
    vendorName: "Fresh Farm Market",
    vendorId: "vendor_123",
    planName: "Quarterly Premium",
    planId: "quarterly",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2024-03-01"),
    status: "active",
    totalCost: 49.99,
    views: 4521,
    clicks: 678,
    conversions: 45,
    revenue: 567.25,
  },
  {
    id: "4",
    productName: "Fresh Bread",
    vendorName: "Local Bakery",
    vendorId: "vendor_789",
    planName: "Monthly Pro",
    planId: "monthly",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-01-25"),
    status: "expired",
    totalCost: 19.99,
    views: 1876,
    clicks: 234,
    conversions: 18,
    revenue: 198.45,
  },
]