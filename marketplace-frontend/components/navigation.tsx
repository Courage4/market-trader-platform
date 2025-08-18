"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers"
import {
  ShoppingCart,
  Heart,
  Store,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  Search,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const getNavItems = () => {
    if (!user) return []

    switch (user.role) {
      case "vendor":
        return [
          { href: "/vendor/dashboard", label: "Dashboard", icon: Store },
          { href: "/vendor/products", label: "My Products", icon: Package },
          { href: "/vendor/add-product", label: "Add Product", icon: Package },
          { href: "/vendor/promotions", label: "Promotions", icon: TrendingUp },
        ]
      case "buyer":
        return [
          { href: "/buyer/dashboard", label: "Dashboard", icon: Store },
          { href: "/buyer/products", label: "Browse Products", icon: Search },
          { href: "/buyer/cart", label: "Cart", icon: ShoppingCart },
          { href: "/buyer/wishlist", label: "Wishlist", icon: Heart },
        ]
      case "admin":
        return [
          { href: "/admin/dashboard", label: "Dashboard", icon: Store },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/complaints", label: "Complaints", icon: Settings },
        ]
      case "super-admin":
        return [
          { href: "/super-admin/dashboard", label: "Super Dashboard", icon: Store },
          { href: "/super-admin/users", label: "User Management", icon: Users },
          { href: "/super-admin/system", label: "System Config", icon: Settings },
          { href: "/super-admin/analytics", label: "Analytics", icon: Store },
          { href: "/super-admin/promotions", label: "Promotions", icon: TrendingUp },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  if (!user) {
    return (
      <nav className="border-b border-purple-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">MarketPlace Ghana</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="btn-primary">
                <Sparkles className="mr-2 h-4 w-4" />
                Register
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      vendor: { color: "bg-purple-600", text: "Vendor" },
      buyer: { color: "bg-purple-500", text: "Buyer" },
      admin: { color: "bg-purple-700", text: "Admin" },
      "super-admin": { color: "bg-purple-800", text: "Super Admin" },
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.buyer

    return (
      <Badge className={`${config.color} text-white border-0 font-medium px-3 py-1 rounded-full shadow-lg`}>
        {config.text}
      </Badge>
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl gradient-text">MarketPlace</span>
              <span className="text-xs text-purple-600 font-medium">Ghana</span>
            </div>
          </Link>
          {getRoleBadge(user.role)}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-700 hover:text-purple-900 hover:bg-purple-50 rounded-xl"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white border-purple-200">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-6 border-b border-purple-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    <Store className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl gradient-text">MarketPlace</span>
                    <span className="text-xs text-purple-600 font-medium">Ghana</span>
                  </div>
                </div>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-purple-600 text-white shadow-lg"
                          : "text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-12 w-12 rounded-full ring-2 ring-purple-200 hover:ring-purple-400 transition-all duration-300"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                  <AvatarFallback className="bg-purple-600 text-white font-semibold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 bg-white border-purple-200 rounded-2xl shadow-xl shadow-purple-500/10"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-semibold leading-none text-purple-900">{user.name}</p>
                  <p className="text-sm leading-none text-purple-600">{user.email}</p>
                  <div className="pt-2">{getRoleBadge(user.role)}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-200" />
              <DropdownMenuItem className="p-3 rounded-xl mx-2 my-1 hover:bg-purple-50 cursor-pointer">
                <Settings className="mr-3 h-5 w-5 text-purple-600" />
                <span className="text-purple-900 font-medium">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="p-3 rounded-xl mx-2 my-1 hover:bg-purple-50 cursor-pointer">
                <LogOut className="mr-3 h-5 w-5 text-purple-600" />
                <span className="text-purple-900 font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
