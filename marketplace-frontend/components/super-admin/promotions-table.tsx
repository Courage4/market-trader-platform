"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { activePromotions, Promotion } from "./promotions-data"

interface PromotionsTableProps {
  filteredPromotions: Promotion[]
}

export default function PromotionsTable({ filteredPromotions }: PromotionsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "expired":
        return <Badge variant="secondary">Expired</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-200 text-yellow-700">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRemainingDays = (endDate: Date) => {
    const now = new Date()
    const remaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, remaining)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Promotions ({filteredPromotions.length})</CardTitle>
            <CardDescription>Monitor and manage vendor promotions</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product & Vendor</th>
                <th className="text-center py-3 px-4">Plan</th>
                <th className="text-center py-3 px-4">Status</th>
                <th className="text-center py-3 px-4">Duration</th>
                <th className="text-center py-3 px-4">Performance</th>
                <th className="text-center py-3 px-4">Revenue</th>
                <th className="text-center py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id} className="border-b hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium">{promotion.productName}</div>
                      <div className="text-sm text-muted-foreground">{promotion.vendorName}</div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <Badge variant="outline">{promotion.planName}</Badge>
                  </td>

                  <td className="py-4 px-4 text-center">{getStatusBadge(promotion.status)}</td>

                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {promotion.status === "active"
                          ? `${getRemainingDays(promotion.endDate)} days left`
                          : "Ended"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {promotion.startDate.toLocaleDateString()} - {promotion.endDate.toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-center gap-4">
                        <span>{promotion.views.toLocaleString()} views</span>
                        <span>{promotion.clicks} clicks</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{promotion.conversions} conversions</div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="space-y-1">
                      <div className="font-medium">${promotion.revenue.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Cost: ${promotion.totalCost}</div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Promotion
                        </DropdownMenuItem>
                        {promotion.status === "active" && (
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            Extend Duration
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel Promotion
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPromotions.length === 0 && (
          <div className="py-12 text-center">
            <MoreHorizontal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No promotions found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}