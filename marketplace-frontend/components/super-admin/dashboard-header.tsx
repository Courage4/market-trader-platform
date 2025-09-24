"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, Globe } from "lucide-react"

export default function SuperAdminDashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system oversight and management</p>
        </div>
      </div>
      <Badge variant="outline" className="border-purple-200 text-purple-700">
        <Globe className="h-3 w-3 mr-1" />
        System-wide Access
      </Badge>
    </div>
  )
}