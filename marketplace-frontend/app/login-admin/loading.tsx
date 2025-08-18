import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield } from "lucide-react"

export default function SuperAdminLoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <Skeleton className="h-8 w-48 mx-auto bg-white/20" />
          <Skeleton className="h-4 w-64 mx-auto bg-white/10" />
        </div>

        {/* Security Warning */}
        <div className="border border-yellow-500/50 bg-yellow-500/10 rounded-lg p-4">
          <Skeleton className="h-4 w-full bg-yellow-500/20" />
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="space-y-1">
            <Skeleton className="h-8 w-32 mx-auto bg-white/20" />
            <Skeleton className="h-4 w-48 mx-auto bg-white/10" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-white/20" />
              <Skeleton className="h-10 w-full bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 bg-white/20" />
              <Skeleton className="h-10 w-full bg-white/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-white/20" />
              <Skeleton className="h-10 w-full bg-white/10" />
              <Skeleton className="h-3 w-48 bg-white/10" />
            </div>
            <Skeleton className="h-10 w-full bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
            <div className="text-center mt-6">
              <Skeleton className="h-4 w-32 mx-auto bg-white/10" />
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center space-y-1">
          <Skeleton className="h-3 w-64 mx-auto bg-white/10" />
          <Skeleton className="h-3 w-56 mx-auto bg-white/10" />
        </div>
      </div>
    </div>
  )
}
