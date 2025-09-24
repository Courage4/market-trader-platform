"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import DemoAccounts from "@/components/auth/demo-accounts"
import LoginFeatures from "@/components/auth/login-features"
import { useLoginHandlers } from "@/components/auth/login-handlers"
import { ArrowLeft, Link } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { handleDemoLogin, handleSubmit } = useLoginHandlers()

  const onDemoLogin = (demoAccount: any) => handleDemoLogin(demoAccount, setEmail, setPassword)
  const onSubmit = (e: React.FormEvent) => handleSubmit(e, email, setIsLoading)

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
        <div className="w-full max-w-md mx-auto">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />

          <DemoAccounts onDemoLogin={onDemoLogin} />
        </div>

        <LoginFeatures />
      </div>
    </div>
  )
}
