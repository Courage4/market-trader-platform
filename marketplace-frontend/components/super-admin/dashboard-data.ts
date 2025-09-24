// Super admin dashboard data and types

import {
  Users,
  MapPin,
  DollarSign,
  AlertTriangle,
  UserCheck,
  Settings,
  Store,
  Shield,
  Activity,
  Database,
  Server,
  Zap,
} from "lucide-react"

export interface SystemStat {
  title: string
  value: string
  change: string
  icon: any
  color: string
  trend: "up" | "down" | "stable"
}

export interface RegionalStat {
  region: string
  users: number
  vendors: number
  transactions: number
  growth: string
}

export interface SystemHealth {
  metric: string
  value: number
  status: "excellent" | "good" | "warning" | "critical"
  color: string
}

export interface CriticalAlert {
  id: number
  type: "security" | "system" | "financial"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  time: string
}

export interface RecentActivity {
  id: number
  type: "user_management" | "system_update" | "market_expansion" | "policy_update"
  message: string
  time: string
  status: "completed" | "in_progress" | "pending"
}

export const systemStats: SystemStat[] = [
  {
    title: "Total Platform Users",
    value: "15,847",
    change: "+18% from last month",
    icon: Users,
    color: "text-blue-600",
    trend: "up",
  },
  {
    title: "Active Markets",
    value: "52",
    change: "Across 16 regions",
    icon: MapPin,
    color: "text-green-600",
    trend: "stable",
  },
  {
    title: "System Revenue",
    value: "$284,500",
    change: "+24% from last month",
    icon: DollarSign,
    color: "text-purple-600",
    trend: "up",
  },
  {
    title: "Critical Alerts",
    value: "7",
    change: "3 require immediate attention",
    icon: AlertTriangle,
    color: "text-red-600",
    trend: "down",
  },
]

export const regionalStats: RegionalStat[] = [
  { region: "Greater Accra", users: 4521, vendors: 892, transactions: 15420, growth: "+15%" },
  { region: "Ashanti", users: 3214, vendors: 678, transactions: 11230, growth: "+12%" },
  { region: "Western", users: 2103, vendors: 445, transactions: 7890, growth: "+8%" },
  { region: "Central", users: 1876, vendors: 398, transactions: 6540, growth: "+10%" },
  { region: "Eastern", users: 1654, vendors: 342, transactions: 5670, growth: "+6%" },
]

export const systemHealth: SystemHealth[] = [
  { metric: "Server Uptime", value: 99.98, status: "excellent", color: "bg-green-500" },
  { metric: "Database Performance", value: 97.2, status: "excellent", color: "bg-green-500" },
  { metric: "API Response Time", value: 92.5, status: "good", color: "bg-blue-500" },
  { metric: "Payment Gateway", value: 99.1, status: "excellent", color: "bg-green-500" },
  { metric: "Mobile App Performance", value: 89.3, status: "good", color: "bg-blue-500" },
  { metric: "User Satisfaction", value: 94.7, status: "excellent", color: "bg-green-500" },
]

export const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    type: "security",
    title: "Multiple Failed Login Attempts",
    description: "User account: vendor_12345 has 15 failed login attempts",
    priority: "high",
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "system",
    title: "Database Connection Spike",
    description: "Unusual database connection pattern detected",
    priority: "medium",
    time: "12 minutes ago",
  },
  {
    id: 3,
    type: "financial",
    title: "Payment Processing Delay",
    description: "Payment gateway response time increased by 300%",
    priority: "high",
    time: "18 minutes ago",
  },
]

export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    type: "user_management",
    message: "Bulk user verification completed for Tamale region",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 2,
    type: "system_update",
    message: "Platform security patch deployed successfully",
    time: "3 hours ago",
    status: "completed",
  },
  {
    id: 3,
    type: "market_expansion",
    message: "New market integration: Techiman Market approved",
    time: "5 hours ago",
    status: "completed",
  },
  {
    id: 4,
    type: "policy_update",
    message: "Terms of Service updated - vendor notification sent",
    time: "8 hours ago",
    status: "completed",
  },
]