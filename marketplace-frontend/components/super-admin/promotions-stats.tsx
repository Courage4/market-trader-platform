"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { promotionStats } from "./promotions-data"

export default function PromotionsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {promotionStats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === 'number' && stat.value > 1000 
                  ? stat.value.toLocaleString() 
                  : typeof stat.value === 'number' && stat.value < 100
                  ? `+${stat.value}%`
                  : stat.value === 28450.75
                  ? `$${stat.value.toLocaleString()}`
                  : stat.value
                }
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}