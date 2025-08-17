"use client"

import { Search } from "lucide-react"
import ThemeToggle from "../ui/ThemeToggle"
import Breadcrumbs from "./BreadCrumbs"

export default function Header() {
  return (
    <div className="w-full flex items-center gap-3">
      {/* Left: breadcrumbs */}
      <div className="flex-1 min-w-0">
        <Breadcrumbs />
      </div>

      {/* Center: quick search (placeholder for now) */}
      <div className="hidden sm:flex items-center gap-2 rounded-xl border px-3 h-9 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Search dashboards…</span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  )
}
