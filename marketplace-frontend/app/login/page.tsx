"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Sparkles, CheckCircle, Globe, Users, Store } from "lucide-react"

const demoAccounts = [
  {
    role: "Buyer",
    email: "buyer@demo.com",
    password: "demo123",
    description: "Experience shopping from local vendors",
    icon: User,
    color: "bg-purple-100 text-purple-800",
  },
  {
    role: "Vendor",
    email: "vendor@demo.com",
    password: "demo123",
    description: "Manage your products and orders",
    icon: Store,
    color: "bg-purple-200 text-purple-900",
  },
]

const features = [
  {
    icon: Globe,
    title: "Local Market Access",
    description: "Connect with verified vendors in your area",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built for and by the local community",
  },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Function to determine user role based on email
  const getUserRole = (email: string) => {
    if (email.includes("vendor")) return "vendor"
    if (email.includes("admin")) return "admin"
    if (email.includes("super")) return "super-admin"
    return "buyer" // default role
  }

  const handleDemoLogin = (demoAccount: (typeof demoAccounts)[0]) => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Determine role based on email
      const userRole = getUserRole(email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Login Successful",
        description: "Welcome back to MarketPlace Ghana!",
      })

      // Redirect based on role
      setTimeout(() => {
        switch (userRole) {
          case "vendor":
            window.location.href = "/vendor/dashboard"
            break
          case "buyer":
            window.location.href = "/buyer/dashboard"
            break
          case "admin":
            window.location.href = "/admin/dashboard"
            break
          case "super-admin":
            window.location.href = "/super-admin/dashboard"
            break
          default:
            window.location.href = "/"
        }
      }, 500)
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-300 rounded-full opacity-15 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-100 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-600">Sign in to your MarketPlace Ghana account</p>
            </div>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Sign In</CardTitle>
              <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Accounts Section */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                Demo Accounts
              </CardTitle>
              <CardDescription>Try the platform with pre-configured demo accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer"
                  onClick={() => handleDemoLogin(account)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${account.color}`}>
                      <account.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{account.role}</div>
                      <div className="text-sm text-gray-600">{account.description}</div>
                    </div>
                  </div>
                  <Badge className="bg-purple-200 text-purple-800">Try Now</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:block">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Badge className="bg-purple-100 text-purple-800">
                <Sparkles className="w-3 h-3 mr-1" />
                Modern Platform
              </Badge>
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Empowering
                </span>{" "}
                Local Commerce
              </h2>
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Join thousands of users who trust our platform for their daily market needs
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg"
                >
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-xl">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-white shadow-xl">
              <h3 className="font-semibold mb-2">Ready to get started?</h3>
              <p className="text-purple-100 mb-4">Join our growing community today</p>
              <Link href="/register">
                <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
