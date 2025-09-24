import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Plus } from "lucide-react"

export default function ProductsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-8 w-8 text-emerald-500" />
          <h1 className="text-4xl font-bold text-gradient">My Products</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">
          Manage your product listings and track performance across Ghana's markets
        </p>
      </div>
      <Link href="/vendor/add-product">
        <Button className="btn btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </Link>
    </div>
  )
}