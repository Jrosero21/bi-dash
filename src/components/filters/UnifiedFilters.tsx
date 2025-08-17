"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { useSetQuery } from "~/lib/query-state"

const RANGES = ["7d", "30d", "90d", "QTD", "YTD"] as const
const REGIONS = [
  { value: "all",   label: "All regions" },
  { value: "na",    label: "North America" },
  { value: "emea",  label: "EMEA" },
  { value: "apac",  label: "APAC" },
  { value: "latam", label: "LATAM" },
]

// map legacy/synonym values from older filters to our canonical keys
const REGION_MAP: Record<string, "all"|"na"|"emea"|"apac"|"latam"> = {
  all: "all",
  na: "na",
  "north": "na",
  "north america": "na",
  emea: "emea",
  eu: "emea",
  europe: "emea",
  apac: "apac",
  asia: "apac",
  latam: "latam",
  "south america": "latam",
}

export default function UnifiedFilters() {
  const sp = useSearchParams()
  const setQuery = useSetQuery()

  const rawRange = (sp.get("range") ?? "30d").toUpperCase()
  const range = (["7D","30D","90D","QTD","YTD"].includes(rawRange) ? rawRange : "30D") as string

  const rawRegion = (sp.get("region") ?? "all").toLowerCase()
  const region = REGION_MAP[rawRegion] ?? "all"

  function onSetRange(v: string) {
    setQuery({ range: v.toUpperCase() })
  }
  function onSetRegion(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuery({ region: e.target.value })
  }
  function onReset() {
    setQuery({ range: null, region: null })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Range chips */}
      <div className="flex items-center gap-1">
        {RANGES.map((r) => {
          const active = range === r.toUpperCase()
          return (
            <button
              key={r}
              type="button"
              onClick={() => onSetRange(r)}
              className={["h-9 rounded-xl border px-3 text-sm", active ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary"].join(" ")}
              aria-pressed={active}
            >
              {r}
            </button>
          )
        })}
      </div>

      {/* Region select */}
      <label className="ml-1 text-sm text-muted-foreground" htmlFor="region-sel">Region</label>
      <select
        id="region-sel"
        value={region}
        onChange={onSetRegion}
        className="h-9 rounded-xl border bg-transparent px-3 text-sm"
      >
        {REGIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      <button type="button" onClick={onReset} className="ml-1 h-9 rounded-xl border px-3 text-sm hover:bg-secondary">
        Reset
      </button>
    </div>
  )
}
