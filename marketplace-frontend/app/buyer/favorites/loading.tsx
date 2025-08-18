import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FavoritesLoading() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Filters Skeleton */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Skeleton className="h-10 flex-1" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-4 w-48 mb-6" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-6 w-24" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 flex-1" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
