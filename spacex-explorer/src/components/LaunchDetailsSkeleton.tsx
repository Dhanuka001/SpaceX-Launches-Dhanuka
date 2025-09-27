export default function LaunchDetailsSkeleton() {
  return (
    <div className="w-full min-w-xl mx-auto border border-gray-300 rounded-lg p-6 animate-pulse space-y-4">
      {/* Title */}
      <div className="h-6 w-1/3 bg-gray-200 rounded" />

      {/* Date */}
      <div className="h-4 w-1/4 bg-gray-200 rounded" />

      {/* Details */}
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />

      {/* Rocket Section */}
      <div className="space-y-2">
        <div className="h-5 w-20 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
      </div>

      {/* Launchpad Section */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>

      {/* Payloads Section */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  )
}
