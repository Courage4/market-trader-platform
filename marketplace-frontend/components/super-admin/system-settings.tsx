"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { systemSettings, SystemSetting } from "./system-data"

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>(systemSettings)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSettingChange = (id: string, value: string | number | boolean) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Settings Updated",
        description: "System settings have been successfully updated.",
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

  const handleResetToDefaults = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSettings(systemSettings)
      toast({
        title: "Settings Reset",
        description: "All settings have been reset to their default values.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case "boolean":
        return (
          <Switch
            checked={setting.value as boolean}
            onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
          />
        )
      case "select":
        return (
          <Select
            value={setting.value as string}
            onValueChange={(value) => handleSettingChange(setting.id, value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "number":
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
            min={setting.min}
            max={setting.max}
            className="w-32"
          />
        )
      default:
        return (
          <Input
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="max-w-md"
          />
        )
    }
  }

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = []
    }
    acc[setting.category].push(setting)
    return acc
  }, {} as Record<string, SystemSetting[]>)

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure platform-wide settings and preferences</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetToDefaults} disabled={isLoading}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">{category}</h3>
                <Badge variant="secondary">{categorySettings.length} settings</Badge>
              </div>
              <div className="grid gap-4">
                {categorySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Label className="font-medium">{setting.name}</Label>
                        <Badge variant="outline" className="text-xs">
                          {setting.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                      {setting.min !== undefined && setting.max !== undefined && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Range: {setting.min} - {setting.max}
                        </p>
                      )}
                    </div>
                    <div className="ml-4">
                      {renderSettingInput(setting)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}