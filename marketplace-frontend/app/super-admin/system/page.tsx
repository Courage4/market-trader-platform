"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Database,
  Server,
  Shield,
  Globe,
  HardDrive,
  RefreshCw,
  AlertTriangle,
  Save,
  Upload,
  Eye,
} from "lucide-react"

export default function SuperAdminSystem() {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailVerification: true,
    smsNotifications: true,
    pushNotifications: true,
    autoBackup: true,
    debugMode: false,
    apiRateLimit: "1000",
    sessionTimeout: "24",
    maxFileSize: "10",
    systemName: "MarketPlace Ghana",
    systemDescription: "Local market trader platform connecting vendors and buyers",
    supportEmail: "support@marketplace.gh",
    systemTimezone: "Africa/Accra",
  })

  const serverStats = [
    {
      name: "Primary Server",
      status: "online",
      uptime: "99.98%",
      load: "34%",
      memory: "8.2/16 GB",
      storage: "450/1000 GB",
      location: "Accra, Ghana",
    },
    {
      name: "Backup Server",
      status: "online",
      uptime: "99.95%",
      load: "12%",
      memory: "3.1/16 GB",
      storage: "230/1000 GB",
      location: "Kumasi, Ghana",
    },
    {
      name: "CDN Server",
      status: "online",
      uptime: "99.99%",
      load: "45%",
      memory: "12.5/32 GB",
      storage: "780/2000 GB",
      location: "Global",
    },
  ]

  const databaseStats = [
    {
      name: "User Database",
      status: "healthy",
      size: "2.4 GB",
      connections: "156/500",
      queries: "2,450/min",
      lastBackup: "2 hours ago",
    },
    {
      name: "Product Database",
      status: "healthy",
      size: "5.8 GB",
      connections: "89/300",
      queries: "1,890/min",
      lastBackup: "1 hour ago",
    },
    {
      name: "Transaction Database",
      status: "warning",
      size: "12.3 GB",
      connections: "245/400",
      queries: "3,670/min",
      lastBackup: "30 minutes ago",
    },
  ]

  const securityAlerts = [
    {
      id: 1,
      type: "security",
      title: "SSL Certificate Renewal Required",
      description: "SSL certificate expires in 15 days",
      priority: "medium",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "database",
      title: "Database Connection Spike",
      description: "Transaction database approaching connection limit",
      priority: "high",
      time: "30 minutes ago",
    },
    {
      id: 3,
      type: "system",
      title: "Disk Space Warning",
      description: "Primary server storage at 85% capacity",
      priority: "medium",
      time: "1 hour ago",
    },
  ]

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
      case "healthy":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Online
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Warning
          </Badge>
        )
      case "offline":
      case "error":
        return <Badge variant="destructive">Offline</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">System Configuration</h1>
              <p className="text-muted-foreground">Manage system settings, servers, and security</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* System Settings */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure global system preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Settings */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Basic Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={systemSettings.systemName}
                      onChange={(e) => handleSettingChange("systemName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={systemSettings.supportEmail}
                      onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemDescription">System Description</Label>
                  <Textarea
                    id="systemDescription"
                    value={systemSettings.systemDescription}
                    onChange={(e) => handleSettingChange("systemDescription", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">System Timezone</Label>
                  <Select
                    value={systemSettings.systemTimezone}
                    onValueChange={(value) => handleSettingChange("systemTimezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Accra">Africa/Accra (GMT)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Feature Controls
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-muted-foreground">Temporarily disable the platform</p>
                    </div>
                    <Switch
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>User Registration</Label>
                      <p className="text-sm text-muted-foreground">Allow new users to register</p>
                    </div>
                    <Switch
                      checked={systemSettings.userRegistration}
                      onCheckedChange={(checked) => handleSettingChange("userRegistration", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={systemSettings.emailVerification}
                      onCheckedChange={(checked) => handleSettingChange("emailVerification", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Performance Settings */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Performance Settings
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiRateLimit">API Rate Limit (per hour)</Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={systemSettings.apiRateLimit}
                      onChange={(e) => handleSettingChange("apiRateLimit", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Security Alerts
              </CardTitle>
              <CardDescription>Critical system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{alert.title}</h5>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                      </div>
                      {getPriorityBadge(alert.priority)}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Server Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Server Infrastructure
            </CardTitle>
            <CardDescription>Monitor server health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serverStats.map((server, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{server.name}</h4>
                      {getStatusBadge(server.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="font-medium">{server.uptime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Load:</span>
                        <span className="font-medium">{server.load}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory:</span>
                        <span className="font-medium">{server.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{server.storage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{server.location}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Systems
            </CardTitle>
            <CardDescription>Monitor database health and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Database</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Size</th>
                    <th className="text-center py-3 px-4">Connections</th>
                    <th className="text-center py-3 px-4">Queries/min</th>
                    <th className="text-center py-3 px-4">Last Backup</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {databaseStats.map((db, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{db.name}</td>
                      <td className="py-3 px-4 text-center">{getStatusBadge(db.status)}</td>
                      <td className="py-3 px-4 text-center">{db.size}</td>
                      <td className="py-3 px-4 text-center">{db.connections}</td>
                      <td className="py-3 px-4 text-center">{db.queries}</td>
                      <td className="py-3 px-4 text-center">{db.lastBackup}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex gap-1 justify-center">
                          <Button size="sm" variant="outline">
                            <HardDrive className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
