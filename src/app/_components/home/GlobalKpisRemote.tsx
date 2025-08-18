"use client"

import { useMetrics } from "../../../hooks/useMetrics"
import { KPICard } from "../../../components/kpi-card"
import { DollarSign, Users, LineChart, SmilePlus } from "lucide-react"

export default function GlobalKpisRemote() {
  const { data, loading, error, refresh } = useMetrics()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[98px] rounded-xl border bg-card animate-pulse" />
        ))}
      </div>
    )
  }
  if (error || !data) {
    return (
      <div className="rounded-xl border bg-card p-4 text-sm text-destructive">
        Failed to load KPIs. <button onClick={refresh} className="underline">Retry</button>
      </div>
    )
  }

  const { kpis } = data
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Revenue YTD"
        value={kpis.revenueYTD}
        format="currency"
        change={kpis.delta.revenueYTD}
        changeLabel="vs YTD"
        trend={kpis.delta.revenueYTD >= 0 ? "up" : "down"}
        icon={<DollarSign className="h-4 w-4" />}
        className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
      />
      <KPICard
        title="Active Customers"
        value={kpis.activeCustomers}
        change={kpis.delta.activeCustomers}
        changeLabel="vs 30d"
        trend={kpis.delta.activeCustomers >= 0 ? "up" : "down"}
        icon={<Users className="h-4 w-4" />}
        className="bg-gradient-to-br from-[hsl(var(--chart-2))]/10 to-[hsl(var(--chart-2))]/5 border-[hsl(var(--chart-2))]/20"
      />
      <KPICard
        title="Gross Margin"
        value={kpis.grossMargin}
        format="percentage"
        change={kpis.delta.grossMargin}
        changeLabel="vs quarter"
        trend={kpis.delta.grossMargin >= 0 ? "up" : "down"}
        icon={<LineChart className="h-4 w-4" />}
        className="bg-gradient-to-br from-[hsl(var(--chart-3))]/10 to-[hsl(var(--chart-3))]/5 border-[hsl(var(--chart-3))]/20"
      />
      <KPICard
        title="NPS"
        value={kpis.nps}
        change={kpis.delta.nps}
        changeLabel="new survey"
        trend={kpis.delta.nps >= 0 ? "up" : "down"}
        icon={<SmilePlus className="h-4 w-4" />}
        className="bg-gradient-to-br from-[hsl(var(--chart-4))]/10 to-[hsl(var(--chart-4))]/5 border-[hsl(var(--chart-4))]/20"
      />
    </div>
  )
}
