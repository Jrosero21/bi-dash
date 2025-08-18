"use client"

import { DollarSign, Users, LineChart, SmilePlus, BarChart3 } from "lucide-react"
import { KPICard } from "../../kpi-card"
import type { KpiBlock, KpiItem } from "../../../lib/dashboard/types" // <-- 3x ..

const IconMap: Record<NonNullable<KpiItem["icon"]>, any> = {
  dollar: DollarSign,
  users: Users,
  margin: LineChart,
  nps: SmilePlus,
  generic: BarChart3,
}

export default function KpiBlock({ block }: { block: KpiBlock }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {block.items.map((kpi) => {
        const Icon = kpi.icon ? IconMap[kpi.icon] : BarChart3
        const trend: "up" | "down" | "neutral" =
          kpi.delta === undefined ? "neutral" : kpi.delta < 0 ? "down" : "up"

        return (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={typeof kpi.value === "number" ? kpi.value : Number(String(kpi.value))}
            format={
              kpi.format === "percent"
                ? "percentage"
                : kpi.format === "currency"
                ? "currency"
                : "number"
            }
            change={kpi.delta ?? 0}
            changeLabel={kpi.note ?? ""}
            trend={trend}
            icon={<Icon className="h-4 w-4" />}
          />
        )
      })}
    </section>
  )
}
