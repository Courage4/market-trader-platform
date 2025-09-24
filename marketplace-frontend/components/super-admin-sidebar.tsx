"use client"

import { 
  LayoutDashboard, 
  Users, 
  Shield,
  BarChart3,
  Settings, 
  HelpCircle,
  X,
  Store,
  MessageSquare,
  AlertTriangle,
  Crown,
  Database,
  Globe
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const superAdminNavigation = [
  { name: 'Dashboard', href: '/super-admin/dashboard', icon: LayoutDashboard },
  { name: 'System Analytics', href: '/super-admin/analytics', icon: BarChart3 },
  { name: 'User Management', href: '/super-admin/users', icon: Users },
  { name: 'Vendor Management', href: '/super-admin/vendors', icon: Store },
  { name: 'Promotions', href: '/super-admin/promotions', icon: Crown },
  { name: 'System Settings', href: '/super-admin/system', icon: Settings },
  { name: 'Reports', href: '/super-admin/reports', icon: AlertTriangle },
  { name: 'Database', href: '/super-admin/database', icon: Database },
]

interface SuperAdminSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function SuperAdminSidebar({ sidebarOpen, setSidebarOpen }: SuperAdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Super Admin</span>
              <p className="text-xs text-purple-600 font-medium">Ghana Marketplace</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {superAdminNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25' 
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-purple-600'
                }`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Super Admin Stats Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Crown className="w-4 h-4" />
              </div>
              <span className="font-semibold">System Overview</span>
            </div>
            <p className="text-purple-100 text-sm mb-3">Complete platform control</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/20 rounded-lg p-2 text-center">
                <div className="font-bold">2,847</div>
                <div className="text-purple-100">Total Users</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center">
                <div className="font-bold">156</div>
                <div className="text-purple-100">Active Vendors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}