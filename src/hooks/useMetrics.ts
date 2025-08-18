"use client"

import * as React from "react"

type RevenuePoint = { month: string; revenue: number; profit: number; expenses: number }
type Vendor = { name: string; spend: number; performance: number; risk: "Low" | "Medium" | "High" }
type MetricsResponse = {
  kpis: {
    revenueYTD: number
    activeCustomers: number
    grossMargin: number
    nps: number
    delta: {
      revenueYTD: number
      activeCustomers: number
      grossMargin: number
      nps: number
    }
  }
  series: { revenue: RevenuePoint[] }
  vendors: Vendor[]
  generatedAt: string
}

export function useMetrics() {
  const [data, setData] = React.useState<MetricsResponse | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/metrics", { cache: "no-store" })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const json = (await res.json()) as MetricsResponse
      setData(json)
    } catch (e) {
      setError(e as Error)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void load()
  }, [load])

  return { data, loading, error, refresh: load }
}
