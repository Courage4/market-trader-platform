import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { mockProductData } from "./product-edit-data"

export function useProductEditHandlers() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    unit: "",
    images: [] as string[],
    tags: "",
    location: "",
    market: "",
    deliveryAvailable: false,
    negotiable: false,
    minOrder: "",
    maxOrder: "",
    status: "active"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [originalData, setOriginalData] = useState<any>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const productId = params.id

  useEffect(() => {
    const loadProduct = () => {
      const key = String(productId)
      const product = (mockProductData as any)[key]
      if (product) {
        setFormData(product)
        setOriginalData(product)
      } else {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        })
        router.push("/vendor/products")
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId, router, toast])

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }))
    setHasChanges(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category || !formData.price || !formData.stock || !formData.market) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Product updated successfully!",
      })
      
      setHasChanges(false)
      setOriginalData(formData)
      router.push("/vendor/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      })
      
      router.push("/vendor/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setShowDeleteModal(false)
    }
  }

  return {
    formData,
    isLoading,
    hasChanges,
    showPreviewModal,
    showDeleteModal,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
    handleDelete,
    setShowPreviewModal,
    setShowDeleteModal,
  }
}