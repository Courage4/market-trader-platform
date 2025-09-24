import type React from "react"
import { useToast } from "@/hooks/use-toast"

export function useForgotPasswordHandlers() {
  const { toast } = useToast()

  const handleSendCode = async (
    e: React.FormEvent,
    email: string,
    setStep: (step: "email" | "code" | "reset") => void,
    setCountdown: (countdown: number) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
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

  const handleVerifyCode = async (
    e: React.FormEvent,
    resetCode: string,
    setStep: (step: "email" | "code" | "reset") => void,
    setIsLoading: (loading: boolean) => void
  ) => {
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

  const handleResetPassword = async (
    e: React.FormEvent,
    newPassword: string,
    confirmPassword: string,
    setIsLoading: (loading: boolean) => void
  ) => {
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

  const resendCode = async (
    setCountdown: (countdown: number) => void,
    setIsLoading: (loading: boolean) => void
  ) => {
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

  return {
    handleSendCode,
    handleVerifyCode,
    handleResetPassword,
    resendCode,
  }
}