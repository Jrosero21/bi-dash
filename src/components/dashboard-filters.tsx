"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar, Filter, X } from "lucide-react"

interface FilterOption {
  id: string
  label: string
  value: string
}

interface DashboardFiltersProps {
  onFiltersChange?: (filters: Record<string, string>) => void
}

export function DashboardFilters({ onFiltersChange }: DashboardFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [showFilters, setShowFilters] = useState(false)

  const timeRanges = [
    { id: "7d", label: "Last 7 days", value: "7d" },
    { id: "30d", label: "Last 30 days", value: "30d" },
    { id: "90d", label: "Last 90 days", value: "90d" },
    { id: "1y", label: "Last year", value: "1y" },
  ]

  const regions = [
    { id: "all", label: "All Regions", value: "all" },
    { id: "north", label: "North", value: "north" },
    { id: "south", label: "South", value: "south" },
    { id: "east", label: "East", value: "east" },
    { id: "west", label: "West", value: "west" },
  ]

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value }
    setActiveFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const removeFilter = (key: string) => {
    const newFilters = { ...activeFilters }
    delete newFilters[key]
    setActiveFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const clearAllFilters = () => {
    setActiveFilters({})
    onFiltersChange?.({})
  }

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          {Object.keys(activeFilters).length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              Clear all
            </Button>
          )}
        </div>

        {/* Quick Time Range */}
        <Select onValueChange={(value) => handleFilterChange("timeRange", value)}>
          <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.id} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {value}
              <Button variant="ghost" size="sm" className="h-auto p-0 ml-1" onClick={() => removeFilter(key)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select onValueChange={(value) => handleFilterChange("timeRange", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.id} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select onValueChange={(value) => handleFilterChange("region", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.id} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select onValueChange={(value) => handleFilterChange("department", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
