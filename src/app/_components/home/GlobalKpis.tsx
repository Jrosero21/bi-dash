"use client"

import { KPICard } from "~/components/kpi-card"
import { DollarSign, Users, TrendingUp, Smile } from "lucide-react"

type Stat = {
  title: string
  value: number
  format?: "currency" | "percentage"
  change?: number
  changeLabel?: string
  trend?: "up" | "down"
  icon: React.ReactNode
  className?: string
}

const stats: Stat[] = [
  {
    title: "Revenue YTD",
    value: 12_450_000,
    format: "currency",
    change: 8.4,
    changeLabel: "vs last YTD",
    trend: "up",
    icon: <DollarSign className="h-4 w-4" aria-hidden="true" />,
    className: "bg-gradient-to-br from-chart-1/5 to-chart-1/10 border-chart-1/20",
  },
  {
    title: "Active Customers",
    value: 5_870,
    change: 4.1,
    changeLabel: "last 30 days",
    trend: "up",
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
    className: "bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20",
  },
  {
    title: "Gross Margin",
    value: 61.8,
    format: "percentage",
    change: 1.2,
    changeLabel: "vs last quarter",
    trend: "up",
    icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
    className: "bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20",
  },
  {
    title: "NPS",
    value: 47,
    change: 5,
    changeLabel: "new survey",
    trend: "up",
    icon: <Smile className="h-4 w-4" aria-hidden="true" />,
    className: "bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20",
  },
]

export default function GlobalKpis() {
  return (
    <section aria-label="Company Pulse" className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((s) => (
        <KPICard
          key={s.title}
          title={s.title}
          value={s.value}
          format={s.format}
          change={s.change}
          changeLabel={s.changeLabel}
          trend={s.trend}
          icon={s.icon}
          className={s.className}
        />
      ))}
    </section>
  )
}
