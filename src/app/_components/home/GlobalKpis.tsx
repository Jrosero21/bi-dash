"use client"

import { KPICard } from "~/components/kpi-card"
import { DollarSign, Users, TrendingUp, Smile } from "lucide-react"

/**
 * Neutral/glassy KPI strip:
 * - Cards are neutral; color is reserved for the icon & delta only
 * - Works with your theme tokens (light/dark)
 */
export default function GlobalKpis() {
  const baseCard =
    "bg-card/80 border-border supports-[backdrop-filter]:bg-card/60 backdrop-blur " +
    "ring-1 ring-inset ring-[hsl(var(--ring)/0.08)]"

  return (
    <section aria-label="Company Pulse" className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <KPICard
        title="Revenue YTD"
        value={12_450_000}
        format="currency"
        change={8.4}
        changeLabel="vs last YTD"
        trend="up"
        className={baseCard}
        icon={<DollarSign className="h-4 w-4 text-[hsl(var(--chart-2))]" aria-hidden="true" />}
      />
      <KPICard
        title="Active Customers"
        value={5870}
        change={4.1}
        changeLabel="last 30 days"
        trend="up"
        className={baseCard}
        icon={<Users className="h-4 w-4 text-[hsl(var(--chart-3))]" aria-hidden="true" />}
      />
      <KPICard
        title="Gross Margin"
        value={61.8}
        format="percentage"
        change={1.2}
        changeLabel="vs last quarter"
        trend="up"
        className={baseCard}
        icon={<TrendingUp className="h-4 w-4 text-[hsl(var(--chart-1))]" aria-hidden="true" />}
      />
      <KPICard
        title="NPS"
        value={47}
        change={5}
        changeLabel="new survey"
        trend="up"
        className={baseCard}
        icon={<Smile className="h-4 w-4 text-[hsl(var(--chart-5))]" aria-hidden="true" />}
      />
    </section>
  )
}
