"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LineChart, Briefcase, Calculator, Cpu, Settings, Users, Gauge, Building2 } from "lucide-react"

const links = [
  { href: "/dashboard/executive",    label: "Executive",        icon: LineChart },
  { href: "/dashboard/sales",        label: "Sales",            icon: Briefcase },
  { href: "/dashboard/accounting",   label: "Accounting",       icon: Calculator },
  { href: "/dashboard/it",           label: "IT",               icon: Cpu },
  { href: "/dashboard/operations",   label: "Operations",       icon: Settings },
  { href: "/dashboard/business",     label: "Business",         icon: Users },
  { href: "/dashboard/intelligence", label: "Intelligence",     icon: Gauge },
  { href: "/dashboard/vendor-relations", label: "Vendor Relations", icon: Building2 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-screen sticky top-0 p-4 flex flex-col">
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold">
          <span className="inline-block rounded-md border px-2 py-1">BI</span>
          <span>Dashboard</span>
        </Link>
      </div>

      <nav className="mt-2 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto text-[11px] text-muted-foreground px-1">
        v1 • Tailwind v4 tokens
      </div>
    </div>
  )
}
