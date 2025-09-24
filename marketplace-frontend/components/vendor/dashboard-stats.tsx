import { Package, DollarSign, Eye, Star, TrendingUp, TrendingDown } from "lucide-react"
import { vendorStats, VendorStat } from "./dashboard-data"

export default function DashboardStats() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Package":
        return Package
      case "DollarSign":
        return DollarSign
      case "Eye":
        return Eye
      case "Star":
        return Star
      default:
        return Package
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {vendorStats.map((stat, index) => {
        const Icon = getIcon(stat.icon)
        const TrendIcon = stat.changeType === 'positive' ? TrendingUp : 
                          stat.changeType === 'negative' ? TrendingDown : null
        return (
          <div key={index} className="card-interactive p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              {TrendIcon && (
                <TrendIcon className={`h-5 w-5 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`} />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className={`text-sm font-medium flex items-center gap-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 
                stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {stat.change}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}