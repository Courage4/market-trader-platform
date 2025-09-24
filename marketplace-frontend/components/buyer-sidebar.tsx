"use client"

import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  Heart,
  Settings, 
  HelpCircle,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const buyerNavigation = [
  { name: 'Dashboard', href: '/buyer/dashboard', icon: LayoutDashboard },
  { name: 'Browse Products', href: '/buyer/products', icon: Package },
  { name: 'Messages', href: '/buyer/chat', icon: MessageSquare },
  { name: 'Favorites', href: '/buyer/favorites', icon: Heart },
  { name: 'Settings', href: '/buyer/settings', icon: Settings },
]

interface BuyerSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function BuyerSidebar({ sidebarOpen, setSidebarOpen }: BuyerSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Marketplace</span>
              <p className="text-xs text-emerald-600 font-medium">Ghana</p>
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
          {buyerNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 group-hover:text-emerald-600'
                }`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Help Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="font-semibold">Need help?</span>
            </div>
            <p className="text-emerald-100 text-sm mb-3">Get support from our team</p>
            <button className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg w-full">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}