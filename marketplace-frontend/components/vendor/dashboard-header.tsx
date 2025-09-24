import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Plus, MapPin } from "lucide-react"

interface DashboardHeaderProps {
  userName?: string
}

export default function DashboardHeader({ userName = "Vendor" }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-emerald-500" />
          <h1 className="text-4xl font-bold text-gradient">Welcome back, {userName}!</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">
          Here's what's happening with your store today. Manage your products and connect with buyers.
        </p>
      </div>
      <div className="flex gap-4 mt-4 lg:mt-0">
        <Link href="/vendor/add-product">
          <Button className="btn btn-primary">
            <Plus className="mr-2 h-5 w-5" />
            Add Product
          </Button>
        </Link>
        <Button className="btn btn-outline">
          <MapPin className="mr-2 h-5 w-5" />
          Update Location
        </Button>
      </div>
    </div>
  )
}