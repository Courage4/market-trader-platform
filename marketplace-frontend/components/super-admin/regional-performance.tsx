"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3 } from "lucide-react"
import { regionalStats } from "./dashboard-data"

export default function RegionalPerformance() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Regional Performance Overview
        </CardTitle>
        <CardDescription>Performance metrics across all regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Region</th>
                <th className="text-center py-2 px-4">Users</th>
                <th className="text-center py-2 px-4">Vendors</th>
                <th className="text-center py-2 px-4">Transactions</th>
                <th className="text-center py-2 px-4">Growth</th>
              </tr>
            </thead>
            <tbody>
              {regionalStats.map((region, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{region.region}</td>
                  <td className="py-3 px-4 text-center">{region.users.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{region.vendors.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{region.transactions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {region.growth}
                    </Badge>
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