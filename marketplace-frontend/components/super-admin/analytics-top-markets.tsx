import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Store, Package, ShoppingCart, DollarSign, Star } from "lucide-react"
import { topMarkets, TopMarket } from "./analytics-data"

export default function AnalyticsTopMarkets() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Top Performing Markets
        </CardTitle>
        <CardDescription>Leading markets by performance and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {topMarkets.map((market, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{market.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{market.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{market.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Vendors</p>
                    <p className="font-medium">{market.vendors}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Products</p>
                    <p className="font-medium">{market.products}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Orders</p>
                    <p className="font-medium">{market.orders}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-medium">₵{market.revenue}</p>
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