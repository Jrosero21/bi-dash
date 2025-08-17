"use client"

import Link from "next/link"
import { Gauge, Briefcase, Calculator, Cpu, Settings, Users, LineChart, Building2, LayoutDashboard } from "lucide-react"

const tiles = [
  { href: "/dashboard/executive",        title: "Executive",         desc: "Company-wide KPIs & trends",        icon: LineChart },
  { href: "/dashboard/sales",            title: "Sales",             desc: "Revenue, cash collected, pipeline", icon: Briefcase },
  { href: "/dashboard/accounting",       title: "Accounting",        desc: "Budget vs revenue, margins",        icon: Calculator },
  { href: "/dashboard/it",               title: "IT",                desc: "Uptime, security, infra costs",     icon: Cpu },
  { href: "/dashboard/operations",       title: "Operations",        desc: "Efficiency, throughput, quality",   icon: Settings },
  { href: "/dashboard/business",         title: "Business",          desc: "Units, markets, customers",         icon: Users },
  { href: "/dashboard/intelligence",     title: "Intelligence",      desc: "ML models, data quality",           icon: Gauge },
  { href: "/dashboard/vendor-relations", title: "Vendor Relations",  desc: "Supplier performance & spend",      icon: Building2 },
  { href: "/dashboard/custom",           title: "Custom Dashboard",  desc: "Your own layout & KPIs (coming soon)", icon: LayoutDashboard },
]

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">KPI Dashboard</h1>
        <p className="text-sm text-muted-foreground">Choose a department to explore interactive metrics and reports.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tiles.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border p-5 bg-card hover:shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border bg-secondary text-secondary-foreground p-2">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-medium">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground">View dashboards →</div>
          </Link>
        ))}
      </section>
    </div>
  )
}
