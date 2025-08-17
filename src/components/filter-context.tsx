"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface FilterState {
  timeRange?: string
  region?: string
  department?: string
  category?: string
  salesRep?: string
  product?: string
  [key: string]: string | undefined
}

interface FilterContextType {
  filters: FilterState
  setFilter: (key: string, value: string | undefined) => void
  clearFilter: (key: string) => void
  clearAllFilters: () => void
  isFiltered: (key: string, value: string) => boolean
  getFilteredData: <T>(data: T[], filterFn: (item: T, filters: FilterState) => boolean) => T[]
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  const [filters, setFilters] = useState<FilterState>({})

  // 1) Keep context in-sync with URL (read on URL changes)
  useEffect(() => {
    const next: FilterState = {}
    sp.forEach((v, k) => {
      // only store first occurrence per key
      if (!(k in next)) next[k] = v
    })
    setFilters(next)
  }, [sp])

  // 2) Write helpers that also update the URL
  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      setFilters((prev) => {
        const draft = { ...prev }
        if (value == null || value === "") delete draft[key]
        else draft[key] = value

        const next = new URLSearchParams(sp.toString())
        if (value == null || value === "") next.delete(key)
        else next.set(key, value)

        router.replace(`${pathname}?${next.toString()}`, { scroll: false })
        return draft
      })
    },
    [router, pathname, sp],
  )

  const clearFilter = useCallback(
    (key: string) => {
      setFilters((prev) => {
        const draft = { ...prev }
        delete draft[key]

        const next = new URLSearchParams(sp.toString())
        next.delete(key)
        router.replace(`${pathname}?${next.toString()}`, { scroll: false })
        return draft
      })
    },
    [router, pathname, sp],
  )

  const clearAllFilters = useCallback(() => {
    setFilters({})
    const next = new URLSearchParams(sp.toString())
    // remove all known keys currently in state
    Object.keys(filters).forEach((k) => next.delete(k))
    router.replace(`${pathname}?${next.toString()}`, { scroll: false })
  }, [router, pathname, sp, filters])

  const isFiltered = useCallback((key: string, value: string) => filters[key] === value, [filters])

  const getFilteredData = useCallback(
    <T,>(data: T[], filterFn: (item: T, filters: FilterState) => boolean) => data.filter((item) => filterFn(item, filters)),
    [filters],
  )

  return (
    <FilterContext.Provider value={{ filters, setFilter, clearFilter, clearAllFilters, isFiltered, getFilteredData }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) {
    return {
      filters: {},
      setFilter: () => {},
      clearFilter: () => {},
      clearAllFilters: () => {},
      isFiltered: () => false,
      getFilteredData: <T,>(data: T[]) => data,
    }
  }
  return ctx
}
