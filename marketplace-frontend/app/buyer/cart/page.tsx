"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  Store,
  Truck,
  CreditCard,
  Tag,
  AlertCircle,
  ArrowRight,
  Gift,
} from "lucide-react"

export default function BuyerCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Bananas",
      vendor: "Fresh Fruits Ghana",
      vendorId: "vendor-001",
      price: 8.0,
      originalPrice: 10.0,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
      maxQuantity: 10,
      discount: 20,
      selected: true,
    },
    {
      id: 2,
      name: "Organic Tomatoes",
      vendor: "Green Valley Farm",
      vendorId: "vendor-002",
      price: 12.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
      maxQuantity: 5,
      selected: true,
    },
    {
      id: 3,
      name: "Sweet Oranges",
      vendor: "Fresh Fruits Ghana",
      vendorId: "vendor-001",
      price: 15.0,
      quantity: 3,
      image: "/placeholder.svg?height=80&width=80",
      inStock: false,
      maxQuantity: 8,
      selected: false,
    },
    {
      id: 4,
      name: "Fresh Pineapples",
      vendor: "Tropical Delights",
      vendorId: "vendor-003",
      price: 6.0,
      originalPrice: 8.0,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
      maxQuantity: 6,
      discount: 25,
      selected: true,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const { toast } = useToast()

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, Math.min(newQuantity, item.maxQuantity)) } : item,
      ),
    )
  }

  const removeItem = (id: number, name: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const toggleItemSelection = (id: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const selectAllItems = (selected: boolean) => {
    setCartItems((items) => items.map((item) => ({ ...item, selected: selected && item.inStock })))
  }

  const moveToFavorites = (id: number, name: string) => {
    removeItem(id, name)
    toast({
      title: "Moved to Favorites",
      description: `${name} has been moved to your favorites.`,
    })
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo("SAVE10")
      toast({
        title: "Promo Code Applied",
        description: "You saved 10% on your order!",
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
    setPromoCode("")
  }

  const selectedItems = cartItems.filter((item) => item.selected && item.inStock)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = selectedItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity
    }
    return sum
  }, 0)

  const promoDiscount = appliedPromo === "SAVE10" ? subtotal * 0.1 : 0
  const deliveryFee = deliveryOption === "express" ? 5.0 : 2.0
  const total = subtotal - promoDiscount + deliveryFee

  const groupedByVendor = cartItems.reduce(
    (groups, item) => {
      const vendorId = item.vendorId
      if (!groups[vendorId]) {
        groups[vendorId] = {
          vendor: item.vendor,
          items: [],
        }
      }
      groups[vendorId].items.push(item)
      return groups
    },
    {} as Record<string, { vendor: string; items: typeof cartItems }>,
  )

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <ShoppingCart className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
        <p className="text-gray-600">{cartItems.length} items in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some products to get started</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Select All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedItems.length === cartItems.filter((item) => item.inStock).length}
                      onCheckedChange={(checked) => selectAllItems(checked as boolean)}
                    />
                    <span className="font-medium">
                      Select All ({cartItems.filter((item) => item.inStock).length} items)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">{selectedItems.length} selected</div>
                </div>
              </CardContent>
            </Card>

            {/* Grouped by Vendor */}
            {Object.entries(groupedByVendor).map(([vendorId, group]) => (
              <Card key={vendorId}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <Store className="w-5 h-5 text-purple-600" />
                    <CardTitle className="text-lg">{group.vendor}</CardTitle>
                    <Badge variant="outline">
                      {group.items.length} item{group.items.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg border ${
                        !item.inStock ? "bg-gray-50 opacity-60" : "bg-white"
                      }`}
                    >
                      <Checkbox
                        checked={item.selected}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                        disabled={!item.inStock}
                      />

                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">by {item.vendor}</p>

                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-lg font-bold text-purple-600">GHS {item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                GHS {item.originalPrice.toFixed(2)}
                              </span>
                              <Badge className="bg-red-100 text-red-800">-{item.discount}%</Badge>
                            </>
                          )}
                        </div>

                        {!item.inStock && (
                          <div className="flex items-center space-x-2 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">Out of stock</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        {item.inStock ? (
                          <div className="flex items-center space-x-2 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                        )}

                        <div className="flex flex-col space-y-2">
                          <Button variant="ghost" size="sm" onClick={() => moveToFavorites(item.id, item.name)}>
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removeItem(item.id, item.name)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tag className="w-5 h-5" />
                  <span>Promo Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">{appliedPromo}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setAppliedPromo(null)}>
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} disabled={!promoCode}>
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5" />
                  <span>Delivery Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={deliveryOption} onValueChange={setDeliveryOption}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Delivery (2-3 days) - GHS 2.00</SelectItem>
                    <SelectItem value="express">Express Delivery (1 day) - GHS 5.00</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedItems.length} items)</span>
                  <span>GHS {subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-GHS {savings.toFixed(2)}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-GHS {promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>GHS {deliveryFee.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-600">GHS {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-4" size="lg" disabled={selectedItems.length === 0}>
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Secure Checkout</p>
                    <p className="text-blue-700">Your payment information is encrypted and secure.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
