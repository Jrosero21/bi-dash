"use client"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Calendar, Filter, X, RotateCcw } from "lucide-react"
import { useFilters } from "~/components/filter-context"
import { useState } from "react"

const filterOptions = {
  timeRange: [
    { id: "7d", label: "Last 7 days", value: "7d" },
    { id: "30d", label: "Last 30 days", value: "30d" },
    { id: "90d", label: "Last 90 days", value: "90d" },
    { id: "1y", label: "Last year", value: "1y" },
  ],
  region: [
    { id: "all", label: "All Regions", value: "all" },
    { id: "north", label: "North America", value: "north" },
    { id: "europe", label: "Europe", value: "europe" },
    { id: "asia", label: "Asia Pacific", value: "asia" },
    { id: "latam", label: "Latin America", value: "latam" },
  ],
  department: [
    { id: "all", label: "All Departments", value: "all" },
    { id: "sales", label: "Sales", value: "sales" },
    { id: "marketing", label: "Marketing", value: "marketing" },
    { id: "operations", label: "Operations", value: "operations" },
    { id: "it", label: "IT", value: "it" },
  ],
  category: [
    { id: "all", label: "All Categories", value: "all" },
    { id: "product-a", label: "Product A", value: "product-a" },
    { id: "product-b", label: "Product B", value: "product-b" },
    { id: "product-c", label: "Product C", value: "product-c" },
    { id: "services", label: "Services", value: "services" },
  ],
}

export function EnhancedDashboardFilters() {
  const { filters, setFilter, clearFilter, clearAllFilters } = useFilters()
  const [showFilters, setShowFilters] = useState(false)

  const activeFilterCount = Object.keys(filters).filter((key) => filters[key]).length

  return (
    <div className="space-y-4">
      {/* Filter Toggle and Quick Actions */}
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
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Quick Time Range */}
        <Select onValueChange={(value) => setFilter("timeRange", value)} value={filters.timeRange || ""}>
          <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.timeRange.map((range) => (
              <SelectItem key={range.id} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <Badge key={key} variant="secondary" className="flex items-center gap-1">
                  {key}: {value}
                  <Button variant="ghost" size="sm" className="h-auto p-0 ml-1" onClick={() => clearFilter(key)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ),
          )}
        </div>
      )}

      {/* Expanded Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select onValueChange={(value) => setFilter("timeRange", value)} value={filters.timeRange || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.timeRange.map((range) => (
                      <SelectItem key={range.id} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select onValueChange={(value) => setFilter("region", value)} value={filters.region || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.region.map((region) => (
                      <SelectItem key={region.id} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select onValueChange={(value) => setFilter("department", value)} value={filters.department || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.department.map((dept) => (
                      <SelectItem key={dept.id} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select onValueChange={(value) => setFilter("category", value)} value={filters.category || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.category.map((cat) => (
                      <SelectItem key={cat.id} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
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
