"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  UserCheck,
  Settings,
  Store,
  Shield,
  Users,
  Database,
  BarChart3,
  Server,
  Zap,
} from "lucide-react"
import { recentActivities } from "./dashboard-data"

export default function ActivitiesQuickActions() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_management":
        return <UserCheck className="h-4 w-4" />
      case "system_update":
        return <Settings className="h-4 w-4" />
      case "market_expansion":
        return <Store className="h-4 w-4" />
      case "policy_update":
        return <Shield className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Recent System Activities */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent System Activities
              </CardTitle>
              <CardDescription>Latest system-wide activities and changes</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View Activity Log
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Super Admin Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Super Admin Quick Actions
          </CardTitle>
          <CardDescription>System-wide administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs">User Management</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
            >
              <Store className="h-6 w-6" />
              <span className="text-xs">Market Control</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200"
            >
              <Shield className="h-6 w-6" />
              <span className="text-xs">Security Center</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-red-50 to-red-100 hover:from-red-100 hover:to-red-200"
            >
              <Database className="h-6 w-6" />
              <span className="text-xs">System Config</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs">Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-gradient-to-b from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200"
            >
              <Server className="h-6 w-6" />
              <span className="text-xs">Server Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}