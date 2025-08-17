"use client"

import Link from "next/link"
import type React from "react"
import {
  Gauge,
  Briefcase,
  Calculator,
  Cpu,
  Settings,
  Users,
  LineChart,
  Building2,
  LayoutDashboard,
} from "lucide-react"

import GlobalKpis from "./_components/home/GlobalKpis"
import InsightCard from "./_components/home/InsightCard"

type Tile = {
  href: string
  title: string
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const tiles: Tile[] = [
  { href: "/dashboard/executive", title: "Executive", desc: "Company-wide KPIs & trends", icon: LineChart },
  { href: "/dashboard/sales", title: "Sales", desc: "Revenue, cash collected, pipeline", icon: Briefcase },
  { href: "/dashboard/accounting", title: "Accounting", desc: "Budget vs revenue, margins", icon: Calculator },
  { href: "/dashboard/it", title: "IT", desc: "Uptime, security, infra costs", icon: Cpu },
  { href: "/dashboard/operations", title: "Operations", desc: "Efficiency, throughput, quality", icon: Settings },
  { href: "/dashboard/business", title: "Business", desc: "Units, markets, customers", icon: Users },
  { href: "/dashboard/intelligence", title: "Intelligence", desc: "ML models, data quality", icon: Gauge },
  { href: "/dashboard/vendor-relations", title: "Vendor Relations", desc: "Supplier performance & spend", icon: Building2 },
  { href: "/dashboard/custom", title: "Custom Dashboard", desc: "Your own layout & KPIs (coming soon)", icon: LayoutDashboard },
]

type Accent = { text: string; border: string; glow: string }
const colorClasses: Accent[] = [
  { text: "text-[hsl(var(--chart-1))]", border: "border-[hsl(var(--chart-1))]/30", glow: "from-[hsl(var(--chart-1))]/28" },
  { text: "text-[hsl(var(--chart-2))]", border: "border-[hsl(var(--chart-2))]/30", glow: "from-[hsl(var(--chart-2))]/28" },
  { text: "text-[hsl(var(--chart-3))]", border: "border-[hsl(var(--chart-3))]/30", glow: "from-[hsl(var(--chart-3))]/30" },
  { text: "text-[hsl(var(--chart-4))]", border: "border-[hsl(var(--chart-4))]/30", glow: "from-[hsl(var(--chart-4))]/28" },
  { text: "text-[hsl(var(--chart-5))]", border: "border-[hsl(var(--chart-5))]/30", glow: "from-[hsl(var(--chart-5))]/28" },
]

// TS-friendly CSS custom props for the fade-up animation
const fadeVars = (delayMs: number, durationMs = 800): React.CSSProperties =>
  ({
    ["--fade-up-delay" as any]: `${delayMs}ms`,
    ["--fade-up-duration" as any]: `${durationMs}ms`,
  } as React.CSSProperties)

export default function Home() {
  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
          <div className="absolute -top-40 -left-40 size-[520px] blur-3xl bg-[radial-gradient(circle, hsl(var(--chart-4))/32, transparent_60%)]" />
          <div className="absolute -bottom-48 -right-48 size-[520px] blur-3xl bg-[radial-gradient(circle, hsl(var(--chart-2))/28, transparent_60%)]" />
        </div>
      </div>

      {/* Heading */}
      <header className="space-y-2 fade-up" style={fadeVars(80, 750)}>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          KPI Dashboard
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Explore department dashboards with live KPIs, charts, and reports.
        </p>
      </header>

      {/* Company Pulse KPIs */}
      <div className="fade-up" style={fadeVars(120, 700)}>
        <GlobalKpis />
      </div>

      {/* AI Snapshot */}
      <div className="fade-up" style={fadeVars(200, 750)}>
        <InsightCard />
      </div>

      {/* Section break: full-width gradient bar with centered label */}
      <div
        className="relative my-8 fade-up"
        style={fadeVars(240, 650)}
        aria-label="Dashboards section"
      >
        <div
          className="h-11 rounded-2xl border overflow-hidden
                     bg-[linear-gradient(90deg,
                       hsl(var(--chart-1))/12 0%,
                       hsl(var(--chart-2))/12 20%,
                       hsl(var(--chart-3))/12 40%,
                       hsl(var(--chart-4))/12 60%,
                       hsl(var(--chart-5))/12 80%,
                       hsl(var(--chart-1))/12 100%
                     )]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="pointer-events-auto px-3 py-1 text-xs font-medium rounded-full border bg-card/80 supports-[backdrop-filter]:bg-card/60 backdrop-blur">
            Dashboards
          </span>
        </div>
      </div>

      {/* Tiles */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tiles.map(({ href, title, desc, icon: Icon }, i) => {
          const accent = colorClasses[i % colorClasses.length] as Accent
          return (
            <Link
              key={href}
              href={href}
              className={`group relative overflow-hidden rounded-2xl border bg-card/70 supports-[backdrop-filter]:bg-card/55 backdrop-blur p-5
                          transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                          ${accent.border} fade-up`}
              style={fadeVars(320 + i * 80, 800)}
            >
              {/* soft internal glow on hover */}
              <div
                className={`pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            bg-gradient-to-br ${accent.glow} to-transparent`}
              />

              <div className="flex items-center gap-3">
                <div className={`rounded-xl border bg-secondary text-secondary-foreground p-2 shrink-0 ${accent.border}`}>
                  <Icon className={`h-5 w-5 ${accent.text}`} />
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
          )
        })}
      </section>
    </div>
  )
}
