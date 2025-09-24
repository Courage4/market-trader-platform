"use client"

import { 
  LayoutDashboard, 
  Package, 
  Plus,
  BarChart3,
  MessageSquare, 
  Settings, 
  HelpCircle,
  X,
  Sparkles,
  Users
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const vendorNavigation = [
  { name: 'Dashboard', href: '/vendor/dashboard', icon: LayoutDashboard },
  { name: 'My Products', href: '/vendor/products', icon: Package },
  { name: 'Add Product', href: '/vendor/add-product', icon: Plus },
  { name: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
  { name: 'Messages', href: '/vendor/messages', icon: MessageSquare },
  { name: 'Promotions', href: '/vendor/promotions', icon: Sparkles },
  { name: 'Settings', href: '/vendor/settings', icon: Settings },
]

interface VendorSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function VendorSidebar({ sidebarOpen, setSidebarOpen }: VendorSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Vendor Portal</span>
              <p className="text-xs text-orange-600 font-medium">Ghana Marketplace</p>
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
          {vendorNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25' 
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-orange-600'
                }`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Vendor Stats Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-semibold">Vendor Stats</span>
            </div>
            <p className="text-orange-100 text-sm mb-3">Track your marketplace performance</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/20 rounded-lg p-2 text-center">
                <div className="font-bold">127</div>
                <div className="text-orange-100">Views</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center">
                <div className="font-bold">23</div>
                <div className="text-orange-100">Contacts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}