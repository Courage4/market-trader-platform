"use client"

import { useState } from "react"
import Link from "next/link"
import ForgotPasswordHeader from "@/components/auth/forgot-password-header"
import ForgotPasswordForms from "@/components/auth/forgot-password-forms"
import { useForgotPasswordHandlers } from "@/components/auth/forgot-password-handlers"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset">("email")
  const [email, setEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const { handleSendCode, handleVerifyCode, handleResetPassword, resendCode } = useForgotPasswordHandlers()

  const onSendCode = (e: React.FormEvent) => handleSendCode(e, email, setStep, setCountdown, setIsLoading)
  const onVerifyCode = (e: React.FormEvent) => handleVerifyCode(e, resetCode, setStep, setIsLoading)
  const onResetPassword = (e: React.FormEvent) => handleResetPassword(e, newPassword, confirmPassword, setIsLoading)
  const onResendCode = () => resendCode(setCountdown, setIsLoading)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ForgotPasswordHeader step={step} />

        <ForgotPasswordForms
          step={step}
          email={email}
          setEmail={setEmail}
          resetCode={resetCode}
          setResetCode={setResetCode}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          isLoading={isLoading}
          countdown={countdown}
          onSendCode={onSendCode}
          onVerifyCode={onVerifyCode}
          onResetPassword={onResetPassword}
          onResendCode={onResendCode}
        />

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
