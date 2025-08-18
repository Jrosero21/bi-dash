"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export type FilterState = {
  timeRange?: "7d" | "30d" | "90d" | "ytd"
  region?: string
  department?: string
  [key: string]: string | undefined
}

type Ctx = {
  filters: FilterState
  setFilter: (key: keyof FilterState, value?: string) => void
  resetFilters: () => void
  getFilteredData: <T>(data: T[], predicate: (item: T, f: FilterState) => boolean) => T[]
}

const FilterContext = React.createContext<Ctx | null>(null)

function readFromSearch(params: URLSearchParams): FilterState {
  const obj: FilterState = {}
  const timeRange = params.get("range") ?? undefined
  const region = params.get("region") ?? undefined
  const department = params.get("dept") ?? undefined
  if (timeRange) obj.timeRange = timeRange as FilterState["timeRange"]
  if (region) obj.region = region
  if (department) obj.department = department
  // include any extra keys (future-proof)
  params.forEach((v, k) => {
    if (!["range", "region", "dept"].includes(k)) obj[k] = v
  })
  return obj
}

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = React.useState<FilterState>(() => readFromSearch(searchParams))

  // keep local state in sync if the URL changes (Back/Forward)
  React.useEffect(() => {
    setFilters(readFromSearch(searchParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()])

  const setFilter = React.useCallback(
    (key: keyof FilterState, value?: string) => {
      setFilters((prev) => {
        const next = { ...prev }
        if (value == null || value === "") delete next[key]
        else next[key] = value
        // mirror to URL
        const sp = new URLSearchParams(searchParams.toString())
        const mapKey = key === "timeRange" ? "range" : key === "department" ? "dept" : (key as string)
        if (value == null || value === "") sp.delete(mapKey)
        else sp.set(mapKey, value)
        router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
        return next
      })
    },
    [pathname, router, searchParams]
  )

  const resetFilters = React.useCallback(() => {
    setFilters({})
    router.replace(pathname, { scroll: false })
  }, [pathname, router])

  const getFilteredData = React.useCallback(
    <T,>(data: T[], predicate: (item: T, f: FilterState) => boolean) => {
      try {
        return data.filter((item) => predicate(item, filters))
      } catch {
        return data
      }
    },
    [filters]
  )

  const value: Ctx = { filters, setFilter, resetFilters, getFilteredData }
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const ctx = React.useContext(FilterContext)
  if (!ctx) throw new Error("useFilters must be used within <FilterProvider>")
  return ctx
}
