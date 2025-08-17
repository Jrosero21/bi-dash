"use client"

import type React from "react"
import { useState } from "react"
import { ChartContainer } from "~/components/chart-container"
import { useFilters } from "~/components/filter-context"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { X } from "lucide-react"

interface InteractiveChartProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  filterKey?: string
  onDataClick?: (dataKey: string, value: string) => void
}

export function InteractiveChart({
  title,
  description,
  children,
  className,
  filterKey,
  onDataClick,
}: InteractiveChartProps) {
  const { filters, setFilter, clearFilter } = useFilters()
  const [activeSelection, setActiveSelection] = useState<string | null>(null)

  const handleChartClick = (data: any) => {
    if (!filterKey || !data) return

    const value = data.activeLabel || data.name || data.dataKey
    if (!value) return

    // Toggle selection
    if (activeSelection === value) {
      setActiveSelection(null)
      clearFilter(filterKey)
    } else {
      setActiveSelection(value)
      setFilter(filterKey, value)
    }

    onDataClick?.(filterKey, value)
    console.log(`[v0] Chart interaction: ${filterKey} = ${value}`)
  }

  const currentFilter = filterKey ? filters[filterKey] : null

  return (
    <ChartContainer
      title={title}
      description={description}
      className={className}
      actions={
        currentFilter && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {filterKey}: {currentFilter}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 ml-1"
              onClick={() => {
                clearFilter(filterKey!)
                setActiveSelection(null)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )
      }
    >
      <div onClick={handleChartClick} className="cursor-pointer">
        {children}
      </div>
    </ChartContainer>
  )
}
