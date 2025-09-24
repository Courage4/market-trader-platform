"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ForgotPasswordHeaderProps {
  step: "email" | "code" | "reset"
}

export default function ForgotPasswordHeader({ step }: ForgotPasswordHeaderProps) {
  const getTitle = () => {
    switch (step) {
      case "email": return "Forgot Password"
      case "code": return "Verify Code"
      case "reset": return "Reset Password"
      default: return "Forgot Password"
    }
  }

  const getDescription = () => {
    switch (step) {
      case "email": return "Enter your email to receive a reset code"
      case "code": return "Enter the 6-digit code sent to your email"
      case "reset": return "Create a new password for your account"
      default: return "Enter your email to receive a reset code"
    }
  }

  return (
    <div className="mb-8">
      <Link
        href="/login"
        className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </Link>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
        <p className="text-gray-600">{getDescription()}</p>
      </div>
    </div>
  )
}