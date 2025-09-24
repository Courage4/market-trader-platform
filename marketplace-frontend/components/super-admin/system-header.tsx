import { Settings } from "lucide-react"

export default function SystemHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Settings className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground">Configure system settings, monitor health, and manage security</p>
        </div>
      </div>
    </div>
  )
}