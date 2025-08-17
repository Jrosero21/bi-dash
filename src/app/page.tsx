"use client"

import Link from "next/link"
import type React from "react"
import {
  Gauge, Briefcase, Calculator, Cpu, Settings, Users, LineChart, Building2, LayoutDashboard,
} from "lucide-react"

import GlobalKpis from "./_components/home/GlobalKpis"
import InsightCard from "./_components/home/InsightCard"
import Backdrop from "~/components/ui/Backdrop"

type Tile = {
  href: string
  title: string
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const tiles: Tile[] = [
  { href: "/dashboard/executive",        title: "Executive",        desc: "Company-wide KPIs & trends",        icon: LineChart },
  { href: "/dashboard/sales",            title: "Sales",            desc: "Revenue, cash collected, pipeline", icon: Briefcase },
  { href: "/dashboard/accounting",       title: "Accounting",       desc: "Budget vs revenue, margins",        icon: Calculator },
  { href: "/dashboard/it",               title: "IT",               desc: "Uptime, security, infra costs",     icon: Cpu },
  { href: "/dashboard/operations",       title: "Operations",       desc: "Efficiency, throughput, quality",   icon: Settings },
  { href: "/dashboard/business",         title: "Business",         desc: "Units, markets, customers",         icon: Users },
  { href: "/dashboard/intelligence",     title: "Intelligence",     desc: "ML models, data quality",           icon: Gauge },
  { href: "/dashboard/vendor-relations", title: "Vendor Relations", desc: "Supplier performance & spend",      icon: Building2 },
  { href: "/dashboard/custom",           title: "Custom Dashboard", desc: "Your own layout & KPIs (coming soon)", icon: LayoutDashboard },
]

/* rotate icon accents with the new palette */
const iconAccents = [
  "text-[hsl(var(--chart-1))]",
  "text-[hsl(var(--chart-2))]",
  "text-[hsl(var(--chart-3))]",
  "text-[hsl(var(--chart-4))]",
  "text-[hsl(var(--chart-5))]",
]

/* animation vars */
const fadeVars = (delayMs: number, durationMs = 800): React.CSSProperties =>
  ({ ["--fade-up-delay" as any]: `${delayMs}ms`, ["--fade-up-duration" as any]: `${durationMs}ms` } as React.CSSProperties)

export default function Home() {
  return (
    <div className="relative">
      {/* Modern background preset: spotlight + grid + noise + vignette */}
      <Backdrop layers={["spotlight", "grid", "noise", "vignette"]} />

      {/* heading */}
      <header className="space-y-2 fade-up" style={fadeVars(80, 750)}>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          KPI Dashboard
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Explore department dashboards with live KPIs, charts, and reports.
        </p>
      </header>

      {/* KPIs + Insight */}
      <div className="fade-up" style={fadeVars(120, 700)}><GlobalKpis /></div>
      <div className="fade-up" style={fadeVars(200, 750)}><InsightCard /></div>

      {/* tiles */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tiles.map(({ href, title, desc, icon: Icon }, i) => (
          <Link
            key={href}
            href={href}
            className={`group relative overflow-hidden rounded-2xl border bg-card/80 supports-[backdrop-filter]:bg-card/60 backdrop-blur p-5
                        transition-all duration-300 hover:-translate-y-0.5
                        ring-1 ring-inset ring-[hsl(var(--ring)/0.06)] hover:ring-[hsl(var(--ring)/0.14)]
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring fade-up`}
            style={fadeVars(260 + i * 80, 800)}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border bg-secondary text-secondary-foreground p-2 shrink-0">
                <Icon className={`h-5 w-5 ${iconAccents[i % iconAccents.length]}`} />
              </div>
              <div>
                <h3 className="text-base font-medium">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="transition-colors group-hover:text-foreground">Open dashboard</span>
              <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
