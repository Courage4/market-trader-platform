"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TrendingUp, Plus } from "lucide-react"

export default function PromotionsHeader() {
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Promotion Management</h1>
            <p className="text-muted-foreground">Manage promotion plans and monitor vendor promotions</p>
          </div>
        </div>
        <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Promotion Plan</DialogTitle>
              <DialogDescription>Add a new promotion plan for vendors</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="planName">Plan Name</Label>
                <Input id="planName" placeholder="e.g., Premium Monthly" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input id="duration" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="19.99" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea id="features" placeholder="List features separated by commas" rows={3} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Create Plan</Button>
                <Button variant="outline" onClick={() => setIsCreatePlanOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}