"use client"

import { useState } from "react"
import { 
  Bell, 
  Search,
  Menu,
  ChevronDown
} from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import BuyerSidebar from "./buyer-sidebar"
import VendorSidebar from "./vendor-sidebar"
import AdminSidebar from "./admin-sidebar"
import SuperAdminSidebar from "./super-admin-sidebar"
import { getUserRoleFromPath, getMockUser, getRoleTheme } from "@/lib/auth-utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  // Get user role and data based on current pathname
  const userRole = getUserRoleFromPath(pathname)
  const user = getMockUser(userRole)
  const theme = getRoleTheme(userRole)

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Role-based Sidebar */}
      {userRole === 'buyer' && (
        <BuyerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {userRole === 'vendor' && (
        <VendorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {userRole === 'admin' && (
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      {userRole === 'super-admin' && (
        <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}!</p>
              </div>
              
              {/* Search */}
              <div className="relative hidden md:block ml-8">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-${theme.primary}-500`} />
                <input
                  type="text"
                  placeholder={userRole === 'vendor' ? 'Search products, analytics...' : 'Search products, vendors...'}
                  className={`pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-${theme.primary}-500/20 focus:border-${theme.primary}-500 transition-all duration-300`}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
                <Image
                  src={user.avatar || "/placeholder-user.jpg"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className={`w-9 h-9 rounded-full border-2 border-${theme.primary}-200`}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className={`text-xs text-${theme.primary}-600`}>
                    {userRole === 'buyer' ? 'Buyer' : userRole === 'vendor' ? 'Vendor' : userRole === 'admin' ? 'Admin' : 'Super Admin'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}