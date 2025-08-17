"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Moon,
  SunMedium,
  Search,
  SlidersHorizontal,
  PanelLeft,
  X,
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

// Keep mobile & desktop menus in sync
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

export default function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  // density toggle writes to <html data-density="..."> (used by globals.css)
  const [density, setDensity] = React.useState<"comfortable" | "compact">(
    (typeof document !== "undefined" &&
      (document.documentElement.getAttribute("data-density") as "comfortable" | "compact")) || "comfortable",
  )
  React.useEffect(() => {
    document.documentElement.setAttribute("data-density", density)
  }, [density])

  return (
    <>
      <header
        className="sticky top-0 z-30 mb-6 border-b bg-background/70 supports-[backdrop-filter]:backdrop-blur
                   shadow-[inset_0_1px_0_hsl(var(--border))]"
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
            {/* Mobile menu button (only < lg) */}
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border bg-card/70
                         supports-[backdrop-filter]:backdrop-blur"
              aria-label="Open navigation"
            >
              <PanelLeft className="h-4 w-4" />
            </button>

            {/* Breadcrumb / Home link */}
            <div className="hidden md:flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="rounded-md px-1 py-0.5 hover:text-foreground hover:underline">
                Home
              </Link>
              {pathname !== "/" && (
                <>
                  <span aria-hidden>·</span>
                  <span className="truncate">{pathname.replace(/^\/+/, "")}</span>
                </>
              )}
            </div>

            {/* Search (flex-1 keeps things aligned) */}
            <div className="relative ml-auto w-full max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search dashboards…"
                className="w-full rounded-xl border bg-card/70 pl-9 pr-3 py-2 text-sm
                           supports-[backdrop-filter]:backdrop-blur
                           placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Density */}
            <button
              onClick={() => setDensity(density === "comfortable" ? "compact" : "comfortable")}
              className="hidden sm:inline-flex h-9 items-center gap-2 rounded-xl border bg-card/70 px-3 text-xs
                         hover:bg-secondary supports-[backdrop-filter]:backdrop-blur"
              aria-label="Toggle density"
              title="Toggle density"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {density === "comfortable" ? "Compact" : "Comfortable"}
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex h-9 items-center justify-center rounded-xl border bg-card/70 px-3
                         hover:bg-secondary supports-[backdrop-filter]:backdrop-blur"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <button
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />
          {/* Panel */}
          <div
            className="fixed inset-y-0 left-0 z-50 w-72 border-r bg-sidebar p-3
                       supports-[backdrop-filter]:backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-2 px-1 pb-3 border-b">
              <div className="grid place-items-center size-8 rounded-md border bg-card/70">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Dashboard</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-card/70"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-3 space-y-1">
              {items.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
                                transition-all
                                ${active
                                  ? "bg-card/80 text-foreground border-[hsl(var(--ring)/0.35)] shadow-[0_0_0_1px_hsl(var(--ring)/0.25)]"
                                  : "bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card/80"} `}
                  >
                    <span className={`grid place-items-center rounded-md border p-1.5
                                       ${active ? "border-[hsl(var(--ring)/0.35)]" : ""}`}>
                      <Icon className={`h-4 w-4 ${active ? "text-[hsl(var(--chart-2))]" : ""}`} />
                    </span>
                    <span className="truncate">{label}</span>
                    <span
                      className={`ml-auto size-1.5 rounded-full transition-opacity
                                  ${active ? "opacity-100 bg-[hsl(var(--chart-2))]" : "opacity-0 group-hover:opacity-60 bg-muted-foreground"}`}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
