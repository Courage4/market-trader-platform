"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Mail, CheckCircle, Lock, Eye, EyeOff, Shield, Clock } from "lucide-react"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email")
  const [email, setEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { toast } = useToast()

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStep("code")
      setCountdown(60)

      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      toast({
        title: "Reset Code Sent",
        description: "Please check your email for the reset code.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (resetCode === "123456") {
        setStep("reset")
        toast({
          title: "Code Verified",
          description: "Please set your new password.",
        })
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your code and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive",
      })
      return
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully.",
      })

      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resendCode = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCountdown(60)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      toast({
        title: "Code Resent",
        description: "A new reset code has been sent to your email.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">
              {step === "email" && "Forgot Password"}
              {step === "code" && "Verify Code"}
              {step === "reset" && "Reset Password"}
            </h1>
            <p className="text-gray-600">
              {step === "email" && "Enter your email to receive a reset code"}
              {step === "code" && "Enter the 6-digit code sent to your email"}
              {step === "reset" && "Create a new password for your account"}
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full">
                {step === "email" && <Mail className="w-6 h-6 text-purple-600" />}
                {step === "code" && <Shield className="w-6 h-6 text-purple-600" />}
                {step === "reset" && <Lock className="w-6 h-6 text-purple-600" />}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Email Input */}
            {step === "email" && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending Code..." : "Send Reset Code"}
                </Button>
              </form>
            )}

            {/* Step 2: Code Verification */}
            {step === "code" && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Reset Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                  <p className="text-sm text-gray-600 text-center">Code sent to {email}</p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>

                <div className="text-center">
                  {countdown > 0 ? (
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Resend code in {countdown}s</span>
                    </div>
                  ) : (
                    <Button type="button" variant="ghost" onClick={resendCode} disabled={isLoading}>
                      Resend Code
                    </Button>
                  )}
                </div>
              </form>
            )}

            {/* Step 3: Password Reset */}
            {step === "reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle
                        className={`w-4 h-4 ${newPassword.length >= 8 ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span>At least 8 characters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle
                        className={`w-4 h-4 ${/[A-Z]/.test(newPassword) ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span>One uppercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle
                        className={`w-4 h-4 ${/[a-z]/.test(newPassword) ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span>One lowercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle
                        className={`w-4 h-4 ${/\d/.test(newPassword) ? "text-green-500" : "text-gray-400"}`}
                      />
                      <span>One number</span>
                    </li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
