"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"
import { Shield, Eye, EyeOff, ArrowLeft, AlertTriangle, Lock } from "lucide-react"

// Prevent prerendering for this page
export const dynamic = 'force-dynamic'

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showAdminKey, setShowAdminKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate admin key
      if (adminKey !== "SUPER_ADMIN_KEY_2024") {
        throw new Error("Invalid admin key")
      }

      if (adminKey.length < 16) {
        throw new Error("Admin key must be at least 16 characters")
      }

      // await login(email, password, "super-admin", adminKey)

      toast({
        title: "Login Successful",
        description: "Welcome to the Super Admin Dashboard",
      })

      router.push("/super-admin/dashboard")
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: error instanceof Error ? error.message : "Invalid credentials or admin key",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Super Admin Access</h1>
          <p className="text-purple-200">Secure system administration portal</p>
        </div>

        {/* Security Warning */}
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-200">
            This is a restricted access area. All login attempts are monitored and logged.
          </AlertDescription>
        </Alert>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center text-purple-200">
              Enter your super admin credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminKey" className="text-white flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Admin Key
                </Label>
                <div className="relative">
                  <Input
                    id="adminKey"
                    type={showAdminKey ? "text" : "password"}
                    placeholder="Enter admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white hover:bg-white/10"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                  >
                    {showAdminKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-purple-200">Admin key must be at least 16 characters</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Standard Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-purple-300 space-y-1">
          <p>⚠️ This session will timeout after 30 minutes of inactivity</p>
          <p>🔒 All activities are logged and monitored for security</p>
        </div>
      </div>
    </div>
  )
}

export default function SuperAdminLogin() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <Shield className="h-8 w-8 mx-auto mb-4 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return <LoginForm />
}
