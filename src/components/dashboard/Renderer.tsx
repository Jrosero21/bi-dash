"use client"

import type { DashboardConfig } from "~/lib/dashboard/types"
import KpiBlock from "~/components/dashboard/blocks/KpiBlock"
import ChartBlock from "~/components/dashboard/blocks/ChartBlock"

export default function DashboardRenderer({ config }: { config: DashboardConfig }) {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{config.title}</h1>
        {config.description ? (
          <p className="text-sm text-muted-foreground">{config.description}</p>
        ) : null}
      </header>

      {config.blocks.map((b, i) => {
        if (b.kind === "kpi") return <KpiBlock key={`kpi-${i}`} block={b} />
        if (b.kind === "chart") return <ChartBlock key={`chart-${i}`} block={b} />
        return null
      })}
    </div>
  )
}
