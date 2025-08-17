"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

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
  const [filters, setFilters] = useState<FilterState>({})

  const setFilter = useCallback((key: string, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }, [])

  const clearAllFilters = useCallback(() => {
    setFilters({})
  }, [])

  const isFiltered = useCallback(
    (key: string, value: string) => {
      return filters[key] === value
    },
    [filters],
  )

  const getFilteredData = useCallback(
    <T,>(data: T[], filterFn: (item: T, filters: FilterState) => boolean) => {
      return data.filter((item) => filterFn(item, filters))
    },
    [filters],
  )

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilter,
        clearFilter,
        clearAllFilters,
        isFiltered,
        getFilteredData,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)

  if (context === undefined) {
    return {
      filters: {},
      setFilter: () => {},
      clearFilter: () => {},
      clearAllFilters: () => {},
      isFiltered: () => false,
      getFilteredData: <T,>(data: T[]) => data,
    }
  }

  return context
}
