"use client"

import { DollarSign, Users, LineChart, SmilePlus, BarChart3 } from "lucide-react"
import { KPICard } from "../../kpi-card"
import type { KpiBlock as TKpiBlock, KpiItem } from "../../../lib/dashboard/types"

const IconMap: Record<NonNullable<KpiItem["icon"]>, any> = {
  dollar: DollarSign,
  users: Users,
  margin: LineChart,
  nps: SmilePlus,
  generic: BarChart3,
}

export default function KpiBlock({ block }: { block: TKpiBlock }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {block.items.map((kpi, i) => {
        const Icon = kpi.icon ? IconMap[kpi.icon] : BarChart3
        const trend = (kpi.delta ?? 0) < 0 ? "down" : "up"
        return (
          <KPICard
            key={i}
            title={kpi.title}
            value={kpi.value}
            format={kpi.format ?? "number"}
            change={Math.abs(kpi.delta ?? 0)}
            changeLabel="vs prior"
            trend={trend}
            icon={<Icon className="h-4 w-4" />}
            className={
              [
                "bg-gradient-to-br border",
                `from-[hsl(var(--chart-${(i % 4) + 1}))]/10`,
                `to-[hsl(var(--chart-${((i + 1) % 4) + 1}))]/5`,
                `border-[hsl(var(--chart-${(i % 4) + 1}))]/25`,
              ].join(" ")
            }
          />
        )
      })}
    </section>
  )
}
