"use client"

import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Heart,
  MessageCircle,
  Eye,
  Search
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
}

function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  const changeColor = {
    positive: 'text-emerald-600',
    negative: 'text-red-600',
    neutral: 'text-slate-600'
  }

  const changeBg = {
    positive: 'bg-emerald-50',
    negative: 'bg-red-50',
    neutral: 'bg-slate-50'
  }

  const ChangeIcon = changeType === 'positive' ? TrendingUp : changeType === 'negative' ? TrendingDown : null

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${changeBg[changeType]} ${changeColor[changeType]}`}>
          {ChangeIcon && <ChangeIcon className="w-3 h-3" />}
          <span>{change}</span>
        </div>
        <span className="text-xs text-slate-500">from last month</span>
      </div>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  subtitle: string
  percentage: number
  color: 'blue' | 'emerald' | 'amber' | 'red'
}

function StatsCard({ title, value, subtitle, percentage, color }: StatsCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      light: 'bg-blue-50'
    },
    emerald: {
      bg: 'bg-emerald-500',
      text: 'text-emerald-600',
      light: 'bg-emerald-50'
    },
    amber: {
      bg: 'bg-amber-500',
      text: 'text-amber-600',
      light: 'bg-amber-50'
    },
    red: {
      bg: 'bg-red-500',
      text: 'text-red-600',
      light: 'bg-red-50'
    }
  }

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${colorClasses[color].bg}`}></div>
      </div>
      
      <div className="mb-4">
        <p className="text-3xl font-bold text-slate-900 mb-1">{value}</p>
        <p className="text-sm text-slate-600">{subtitle}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Progress</span>
          <span className={`font-medium ${colorClasses[color].text}`}>{percentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${colorClasses[color].bg} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export function DashboardCards() {
  const metrics = [
    {
      title: "Products Viewed",
      value: "127",
      change: "+23%",
      changeType: 'positive' as const,
      icon: Eye
    },
    {
      title: "Vendors Contacted",
      value: "18",
      change: "+12%",
      changeType: 'positive' as const,
      icon: MessageCircle
    },
    {
      title: "Favorites Saved",
      value: "34",
      change: "+8%",
      changeType: 'positive' as const,
      icon: Heart
    },
    {
      title: "Searches Made",
      value: "89",
      change: "+15%",
      changeType: 'positive' as const,
      icon: Search
    }
  ]

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Market Exploration"
          value="73%"
          subtitle="Markets visited"
          percentage={73}
          color="emerald"
        />
        <StatsCard
          title="Vendor Connections"
          value="45 vendors"
          subtitle="This month"
          percentage={68}
          color="blue"
        />
        <StatsCard
          title="Activity Score"
          value="8.7"
          subtitle="Engagement level"
          percentage={87}
          color="amber"
        />
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to Ghana Marketplace!</h2>
          <p className="text-blue-100 mb-6">Discover fresh products from local vendors across Ghana.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Explore Markets</h3>
              <p className="text-blue-100 text-sm">Browse products from 6 major markets</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Connect</h3>
              <p className="text-blue-100 text-sm">Chat with 234+ active vendors</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-1">Fresh Products</h3>
              <p className="text-blue-100 text-sm">1,200+ products available daily</p>
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      </div>
    </div>
  )
}

export { MetricCard, StatsCard }