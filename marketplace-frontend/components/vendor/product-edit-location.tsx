"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from "lucide-react"
import { ghanaMarkets } from "./product-edit-data"

interface ProductEditLocationProps {
  formData: any
  onInputChange: (field: string, value: string | boolean | number) => void
}

export default function ProductEditLocation({ formData, onInputChange }: ProductEditLocationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-emerald-500" />
        <h3 className="text-lg font-semibold">Location & Market</h3>
      </div>

      {/* Market Selection */}
      <div className="space-y-2">
        <Label htmlFor="market" className="form-label">
          Market Location <span className="text-red-500">*</span>
        </Label>
        <Select value={formData.market} onValueChange={(value) => onInputChange("market", value)}>
          <SelectTrigger className="form-select">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent>
            {ghanaMarkets.map((market) => (
              <SelectItem key={market.value} value={market.value}>
                <div className="flex flex-col">
                  <span className="font-medium">{market.label}</span>
                  <span className="text-sm text-gray-500">{market.city}, {market.region}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stall/Shop Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="form-label">
          Stall/Shop Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onInputChange("location", e.target.value)}
          placeholder="e.g., Stall 12, Block B"
          className="form-input"
        />
        <p className="text-sm text-gray-500">Help buyers find you within the market</p>
      </div>

      {/* Delivery Options */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Delivery Options</Label>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="deliveryAvailable"
            checked={formData.deliveryAvailable}
            onCheckedChange={(checked) => onInputChange("deliveryAvailable", checked)}
          />
          <Label htmlFor="deliveryAvailable" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Delivery Available
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="negotiable"
            checked={formData.negotiable}
            onCheckedChange={(checked) => onInputChange("negotiable", checked)}
          />
          <Label htmlFor="negotiable" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Price Negotiable
          </Label>
        </div>
      </div>

      {/* Order Range */}
      {formData.deliveryAvailable && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="minOrder" className="form-label">
              Minimum Order
            </Label>
            <Input
              id="minOrder"
              type="number"
              value={formData.minOrder}
              onChange={(e) => onInputChange("minOrder", e.target.value)}
              placeholder="1"
              className="form-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxOrder" className="form-label">
              Maximum Order
            </Label>
            <Input
              id="maxOrder"
              type="number"
              value={formData.maxOrder}
              onChange={(e) => onInputChange("maxOrder", e.target.value)}
              placeholder="50"
              className="form-input"
            />
          </div>
        </div>
      )}
    </div>
  )
}