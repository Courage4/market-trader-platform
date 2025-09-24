"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Plus, BarChart3, MessageCircle } from "lucide-react"

export default function DashboardQuickActions() {
  const router = useRouter()

  const handleViewAnalytics = () => {
    router.push("/vendor/analytics")
  }

  const handleMessageCenter = () => {
    router.push("/vendor/messages")
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-emerald-500" />
          Quick Actions
        </h3>
        <p className="text-gray-600 mt-2">Manage your marketplace presence and connect with buyers</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/vendor/add-product">
          <div className="card-interactive p-8 text-center h-32 flex flex-col justify-center hover:shadow-xl cursor-pointer">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Add New Product</span>
          </div>
        </Link>

        <div 
          onClick={handleViewAnalytics}
          className="card-interactive p-8 text-center h-32 flex flex-col justify-center hover:shadow-xl cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-gray-900">View Analytics</span>
        </div>

        <div 
          onClick={handleMessageCenter}
          className="card-interactive p-8 text-center h-32 flex flex-col justify-center hover:shadow-xl cursor-pointer"
        >
          <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Message Center</span>
        </div>
      </div>
    </div>
  )
}