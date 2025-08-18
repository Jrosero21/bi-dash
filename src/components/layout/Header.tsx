"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Home,
  Search,
  SunMedium,
  Moon,
  Menu,
  X,
  SlidersHorizontal, // <- note the plural "Sliders"
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

// If you have a SavedViews component, keep this import.
// If not, you can safely remove it.
import SavedViews from "../saved-views/saved-views"

type LinkItem = {
  href: string
  title: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

// Single source of truth for the nav (used in mobile drawer)
const NAV_LINKS: LinkItem[] = [
  { href: "/dashboard/executive",        title: "Executive",         Icon: LineChart },
  { href: "/dashboard/sales",            title: "Sales",             Icon: Briefcase },
  { href: "/dashboard/accounting",       title: "Accounting",        Icon: Calculator },
  { href: "/dashboard/it",               title: "IT",                Icon: Cpu },
  { href: "/dashboard/operations",       title: "Operations",        Icon: Settings },
  { href: "/dashboard/business",         title: "Business",          Icon: Users },
  { href: "/dashboard/intelligence",     title: "Intelligence",      Icon: Gauge },
  { href: "/dashboard/vendor-relations", title: "Vendor Relations",  Icon: Building2 },
  { href: "/dashboard/custom",           title: "Custom Dashboard",  Icon: LayoutDashboard },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Density toggle (comfortable / compact)
  const [density, setDensity] = React.useState<"comfortable" | "compact">("comfortable")
  React.useEffect(() => {
    const init = document.documentElement.dataset.density === "compact" ? "compact" : "comfortable"
    setDensity(init)
  }, [])
  const toggleDensity = () => {
    setDensity((d) => {
      const next = d === "comfortable" ? "compact" : "comfortable"
      if (next === "compact") document.documentElement.setAttribute("data-density", "compact")
      else document.documentElement.removeAttribute("data-density")
      return next
    })
  }

  // Mobile drawer
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const openDrawer = () => dialogRef.current?.showModal()
  const closeDrawer = () => dialogRef.current?.close()

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeDrawer() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (href: string) => {
    router.push(href)
    // close after navigation tick to avoid abrupt paint
    setTimeout(closeDrawer, 10)
  }

  return (
    <div className="sticky top-0 z-30 border-b bg-background/80 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="flex h-14 items-center gap-3">
          {/* Mobile: hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md border px-2.5 py-2"
            onClick={openDrawer}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Home button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-2 text-sm hover:bg-card"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative hidden sm:flex">
              <input
                placeholder="Search dashboards..."
                className="w-64 rounded-md border bg-card px-8 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Saved Views (optional) */}
            <SavedViews />

            {/* Density */}
            <button
              onClick={toggleDensity}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm hover:bg-card"
              aria-label="Toggle density"
              title="Toggle density"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden md:inline">
                {density === "compact" ? "Compact" : "Comfortable"}
              </span>
            </button>

            {/* Theme */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center justify-center rounded-md border p-2"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <dialog
        ref={dialogRef}
        aria-modal="true"
        role="dialog"
        className="backdrop:bg-black/40 rounded-xl p-0 border w-[90vw] max-w-sm"
      >
        <div className="flex items-center justify-between border-b p-3">
          <span className="text-sm font-medium">Menu</span>
          <button onClick={closeDrawer} className="rounded-md border p-1.5" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-2">
          {/* Home in drawer */}
          <button
            onClick={() => go("/")}
            className={[
              "w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm mb-1",
              pathname === "/" ? "bg-primary/10 border border-primary/20" : "hover:bg-card",
            ].join(" ")}
          >
            <Home className={["h-4 w-4", pathname === "/" ? "text-primary" : "text-muted-foreground"].join(" ")} />
            <span>Home</span>
          </button>

          {NAV_LINKS.map(({ href, title, Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <button
                key={href}
                onClick={() => go(href)}
                className={[
                  "w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                  active ? "bg-primary/10 border border-primary/20" : "hover:bg-card",
                ].join(" ")}
              >
                <Icon className={["h-4 w-4", active ? "text-primary" : "text-muted-foreground"].join(" ")} />
                <span className="truncate">{title}</span>
              </button>
            )
          })}
        </nav>
      </dialog>
    </div>
  )
}
