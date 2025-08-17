import React from "react"

export default function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl border p-4 ${className}`}>
      <div className="h-4 w-24 bg-muted rounded mb-3 animate-pulse" />
      <div className="h-6 w-40 bg-muted rounded mb-4 animate-pulse" />
      <div className="h-40 bg-muted rounded animate-pulse" />
    </div>
  )
}
