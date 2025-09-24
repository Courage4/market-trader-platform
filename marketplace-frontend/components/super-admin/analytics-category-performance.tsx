import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Star, TrendingUp } from "lucide-react"
import { categoryPerformance, CategoryPerformance } from "./analytics-data"

export default function AnalyticsCategoryPerformance() {
  const getGrowthColor = (growth: number) => {
    if (growth >= 20) return "text-green-600"
    if (growth >= 10) return "text-blue-600"
    return "text-orange-600"
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Category Performance
        </CardTitle>
        <CardDescription>Performance metrics by product category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {categoryPerformance.map((category, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {category.category}
                </h4>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getGrowthColor(category.growth)}`}
                  >
                    +{category.growth}%
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Products</p>
                  <p className="font-medium">{category.products.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Orders</p>
                  <p className="font-medium">{category.orders.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="font-medium">₵{category.revenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{category.avgRating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}