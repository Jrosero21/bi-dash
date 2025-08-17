"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutGrid,
  LineChart,
  Briefcase,
  Calculator,
  Cpu,
  Settings,
  Users,
  Gauge,
  Building2,
  LayoutDashboard,
} from "lucide-react"

type Item = { href: string; label: string; icon: any }

const items: Item[] = [
  { href: "/dashboard/executive", label: "Executive", icon: LineChart },
  { href: "/dashboard/sales", label: "Sales", icon: Briefcase },
  { href: "/dashboard/accounting", label: "Accounting", icon: Calculator },
  { href: "/dashboard/it", label: "IT", icon: Cpu },
  { href: "/dashboard/operations", label: "Operations", icon: Settings },
  { href: "/dashboard/business", label: "Business", icon: Users },
  { href: "/dashboard/intelligence", label: "Intelligence", icon: Gauge },
  { href: "/dashboard/vendor-relations", label: "Vendor Relations", icon: Building2 },
  { href: "/dashboard/custom", label: "Custom Dashboard", icon: LayoutDashboard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex w-64 shrink-0 flex-col border-r bg-sidebar
                 supports-[backdrop-filter]:backdrop-blur-xl"
    >
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 px-4 border-b">
        <div className="grid place-items-center size-8 rounded-md border bg-card/70">
          <LayoutGrid className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium">Dashboard</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
                          transition-all
                          ${active
                            ? "bg-card/80 text-foreground border-[hsl(var(--ring)/0.35)] shadow-[0_0_0_1px_hsl(var(--ring)/0.25)]"
                            : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card/80"} `}
            >
              <span className={`grid place-items-center rounded-md border p-1.5
                                 ${active ? "border-[hsl(var(--ring)/0.35)]" : ""}`}>
                <Icon className={`h-4 w-4 ${active ? "text-[hsl(var(--chart-1))]" : ""}`} />
              </span>
              <span className="truncate">{label}</span>
              <span
                className={`ml-auto size-1.5 rounded-full transition-opacity
                            ${active ? "opacity-100 bg-[hsl(var(--chart-1))]" : "opacity-0 group-hover:opacity-60 bg-muted-foreground"}`}
              />
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto p-3 text-xs text-muted-foreground">
        <p className="px-1">v1 • Tailwind v4 tokens</p>
      </div>
    </aside>
  )
}
