"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Shield, Lock, Eye, EyeOff, CheckCircle, Clock } from "lucide-react"

interface ForgotPasswordFormsProps {
  step: "email" | "code" | "reset"
  email: string
  setEmail: (value: string) => void
  resetCode: string
  setResetCode: (value: string) => void
  newPassword: string
  setNewPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  isLoading: boolean
  countdown: number
  onSendCode: (e: React.FormEvent) => void
  onVerifyCode: (e: React.FormEvent) => void
  onResetPassword: (e: React.FormEvent) => void
  onResendCode: () => void
}

export default function ForgotPasswordForms({
  step,
  email,
  setEmail,
  resetCode,
  setResetCode,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  isLoading,
  countdown,
  onSendCode,
  onVerifyCode,
  onResetPassword,
  onResendCode,
}: ForgotPasswordFormsProps) {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const getIcon = () => {
    switch (step) {
      case "email": return <Mail className="w-6 h-6 text-purple-600" />
      case "code": return <Shield className="w-6 h-6 text-purple-600" />
      case "reset": return <Lock className="w-6 h-6 text-purple-600" />
      default: return <Mail className="w-6 h-6 text-purple-600" />
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            {getIcon()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step 1: Email Input */}
        {step === "email" && (
          <form onSubmit={onSendCode} className="space-y-4">
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
          <form onSubmit={onVerifyCode} className="space-y-4">
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
                <Button type="button" variant="ghost" onClick={onResendCode} disabled={isLoading}>
                  Resend Code
                </Button>
              )}
            </div>
          </form>
        )}

        {/* Step 3: Password Reset */}
        {step === "reset" && (
          <form onSubmit={onResetPassword} className="space-y-4">
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
  )
}