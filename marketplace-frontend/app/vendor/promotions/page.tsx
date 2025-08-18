"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { PROMOTION_PLANS, type PromotionPlan, type ProductPromotion } from "@/lib/promotion-types"
import { TrendingUp, Star, Clock, DollarSign, Eye, Zap, Calendar, CheckCircle, Plus, CreditCard } from "lucide-react"
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
    { id: 1, name: "Fresh Organic Tomatoes", price: 3.5, stock: 45, views: 234 },
    { id: 2, name: "Organic Carrots", price: 2.8, stock: 12, views: 156 },
    { id: 3, name: "Green Lettuce", price: 1.2, stock: 8, views: 89 },
    { id: 4, name: "Red Apples", price: 4.2, stock: 67, views: 312 },
    { id: 5, name: "Fresh Bread", price: 2.5, stock: 8, views: 145 },
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Product Promotions</h1>
              <p className="text-muted-foreground">Boost your product visibility and increase sales</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotionStats.totalPromotions}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{promotionStats.activePromotions}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${promotionStats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">On promotions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Boost</CardTitle>
              <Eye className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{promotionStats.averageBoost}%</div>
              <p className="text-xs text-muted-foreground">In product views</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Promote New Product */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Promote a Product
              </CardTitle>
              <CardDescription>Select a product and choose a promotion plan to boost visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Product to Promote</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{product.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ${product.price} • {product.views} views
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Promotion Plans */}
              <div className="space-y-4">
                <h4 className="font-medium">Choose Promotion Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROMOTION_PLANS.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        plan.popular ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => handlePromoteProduct(plan)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{plan.name}</h5>
                          {plan.popular && (
                            <Badge variant="default" className="bg-primary">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">₵{plan.price}</span>
                            <span className="text-sm text-muted-foreground">{plan.duration} days</span>
                          </div>
                          {plan.discount && (
                            <Badge variant="secondary" className="text-green-700 bg-green-100">
                              {plan.discount}% OFF
                            </Badge>
                          )}
                          <ul className="text-xs space-y-1 text-muted-foreground">
                            {plan.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Promotion Impact
              </CardTitle>
              <CardDescription>How promotions boost your products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average View Increase</span>
                  <span className="font-bold text-green-600">+340%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sales Conversion</span>
                  <span className="font-bold text-blue-600">+125%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Search Ranking</span>
                  <span className="font-bold text-purple-600">Top 3</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h5 className="font-medium mb-2">Benefits of Promotion</h5>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Top search placement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Promoted badge visibility
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Increased buyer engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Higher conversion rates
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Promotions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Promotions
            </CardTitle>
            <CardDescription>Monitor your currently running promotions</CardDescription>
          </CardHeader>
          <CardContent>
            {activePromotions.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Promotions</h3>
                <p className="text-muted-foreground">Start promoting your products to increase visibility and sales</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activePromotions.map((promotion) => {
                  const remainingDays = getRemainingDays(promotion.endDate)
                  const progress = getProgressPercentage(promotion.startDate, promotion.endDate)

                  return (
                    <Card key={promotion.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{getProductName(promotion.productId)}</h4>
                            <p className="text-sm text-muted-foreground">{getPlanName(promotion.planId)}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="default" className="bg-green-100 text-green-800 mb-1">
                              Active
                            </Badge>
                            <p className="text-sm font-medium">${promotion.totalCost}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{remainingDays} days remaining</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Started: {promotion.startDate.toLocaleDateString()}</span>
                            <span>Ends: {promotion.endDate.toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => handleViewAnalytics(promotion.id, promotion.productId)}
                          >
                            <Eye className="mr-2 h-3 w-3" />
                            View Analytics
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => handleExtendPromotion(promotion)}
                          >
                            <Calendar className="mr-2 h-3 w-3" />
                            Extend
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Extend Promotion Dialog */}
        <Dialog open={isExtendDialogOpen} onOpenChange={setIsExtendDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Extend Promotion</DialogTitle>
              <DialogDescription>
                Extend the promotion for {selectedPromotion ? getProductName(selectedPromotion.productId) : ""}
              </DialogDescription>
            </DialogHeader>
            {selectedPromotion && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Current Plan: {getPlanName(selectedPromotion.planId)}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Expires:</span>
                      <span>{selectedPromotion.endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days Remaining:</span>
                      <span>{getRemainingDays(selectedPromotion.endDate)} days</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PROMOTION_PLANS.slice(0, 4).map((plan) => (
                    <Button
                      key={plan.id}
                      variant="outline"
                      className="h-auto p-3 flex flex-col gap-1 bg-transparent"
                      onClick={() => {
                        setSelectedPlan(plan)
                        setIsExtendDialogOpen(false)
                        setIsPaymentDialogOpen(true)
                      }}
                    >
                      <span className="font-semibold">{plan.name}</span>
                      <span className="text-sm">₵{plan.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>Confirm your promotion plan and complete the payment</DialogDescription>
            </DialogHeader>

            {selectedPlan && (
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">{selectedPlan.name}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{selectedPlan.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-bold">${selectedPlan.price}</span>
                    </div>
                    {selectedPlan.discount && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>{selectedPlan.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium">Features Included:</h5>
                  <ul className="text-sm space-y-1">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handlePayment} className="flex-1">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay ${selectedPlan.price}
                  </Button>
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
