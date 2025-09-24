import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { products } from "./products-data"

export function useProductsHandlers() {
  const router = useRouter()
  const { toast } = useToast()

  const handleCallVendor = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId)
    if (product && product.vendorPhone) {
      // Open phone app with vendor's number
      window.location.href = `tel:${product.vendorPhone}`
      toast({
        title: "Calling Vendor",
        description: `Calling ${product.vendor} at ${product.vendorPhone}`,
      })
    } else {
      toast({
        title: "Contact Not Available",
        description: "Vendor contact information is not available.",
        variant: "destructive",
      })
    }
  }

  const handleMessageVendor = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId)
    if (product) {
      // Navigate to chat page with vendor context
      router.push(`/buyer/chat?vendor=${product.vendorId}&product=${productId}`)
      toast({
        title: "Opening Chat",
        description: `Starting conversation with ${product.vendor}`,
      })
    } else {
      toast({
        title: "Error",
        description: "Product information not found.",
        variant: "destructive",
      })
    }
  }

  const handleViewProduct = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId)
    if (product) {
      // Navigate to product details page
      router.push(`/buyer/products/${productId}`)
    } else {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive",
      })
    }
  }

  const handleFavoriteProduct = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId)
    if (product) {
      toast({
        title: "Added to Favorites",
        description: `${product.name} has been saved to your favorites.`,
      })
      // Here you would typically save to favorites in your state management or database
    }
  }

  return {
    handleCallVendor,
    handleMessageVendor,
    handleViewProduct,
    handleFavoriteProduct,
  }
}