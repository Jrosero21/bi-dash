"use client"

import { Search } from "lucide-react"
import ThemeToggle from "~/components/ui/ThemeToggle"
import Breadcrumbs from "~/components/layout/BreadCrumbs"
import SavedViews from "~/components/saved-views/SavedViews"
import DensityToggle from "~/components/ui/DensityToggle"

export default function Header() {
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <Breadcrumbs />
      </div>

      <div className="hidden sm:flex items-center gap-2 rounded-xl border px-3 h-9 text-sm text-muted-foreground">
        <Search className="h-4 w-4" />
        <span>Search dashboards…</span>
      </div>

      <div className="flex items-center gap-2">
        <SavedViews />
        <DensityToggle />
        <ThemeToggle />
      </div>
    </div>
  )
}
