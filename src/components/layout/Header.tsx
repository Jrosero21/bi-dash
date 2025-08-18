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
  SlidersHorizontal, // correct Lucide name
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

// If you don't have this, remove the import and the <SavedViews /> usage.
import SavedViews from "../saved-views/saved-views"

type LinkItem = {
  href: string
  title: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

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
    setTimeout(closeDrawer, 10)
  }

  return (
    <div className="sticky top-0 z-30 border-b bg-background/80 supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="flex h-14 items-center gap-3">
          {/* Mobile: hamburger */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md border bg-card/60 px-2.5 py-2 hover:bg-card"
            onClick={openDrawer}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border bg-card/60 px-2.5 py-2 text-sm hover:bg-card"
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
              className="inline-flex items-center gap-1.5 rounded-md border bg-card/60 px-2.5 py-2 text-sm hover:bg-card"
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
              className="inline-flex items-center justify-center rounded-md border bg-card/60 p-2 hover:bg-card"
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
        className="backdrop:bg-black/45 p-0"
      >
        {/* Panel with “glass” look */}
        <div className="m-0 w-[92vw] max-w-xs rounded-xl border bg-background/90 supports-[backdrop-filter]:backdrop-blur shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2.5 bg-card/70">
            <span className="text-sm font-medium">Menu</span>
            <button onClick={closeDrawer} className="rounded-md border bg-card/60 p-1.5 hover:bg-card" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="max-h-[70vh] overflow-y-auto p-2">
            {/* Home item */}
            <button
              onClick={() => go("/")}
              className={[
                "w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname === "/"
                  ? "bg-primary/10 ring-1 ring-primary/25"
                  : "hover:bg-card",
              ].join(" ")}
            >
              <span className={[
                "grid place-items-center h-6 w-6 rounded-md border shrink-0",
                pathname === "/" ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
              ].join(" ")}>
                <Home className="h-3.5 w-3.5" />
              </span>
              <span className="truncate">Home</span>
            </button>

            <div className="my-2 h-px bg-border/70" />

            {NAV_LINKS.map(({ href, title, Icon }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`)
              return (
                <button
                  key={href}
                  onClick={() => go(href)}
                  className={[
                    "w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 ring-1 ring-primary/25"
                      : "hover:bg-card",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "grid place-items-center h-6 w-6 rounded-md border shrink-0",
                      active ? "border-primary/30 text-primary" : "border-border text-muted-foreground",
                    ].join(" ")}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate">{title}</span>
                </button>
              )
            })}
          </nav>

          {/* Footer actions */}
          <div className="border-t bg-card/70 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={toggleDensity}
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Density</span>
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center justify-center gap-2 rounded-md border bg-card/60 px-3 py-2 text-sm hover:bg-card"
              >
                {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>Theme</span>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}
