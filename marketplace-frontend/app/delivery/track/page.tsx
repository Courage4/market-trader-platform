"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Truck, Package, MapPin, Clock, Phone, MessageCircle, CheckCircle, Circle, NavigationIcon } from "lucide-react"

export default function DeliveryTrack() {
  const [trackingId, setTrackingId] = useState("")
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(1)

  const deliveries = [
    {
      id: 1,
      trackingId: "DLV-2024-001",
      vendor: "Fresh Farm Market",
      items: ["Tomatoes (2kg)", "Carrots (1kg)", "Lettuce (2 heads)"],
      status: "in_transit",
      progress: 75,
      estimatedTime: "15-20 minutes",
      driverName: "John Smith",
      driverPhone: "+1234567890",
      pickupAddress: "Fresh Farm Market, 123 Market St",
      deliveryAddress: "456 Home Ave, Apt 2B",
      orderTotal: 15.8,
      deliveryFee: 3.5,
      timeline: [
        { status: "Order Placed", time: "10:30 AM", completed: true },
        { status: "Vendor Confirmed", time: "10:35 AM", completed: true },
        { status: "Driver Assigned", time: "10:45 AM", completed: true },
        { status: "Picked Up", time: "11:15 AM", completed: true },
        { status: "In Transit", time: "11:20 AM", completed: true, current: true },
        { status: "Delivered", time: "ETA 11:40 AM", completed: false },
      ],
    },
    {
      id: 2,
      trackingId: "DLV-2024-002",
      vendor: "Local Bakery",
      items: ["Fresh Bread (2 loaves)", "Croissants (6 pieces)"],
      status: "delivered",
      progress: 100,
      estimatedTime: "Delivered",
      driverName: "Sarah Johnson",
      driverPhone: "+1234567891",
      pickupAddress: "Local Bakery, 789 Baker St",
      deliveryAddress: "456 Home Ave, Apt 2B",
      orderTotal: 12.3,
      deliveryFee: 2.5,
      timeline: [
        { status: "Order Placed", time: "9:00 AM", completed: true },
        { status: "Vendor Confirmed", time: "9:05 AM", completed: true },
        { status: "Driver Assigned", time: "9:15 AM", completed: true },
        { status: "Picked Up", time: "9:30 AM", completed: true },
        { status: "In Transit", time: "9:35 AM", completed: true },
        { status: "Delivered", time: "9:50 AM", completed: true, current: true },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "confirmed":
        return <Badge variant="outline">Confirmed</Badge>
      case "picked_up":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Picked Up
          </Badge>
        )
      case "in_transit":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            In Transit
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_transit":
        return "bg-yellow-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const currentDelivery = deliveries.find((d) => d.id === selectedDelivery)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Track Delivery</h1>
          <p className="text-muted-foreground mt-2">Monitor your delivery status and estimated arrival time</p>
        </div>

        {/* Track by ID */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Track by Delivery ID</CardTitle>
            <CardDescription>Enter your delivery tracking ID to get real-time updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter tracking ID (e.g., DLV-2024-001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button>
                <NavigationIcon className="mr-2 h-4 w-4" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Delivery List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Deliveries</CardTitle>
                <CardDescription>Recent and active deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedDelivery === delivery.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedDelivery(delivery.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{delivery.trackingId}</span>
                        {getStatusBadge(delivery.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{delivery.vendor}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{delivery.estimatedTime}</span>
                      </div>
                      <Progress value={delivery.progress} className="mt-2 h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Details */}
          <div className="lg:col-span-2">
            {currentDelivery ? (
              <div className="space-y-6">
                {/* Status Overview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{currentDelivery.trackingId}</CardTitle>
                        <CardDescription>{currentDelivery.vendor}</CardDescription>
                      </div>
                      {getStatusBadge(currentDelivery.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(currentDelivery.status)}`}
                        >
                          <Truck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {currentDelivery.status === "delivered" ? "Delivered!" : "On the way"}
                          </p>
                          <p className="text-sm text-muted-foreground">ETA: {currentDelivery.estimatedTime}</p>
                        </div>
                      </div>

                      <Progress value={currentDelivery.progress} className="h-2" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Pickup</p>
                            <p className="text-muted-foreground">{currentDelivery.pickupAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Delivery</p>
                            <p className="text-muted-foreground">{currentDelivery.deliveryAddress}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Driver Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Driver Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium">{currentDelivery.driverName.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{currentDelivery.driverName}</p>
                          <p className="text-sm text-muted-foreground">Delivery Driver</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentDelivery.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Order Total</span>
                        <span>${currentDelivery.orderTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span>${currentDelivery.deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${(currentDelivery.orderTotal + currentDelivery.deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentDelivery.timeline.map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span
                                className={`text-sm font-medium ${
                                  step.current
                                    ? "text-primary"
                                    : step.completed
                                      ? "text-foreground"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {step.status}
                              </span>
                              <span className="text-xs text-muted-foreground">{step.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No delivery selected</h3>
                  <p className="text-muted-foreground">Select a delivery from the list to view tracking details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
