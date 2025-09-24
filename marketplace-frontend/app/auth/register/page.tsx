"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import RegisterForm from "@/components/auth/register-form"
import { useRegisterHandlers } from "@/components/auth/register-handlers"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    businessName: "",
    businessDescription: "",
    location: "",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || ""

  const { handleSubmit } = useRegisterHandlers()

  useEffect(() => {
    if (defaultRole) {
      setFormData((prev) => ({ ...prev, role: defaultRole }))
    }
  }, [defaultRole])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = (e: React.FormEvent) => handleSubmit(e, formData, setIsLoading, router)

  return (
    <RegisterForm
      formData={formData}
      showPassword={showPassword}
      isLoading={isLoading}
      onInputChange={handleInputChange}
      setShowPassword={setShowPassword}
      onSubmit={onSubmit}
    />
  )
}
