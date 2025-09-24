import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, TrendingUp } from "lucide-react"
import { regionalStats, RegionalStats } from "./analytics-data"

export default function AnalyticsRegionalPerformance() {
  const getGrowthColor = (growth: number) => {
    if (growth >= 20) return "text-green-600"
    if (growth >= 10) return "text-blue-600"
    return "text-orange-600"
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Regional Performance
        </CardTitle>
        <CardDescription>Performance metrics across different regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Region</th>
                <th className="text-right py-3 px-4">Users</th>
                <th className="text-right py-3 px-4">Vendors</th>
                <th className="text-right py-3 px-4">Transactions</th>
                <th className="text-right py-3 px-4">Revenue</th>
                <th className="text-center py-3 px-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {regionalStats.map((region, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{region.region}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium">{region.users.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium">{region.vendors.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium">{region.transactions.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-medium">₵{region.revenue.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getGrowthColor(region.growth)}`}
                      >
                        +{region.growth}%
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}