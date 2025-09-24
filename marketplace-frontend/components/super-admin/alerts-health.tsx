"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Activity } from "lucide-react"
import { criticalAlerts, systemHealth } from "./dashboard-data"

export default function AlertsHealth() {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
      {/* Critical Alerts */}
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Critical System Alerts
              </CardTitle>
              <CardDescription>Immediate attention required</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All Alerts
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {criticalAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-4 border border-red-200 rounded-lg bg-red-50/50"
              >
                <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    {getPriorityBadge(alert.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <Button size="sm" variant="outline">
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            System Health
          </CardTitle>
          <CardDescription>Real-time system metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.metric}</span>
                  <span className="text-sm text-muted-foreground">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex justify-end">
                  <Badge variant={metric.status === "excellent" ? "default" : "secondary"} className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}