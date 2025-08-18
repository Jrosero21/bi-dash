"use client"

import * as React from "react"
import { getJSON } from "~/lib/api"
import { MetricsResponse, type TMetricsResponse } from "../lib/schema"

export function useMetrics() {
  const [data, setData] = React.useState<TMetricsResponse | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getJSON("/api/metrics", MetricsResponse)
      setData(res)
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
