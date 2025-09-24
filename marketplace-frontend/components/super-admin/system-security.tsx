"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { securityAlerts, SecurityAlert } from "./system-data"

export default function SystemSecurity() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(securityAlerts)
  const { toast } = useToast()

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "suspicious_login":
        return <Shield className="h-4 w-4" />
      case "failed_auth":
        return <XCircle className="h-4 w-4" />
      case "data_breach":
        return <AlertTriangle className="h-4 w-4" />
      case "unauthorized_access":
        return <Shield className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const handleResolveAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
    toast({
      title: "Alert Resolved",
      description: "Security alert has been marked as resolved.",
    })
  }

  const handleDeleteAlert = (alertId: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
    toast({
      title: "Alert Deleted",
      description: "Security alert has been deleted.",
    })
  }

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved)
  const criticalAlerts = alerts.filter(alert => alert.severity === "critical" && !alert.resolved)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Alerts
            </CardTitle>
            <CardDescription>Monitor and manage security threats and incidents</CardDescription>
          </div>
          <div className="flex gap-2">
            {criticalAlerts.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {criticalAlerts.length} Critical
              </Badge>
            )}
            <Badge variant="secondary">
              {unresolvedAlerts.length} Unresolved
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 border rounded-lg ${
                alert.resolved ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(alert.type)}
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    {alert.resolved && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Source: {alert.source}</span>
                    <span>•</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>

                {!alert.resolved && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleResolveAlert(alert.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Delete Alert
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>

        {alerts.length === 0 && (
          <div className="py-12 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Security Alerts</h3>
            <p className="text-muted-foreground">Your system is secure with no active alerts</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}