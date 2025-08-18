import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="container mx-auto p-6 max-w-7xl h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Chat List Skeleton */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-10 w-full" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 p-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <Skeleton className="h-3 w-32 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window Skeleton */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                    <Skeleton className={`h-12 ${i % 2 === 0 ? "w-48" : "w-32"} rounded-lg`} />
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
