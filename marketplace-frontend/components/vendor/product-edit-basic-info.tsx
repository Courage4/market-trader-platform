"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, units } from "./product-edit-data"

interface ProductEditBasicInfoProps {
  formData: any
  onInputChange: (field: string, value: string | boolean | number) => void
}

export default function ProductEditBasicInfo({ formData, onInputChange }: ProductEditBasicInfoProps) {
  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="form-label">
          Product Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          placeholder="Enter product name"
          className="form-input"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="form-label">
          Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onInputChange("description", e.target.value)}
          placeholder="Describe your product in detail..."
          rows={4}
          className="form-textarea"
          required
        />
      </div>

      {/* Category and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="form-label">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(value) => onInputChange("category", value)}>
            <SelectTrigger className="form-select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((group) => (
                <div key={group.group}>
                  <div className="px-2 py-1.5 text-sm font-semibold text-gray-500">
                    {group.group}
                  </div>
                  {group.items.map((item) => (
                    <SelectItem key={item} value={item.toLowerCase().replace(/\s+/g, "-")}>
                      {item}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="form-label">
            Price (₵) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => onInputChange("price", e.target.value)}
            placeholder="0.00"
            className="form-input"
            required
          />
        </div>
      </div>

      {/* Stock and Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="stock" className="form-label">
            Stock Quantity <span className="text-red-500">*</span>
          </Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => onInputChange("stock", e.target.value)}
            placeholder="0"
            className="form-input"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit" className="form-label">
            Unit of Measurement
          </Label>
          <Select value={formData.unit} onValueChange={(value) => onInputChange("unit", value)}>
            <SelectTrigger className="form-select">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="form-label">
          Tags
        </Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => onInputChange("tags", e.target.value)}
          placeholder="organic, fresh, local (comma separated)"
          className="form-input"
        />
        <p className="text-sm text-gray-500">Separate tags with commas for better searchability</p>
      </div>
    </div>
  )
}