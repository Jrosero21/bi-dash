"use client"

import { useEffect, useState } from "react"

const KEY = "bi_density_v1" as const
type Density = "comfortable" | "compact"

function applyDensity(next: Density) {
  document.documentElement.dataset.density = next
}

export default function DensityToggle() {
  const [density, setDensity] = useState<Density>("comfortable")

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as Density | null) ?? "comfortable"
    setDensity(saved)
    applyDensity(saved)
  }, [])

  function toggle() {
    const next: Density = density === "compact" ? "comfortable" : "compact"
    setDensity(next)
    localStorage.setItem(KEY, next)
    applyDensity(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm hover:bg-secondary"
      aria-label="Toggle density"
      title={`Switch to ${density === "compact" ? "comfortable" : "compact"} density`}
    >
      {density === "compact" ? "Comfortable" : "Compact"}
    </button>
  )
}
