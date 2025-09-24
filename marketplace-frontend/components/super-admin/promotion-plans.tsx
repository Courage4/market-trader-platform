"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { PROMOTION_PLANS } from "@/lib/promotion-types"

export default function PromotionPlans() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Available Promotion Plans</CardTitle>
        <CardDescription>Manage promotion plans available to vendors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROMOTION_PLANS.map((plan) => (
            <Card key={plan.id} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{plan.name}</h4>
                  {plan.popular && (
                    <Badge variant="default" className="bg-primary">
                      Popular
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.duration} days</span>
                  </div>
                  {plan.discount && (
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {plan.discount}% OFF
                    </Badge>
                  )}
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}