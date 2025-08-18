"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Settings, User, Bell, Shield, Store, Camera, Save, Eye, EyeOff, AlertCircle } from "lucide-react"

export default function VendorSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    // Profile Settings
    businessName: "Fresh Fruits Ghana",
    ownerName: "John Doe",
    email: "vendor@demo.com",
    phone: "+233 24 123 4567",
    address: "Accra Central Market, Stall 45",
    description: "We provide fresh fruits and vegetables daily",

    // Business Settings
    businessType: "retail",
    operatingHours: {
      open: "06:00",
      close: "18:00",
    },
    deliveryRadius: "10",
    minimumOrder: "20",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    promotionNotifications: true,
    systemNotifications: true,

    // Privacy Settings
    profileVisibility: true,
    showContactInfo: true,
    allowReviews: true,

    // Payment Settings
    paymentMethods: ["mobile_money", "cash"],
    autoAcceptOrders: false,

    // Security
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Updated",
        description: `Your ${section} settings have been saved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold">Vendor Settings</h1>
        </div>
        <p className="text-gray-600">Manage your account and business preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center space-x-2">
            <Store className="w-4 h-4" />
            <span>Business</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Profile Information</span>
              </CardTitle>
              <CardDescription>Update your personal and business information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Camera className="w-4 h-4" />
                    <span>Change Photo</span>
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={settings.businessName}
                    onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    value={settings.ownerName}
                    onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  rows={3}
                />
              </div>

              <Button onClick={() => handleSave("profile")} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="w-5 h-5" />
                <span>Business Settings</span>
              </CardTitle>
              <CardDescription>Configure your business operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={settings.businessType}
                    onValueChange={(value) => setSettings({ ...settings, businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="grocery">Grocery Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                  <Input
                    id="deliveryRadius"
                    type="number"
                    value={settings.deliveryRadius}
                    onChange={(e) => setSettings({ ...settings, deliveryRadius: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Operating Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={settings.operatingHours.open}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          operatingHours: { ...settings.operatingHours, open: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={settings.operatingHours.close}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          operatingHours: { ...settings.operatingHours, close: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumOrder">Minimum Order Amount (GHS)</Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  value={settings.minimumOrder}
                  onChange={(e) => setSettings({ ...settings, minimumOrder: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Accept Orders</Label>
                  <p className="text-sm text-gray-500">Automatically accept orders without manual review</p>
                </div>
                <Switch
                  checked={settings.autoAcceptOrders}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOrders: checked })}
                />
              </div>

              <Button onClick={() => handleSave("business")} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Business Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified about new orders and updates</p>
                  </div>
                  <Switch
                    checked={settings.orderNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Promotion Notifications</Label>
                    <p className="text-sm text-gray-500">Updates about your promotions and campaigns</p>
                  </div>
                  <Switch
                    checked={settings.promotionNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, promotionNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Notifications</Label>
                    <p className="text-sm text-gray-500">Important system updates and announcements</p>
                  </div>
                  <Switch
                    checked={settings.systemNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, systemNotifications: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("notifications")} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Notification Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>Control your privacy and visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-gray-500">Make your profile visible to customers</p>
                  </div>
                  <Switch
                    checked={settings.profileVisibility}
                    onCheckedChange={(checked) => setSettings({ ...settings, profileVisibility: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Contact Information</Label>
                    <p className="text-sm text-gray-500">Display phone and email to customers</p>
                  </div>
                  <Switch
                    checked={settings.showContactInfo}
                    onCheckedChange={(checked) => setSettings({ ...settings, showContactInfo: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Reviews</Label>
                    <p className="text-sm text-gray-500">Let customers leave reviews and ratings</p>
                  </div>
                  <Switch
                    checked={settings.allowReviews}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowReviews: checked })}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("privacy")} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={settings.currentPassword}
                      onChange={(e) => setSettings({ ...settings, currentPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={settings.newPassword}
                      onChange={(e) => setSettings({ ...settings, newPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={settings.confirmPassword}
                    onChange={(e) => setSettings({ ...settings, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Password Requirements</h4>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave("security")} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
