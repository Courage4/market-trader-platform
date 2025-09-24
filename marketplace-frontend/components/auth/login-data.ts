// Login page data and types

import { User, Store } from "lucide-react"

export const demoAccounts = [
  {
    role: "Buyer",
    email: "buyer@demo.com",
    password: "demo123",
    description: "Experience shopping from local vendors",
    icon: User,
    color: "bg-purple-100 text-purple-800",
  },
  {
    role: "Vendor",
    email: "vendor@demo.com",
    password: "demo123",
    description: "Manage your products and orders",
    icon: Store,
    color: "bg-purple-200 text-purple-900",
  },
]

export const features = [
  {
    icon: "Globe" as any,
    title: "Local Market Access",
    description: "Connect with verified vendors in your area",
  },
  {
    icon: "Users" as any,
    title: "Community Driven",
    description: "Built for and by the local community",
  },
]