"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { PROMOTION_PLANS, type PromotionPlan, type ProductPromotion } from "@/lib/promotion-types"
import { TrendingUp, Star, Clock, DollarSign, Eye, Zap, Calendar, CheckCircle, Plus, CreditCard, Sparkles, BarChart3, Target, Crown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VendorPromotions() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<PromotionPlan | null>(null)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Mock data - replace with actual API calls
  const promotionStats = {
    totalPromotions: 12,
    activePromotions: 3,
    totalRevenue: 983.48, // Changed to GHS equivalent
    averageBoost: 340,
  }

  const vendorProducts = [
    { id: 1, name: "Fresh Organic Tomatoes", price: 14.0, stock: 45, views: 234 },
    { id: 2, name: "Organic Carrots", price: 11.2, stock: 12, views: 156 },
    { id: 3, name: "Green Lettuce", price: 4.8, stock: 8, views: 89 },
    { id: 4, name: "Red Apples", price: 16.8, stock: 67, views: 312 },
    { id: 5, name: "Fresh Bread", price: 10.0, stock: 8, views: 145 },
  ]

  const activePromotions: ProductPromotion[] = [
    {
      id: "1",
      productId: "1",
      planId: "monthly",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-02-15"),
      status: "active",
      totalCost: 19.99,
    },
    {
      id: "2",
      productId: "4",
      planId: "weekly",
      startDate: new Date("2024-01-20"),
      endDate: new Date("2024-01-27"),
      status: "active",
      totalCost: 5.99,
    },
    {
      id: "3",
      productId: "2",
      planId: "quarterly",
      startDate: new Date("2023-12-01"),
      endDate: new Date("2024-03-01"),
      status: "active",
      totalCost: 49.99,
    },
  ]

  const getProductName = (productId: string) => {
    const product = vendorProducts.find((p) => p.id.toString() === productId)
    return product?.name || "Unknown Product"
  }

  const getPlanName = (planId: string) => {
    const plan = PROMOTION_PLANS.find((p) => p.id === planId)
    return plan?.name || "Unknown Plan"
  }

  const getRemainingDays = (endDate: Date) => {
    const now = new Date()
    const remaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, remaining)
  }

  const getProgressPercentage = (startDate: Date, endDate: Date) => {
    const now = new Date()
    const total = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }

  const handlePromoteProduct = (plan: PromotionPlan) => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a product to promote",
        variant: "destructive",
      })
      return
    }
    setSelectedPlan(plan)
    setIsPaymentDialogOpen(true)
  }

  const handlePayment = async () => {
    // Mock payment processing - integrate with Stripe here
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: `Product promotion activated with ${selectedPlan?.name} plan!`,
      })

      setIsPaymentDialogOpen(false)
      setSelectedPlan(null)
      setSelectedProduct("")
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleViewAnalytics = (promotionId: string, productId: string) => {
    router.push(`/vendor/promotions/analytics/${promotionId}`)
  }

  const handleExtendPromotion = (promotion: ProductPromotion) => {
    setSelectedPromotion(promotion)
    setIsExtendDialogOpen(true)
  }

  const [selectedPromotion, setSelectedPromotion] = useState<ProductPromotion | null>(null)
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-emerald-500" />
              <h1 className="text-4xl font-bold text-gradient">Product Promotions</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl">
              Boost your product visibility, increase sales, and reach more customers across Ghana
            </p>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Button className="btn btn-primary">
              <Plus className="mr-2 h-5 w-5" />
              Start Promotion
            </Button>
            <Button className="btn btn-outline">
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-interactive p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Total Promotions</p>
              <p className="text-3xl font-bold text-gray-900">{promotionStats.totalPromotions}</p>
              <p className="text-sm font-medium text-gray-600">All time</p>
            </div>
          </div>

          <div className="card-interactive p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Active Promotions</p>
              <p className="text-3xl font-bold text-gray-900">{promotionStats.activePromotions}</p>
              <p className="text-sm font-medium text-green-600">Currently running</p>
            </div>
          </div>

          <div className="card-interactive p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-gray-900">₵{promotionStats.totalRevenue}</p>
              <p className="text-sm font-medium text-gray-600">On promotions</p>
            </div>
          </div>

          <div className="card-interactive p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Average Boost</p>
              <p className="text-3xl font-bold text-gray-900">+{promotionStats.averageBoost}%</p>
              <p className="text-sm font-medium text-green-600">In product views</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Promote New Product */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Target className="h-6 w-6 text-emerald-500" />
                Promote a Product
              </h3>
              <p className="text-gray-600 mt-2">Select a product and choose a promotion plan to boost visibility</p>
            </div>

            <div className="space-y-8">
              {/* Product Selection */}
              <div className="space-y-3">
                <label className="form-label form-label-required">Select Product to Promote</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="form-select">
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-xl">
                    {vendorProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()} className="rounded-lg hover:bg-emerald-50">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-emerald-600 ml-4">
                            ₵{product.price} • {product.views} views
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promotion Plans */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900">Choose Promotion Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PROMOTION_PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`card-interactive p-6 cursor-pointer hover:shadow-xl ${
                        plan.popular ? "ring-2 ring-emerald-500 ring-offset-2" : ""
                      }`}
                      onClick={() => handlePromoteProduct(plan)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-gray-900">{plan.name}</h5>
                        {plan.popular && (
                          <span className="badge-featured">Popular</span>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-bold text-emerald-600">₵{plan.price}</span>
                          <span className="text-sm font-medium text-gray-600">{plan.duration} days</span>
                        </div>
                        {plan.discount && (
                          <span className="badge-premium">{plan.discount}% OFF</span>
                        )}
                        <ul className="text-sm space-y-2">
                          {plan.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Promotion Impact */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-emerald-500" />
                Promotion Impact
              </h3>
              <p className="text-gray-600 mt-1">How promotions boost your products</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                  <span className="font-medium text-gray-700">Average View Increase</span>
                  <span className="text-xl font-bold text-emerald-600">+340%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <span className="font-medium text-gray-700">Sales Conversion</span>
                  <span className="text-xl font-bold text-blue-600">+125%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <span className="font-medium text-gray-700">Search Ranking</span>
                  <span className="text-xl font-bold text-purple-600">Top 3</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h5 className="font-bold text-gray-900 mb-4">Benefits of Promotion</h5>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Top search placement</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Promoted badge visibility</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Increased buyer engagement</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">Higher conversion rates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Clock className="h-6 w-6 text-emerald-500" />
              Active Promotions
            </h3>
            <p className="text-gray-600 mt-2">Monitor your currently running promotions</p>
          </div>

          {activePromotions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Active Promotions</h3>
              <p className="text-gray-600 max-w-md mx-auto">Start promoting your products to increase visibility and sales across Ghana's markets</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activePromotions.map((promotion) => {
                const remainingDays = getRemainingDays(promotion.endDate)
                const progress = getProgressPercentage(promotion.startDate, promotion.endDate)

                return (
                  <div key={promotion.id} className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{getProductName(promotion.productId)}</h4>
                        <p className="text-emerald-600 font-medium">{getPlanName(promotion.planId)}</p>
                      </div>
                      <div className="text-right">
                        <span className="badge-active mb-2 block">Active</span>
                        <p className="text-lg font-bold text-gray-900">₵{promotion.totalCost}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">Progress</span>
                        <span className="font-bold text-emerald-600">{remainingDays} days remaining</span>
                      </div>
                      <Progress value={progress} className="h-3 bg-gray-200" />
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Started: {promotion.startDate.toLocaleDateString()}</span>
                        <span>Ends: {promotion.endDate.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        onClick={() => handleViewAnalytics(promotion.id, promotion.productId)}
                        className="btn btn-outline btn-sm"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Analytics
                      </Button>
                      <Button
                        onClick={() => handleExtendPromotion(promotion)}
                        className="btn btn-primary btn-sm"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Extend
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Extend Promotion Dialog */}
        <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                </div>
                Extend Promotion
              </DialogTitle>
              <DialogDescription>
                Extend the promotion for {selectedPromotion ? getProductName(selectedPromotion.productId) : ""}
              </DialogDescription>
            </DialogHeader>
            {selectedPromotion && (
              <div className="space-y-6">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <h4 className="font-bold text-emerald-900 mb-3">Current Plan: {getPlanName(selectedPromotion.planId)}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Expires:</span>
                      <span className="font-medium text-emerald-900">{selectedPromotion.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Days Remaining:</span>
                      <span className="font-medium text-emerald-900">{getRemainingDays(selectedPromotion.endDate)} days</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PROMOTION_PLANS.slice(0, 4).map((plan) => (
                    <Button
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlan(plan)
                        setIsExtendDialogOpen(false)
                        setIsPaymentDialogOpen(true)
                      }}
                      className="btn btn-outline h-auto p-4 flex flex-col gap-2"
                    >
                      <span className="font-bold">{plan.name}</span>
                      <span className="text-sm font-medium text-emerald-600">₵{plan.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                </div>
                Complete Payment
              </DialogTitle>
              <DialogDescription>Confirm your promotion plan and complete the payment</DialogDescription>
            </DialogHeader>

            {selectedPlan && (
              <div className="space-y-6">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                  <h4 className="text-xl font-bold text-emerald-900 mb-4">{selectedPlan.name}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Duration:</span>
                      <span className="font-bold text-emerald-900">{selectedPlan.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Price:</span>
                      <span className="text-2xl font-bold text-emerald-600">₵{selectedPlan.price}</span>
                    </div>
                    {selectedPlan.discount && (
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Discount:</span>
                        <span className="font-bold text-orange-600">{selectedPlan.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-gray-900">Features Included:</h5>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <DialogFooter className="gap-3">
              <Button 
                onClick={() => setIsPaymentDialogOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={handlePayment} 
                className="btn btn-primary"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₵{selectedPlan?.price}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
