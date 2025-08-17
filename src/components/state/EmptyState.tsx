import React from "react"

export default function EmptyState({
  title = "No data",
  description = "Try adjusting filters or date range.",
  action,
}: {
  title?: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border p-8 text-center bg-card">
      <h3 className="text-base font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
