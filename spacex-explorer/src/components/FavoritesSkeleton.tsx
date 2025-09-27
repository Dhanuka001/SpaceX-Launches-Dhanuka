export default function FavoritesSkeleton() {
  return (
    <div className="grid gap-3 min-w-4xl sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border border-gray-300 rounded-lg p-4 animate-pulse space-y-3"
        >
          {/* Title */}
          <div className="h-5 w-2/3 bg-gray-200 rounded" />

          {/* Date */}
          <div className="h-4 w-1/3 bg-gray-200 rounded" />

          {/* Status pill */}
          <div className="h-5 w-16 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  )
}
