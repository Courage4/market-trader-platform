import { BarChart3 } from "lucide-react"

export default function AnalyticsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <BarChart3 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics across the platform</p>
        </div>
      </div>
    </div>
  )
}