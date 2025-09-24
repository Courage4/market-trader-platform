import type React from "react"
import { useToast } from "@/hooks/use-toast"
import { demoAccounts } from "./login-data"

export function useLoginHandlers() {
  const { toast } = useToast()

  // Function to determine user role based on email
  const getUserRole = (email: string) => {
    if (email.includes("vendor")) return "vendor"
    if (email.includes("admin")) return "admin"
    if (email.includes("super")) return "super-admin"
    return "buyer" // default role
  }

  const handleDemoLogin = (
    demoAccount: typeof demoAccounts[0],
    setEmail: (email: string) => void,
    setPassword: (password: string) => void
  ) => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
  }

  const handleSubmit = async (
    e: React.FormEvent,
    email: string,
    setIsLoading: (loading: boolean) => void
  ) => {
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

  return {
    handleDemoLogin,
    handleSubmit,
  }
}