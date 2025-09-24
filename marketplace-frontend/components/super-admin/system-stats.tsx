"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { systemStats, SystemStat } from "./dashboard-data"

export default function SystemStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {systemStats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                {stat.change}
              </p>
            </CardContent>
            <div
              className={`absolute bottom-0 left-0 w-full h-1 ${
                stat.trend === "up" ? "bg-green-500" : stat.trend === "down" ? "bg-red-500" : "bg-blue-500"
              }`}
            />
          </Card>
        )
      })}
    </div>
  )
}