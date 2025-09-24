import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { serverHealth, databaseHealth, ServerHealth, DatabaseHealth } from "./system-data"

export default function SystemHealth() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Server Health */}
      <Card>
        <CardHeader>
          <CardTitle>Server Health</CardTitle>
          <CardDescription>Monitor server performance and resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverHealth.map((server, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{server.name}</h4>
                  <Badge className={getStatusColor(server.status)}>
                    {server.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Uptime</p>
                    <p className="font-medium">{server.uptime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-medium">{server.responseTime}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>{server.cpuUsage}%</span>
                  </div>
                  <Progress 
                    value={server.cpuUsage} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>{server.memoryUsage}%</span>
                  </div>
                  <Progress 
                    value={server.memoryUsage} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span>{server.diskUsage}%</span>
                  </div>
                  <Progress 
                    value={server.diskUsage} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Health */}
      <Card>
        <CardHeader>
          <CardTitle>Database Health</CardTitle>
          <CardDescription>Monitor database performance and connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {databaseHealth.map((database, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{database.name}</h4>
                  <Badge className={getStatusColor(database.status)}>
                    {database.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Connections</p>
                    <p className="font-medium">{database.connections}/{database.maxConnections}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Response Time</p>
                    <p className="font-medium">{database.responseTime}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Connection Usage</span>
                    <span>{Math.round((database.connections / database.maxConnections) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(database.connections / database.maxConnections) * 100} 
                    className="h-2"
                  />
                  
                  <div className="text-sm">
                    <p className="text-muted-foreground">Queries Today</p>
                    <p className="font-medium">{database.queryCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}