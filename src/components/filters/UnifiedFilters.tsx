"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useSetQuery } from "~/lib/query-state"

const RANGES = ["7d", "30d", "90d", "QTD", "YTD"] as const
const REGIONS = [
  { value: "all", label: "All regions" },
  { value: "na",  label: "North America" },
  { value: "emea",label: "EMEA" },
  { value: "apac",label: "APAC" },
]

export default function UnifiedFilters() {
  const sp = useSearchParams()
  const setQuery = useSetQuery()

  const range = (sp.get("range") ?? "30d").toUpperCase()
  const region = sp.get("region") ?? "all"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        {RANGES.map((r) => {
          const active = range === r
          return (
            <button
              key={r}
              type="button"
              onClick={() => setQuery({ range: r.toUpperCase() })}
              className={["h-9 rounded-xl border px-3 text-sm", active ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary"].join(" ")}
              aria-pressed={active}
            >
              {r}
            </button>
          )
        })}
      </div>

      <label className="ml-1 text-sm text-muted-foreground" htmlFor="region-sel">
        Region
      </label>
      <select
        id="region-sel"
        value={region}
        onChange={(e) => setQuery({ region: e.target.value })}
        className="h-9 rounded-xl border bg-transparent px-3 text-sm"
      >
        {REGIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>

      <button type="button" onClick={() => setQuery({ range: null, region: null })} className="ml-1 h-9 rounded-xl border px-3 text-sm hover:bg-secondary">
        Reset
      </button>
    </div>
  )
}
