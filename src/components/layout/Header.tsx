"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Home,
  Search,
  SunMedium,
  Moon,
  Menu,
  X,
  SlidersHorizontal, // density
} from "lucide-react"
import { navItems } from "./Sidebar"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [density, setDensity] = React.useState<"comfortable" | "compact">(
    (typeof window !== "undefined" && (document.documentElement.dataset.density as any)) || "comfortable",
  )

  // Density toggle writes to :root dataset so table/card spacing follows
  const toggleDensity = React.useCallback(() => {
    setDensity((d) => {
      const next = d === "comfortable" ? "compact" : "comfortable"
      if (typeof window !== "undefined") {
        if (next === "compact") document.documentElement.setAttribute("data-density", "compact")
        else document.documentElement.removeAttribute("data-density")
      }
      return next
    })
  }, [])

  // Mobile drawer using <dialog>
  const dialogRef = React.useRef<HTMLDialogElement | null>(null)
  const openDrawer = () => dialogRef.current?.showModal()
  const closeDrawer = () => dialogRef.current?.close()

  React.useEffect(() => {
    if (!dialogRef.current) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      closeDrawer()
    }
    dialogRef.current.addEventListener("cancel", onCancel)
    return () => dialogRef.current?.removeEventListener("cancel", onCancel)
  }, [])

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

          {/* Home breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border px-2.5 py-2 text-sm hover:bg-card"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Search */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="relative hidden sm:flex">
              <input
                placeholder="Search dashboards..."
                className="w-64 rounded-md border bg-card px-8 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Density */}
            <button
              onClick={toggleDensity}
              className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm hover:bg-card"
              aria-label="Toggle density"
              title="Toggle density"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden md:inline">{density === "compact" ? "Compact" : "Comfortable"}</span>
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
        className="backdrop:bg-black/40 rounded-xl p-0 border w-[90vw] max-w-sm"
      >
        <div className="flex items-center justify-between border-b p-3">
          <span className="text-sm font-medium">Menu</span>
          <button onClick={closeDrawer} className="rounded-md border p-1.5" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="p-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={closeDrawer}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-card/80"
            >
              <Icon className="h-4 w-4 text-[hsl(var(--chart-1))]" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </dialog>
    </div>
  )
}
