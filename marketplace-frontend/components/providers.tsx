"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"

interface User {
  id: string
  name: string
  email: string
  role: "buyer" | "vendor" | "admin" | "super-admin"
  phone?: string
  location?: {
    lat: number
    lng: number
    address: string
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string, adminKey?: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for stored user session
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error)
    }
    setIsLoading(false)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  const login = async (email: string, password: string, role: string, adminKey?: string) => {
    setIsLoading(true)
    try {
      // For super-admin login, validate admin key
      if (role === "super-admin") {
        if (!adminKey) {
          throw new Error("Admin key is required for super-admin access")
        }

        // In a real implementation, validate admin key on server
        const validAdminKey = "SUPER_ADMIN_KEY_2024"
        if (adminKey !== validAdminKey) {
          throw new Error("Invalid admin key")
        }
      }

      // Mock login - replace with actual API call
      const mockUser: User = {
        id: "1",
        name:
          role === "vendor"
            ? "John Vendor"
            : role === "admin"
              ? "Admin User"
              : role === "super-admin"
                ? "Super Admin"
                : "Jane Buyer",
        email,
        role: role as "buyer" | "vendor" | "admin" | "super-admin",
        phone: "+1234567890",
        location: {
          lat: 40.7128,
          lng: -74.006,
          address: "New York, NY",
        },
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // Mock registration - replace with actual API call
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
      }
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false} 
      disableTransitionOnChange
      forcedTheme="light"
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  )
}
