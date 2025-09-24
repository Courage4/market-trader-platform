import type React from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/providers"

export function useRegisterHandlers() {
  const { toast } = useToast()
  const { register } = useAuth()

  const handleSubmit = async (
    e: React.FormEvent,
    formData: {
      name: string
      email: string
      phone: string
      password: string
      confirmPassword: string
      role: string
      businessName: string
      businessDescription: string
      location: string
      agreeToTerms: boolean
    },
    setIsLoading: (loading: boolean) => void,
    router: any
  ) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        location: {
          lat: 40.7128,
          lng: -74.006,
          address: formData.location || "New York, NY",
        },
      })

      toast({
        title: "Success",
        description: "Account created successfully!",
      })

      router.push(`/${formData.role}/dashboard`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleSubmit,
  }
}