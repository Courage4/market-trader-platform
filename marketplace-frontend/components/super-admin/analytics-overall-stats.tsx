import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Store, ShoppingCart, DollarSign, TrendingUp, Target } from "lucide-react"
import { overallStats, OverallStats } from "./analytics-data"

export default function AnalyticsOverallStats() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-4 w-4" />
      case "Store":
        return <Store className="h-4 w-4" />
      case "ShoppingCart":
        return <ShoppingCart className="h-4 w-4" />
      case "DollarSign":
        return <DollarSign className="h-4 w-4" />
      case "TrendingUp":
        return <TrendingUp className="h-4 w-4" />
      case "Target":
        return <Target className="h-4 w-4" />
      default:
        return <TrendingUp className="h-4 w-4" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      case "stable":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {overallStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className="text-muted-foreground">
              {getIcon(stat.icon)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${getTrendColor(stat.trend)}`}
              >
                {stat.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}