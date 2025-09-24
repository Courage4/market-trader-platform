import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Store, ShoppingCart, DollarSign } from "lucide-react"
import { growthTimeline, GrowthTimeline } from "./analytics-data"

export default function AnalyticsGrowthTimeline() {
  const getGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Growth Timeline
        </CardTitle>
        <CardDescription>Monthly growth trends over the past 10 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {growthTimeline.map((period, index) => {
            const prevPeriod = index > 0 ? growthTimeline[index - 1] : null
            const userGrowth = prevPeriod ? getGrowthRate(period.users, prevPeriod.users) : 0
            const vendorGrowth = prevPeriod ? getGrowthRate(period.vendors, prevPeriod.vendors) : 0
            const orderGrowth = prevPeriod ? getGrowthRate(period.orders, prevPeriod.orders) : 0
            const revenueGrowth = prevPeriod ? getGrowthRate(period.revenue, prevPeriod.revenue) : 0

            return (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">{period.period}</h4>
                  {index > 0 && (
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        Users: {userGrowth > 0 ? '+' : ''}{userGrowth.toFixed(1)}%
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Revenue: {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Users</p>
                      <p className="font-medium">{period.users.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Vendors</p>
                      <p className="font-medium">{period.vendors.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Orders</p>
                      <p className="font-medium">{period.orders.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">₵{period.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}