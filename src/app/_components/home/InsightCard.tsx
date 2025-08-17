"use client"

import * as React from "react"
import { Sparkles, RotateCw, Clipboard } from "lucide-react"

export default function InsightCard() {
  const [loading, setLoading] = React.useState(true)
  const [text, setText] = React.useState<string>("")

  async function fetchInsight() {
    setLoading(true)
    try {
      const res = await fetch("/api/insights")
      const data = await res.json()
      setText(data.text ?? "No insight generated.")
    } catch {
      setText("Insight service unavailable.")
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchInsight()
  }, [])

  function copy() {
    if (text) navigator.clipboard?.writeText(text)
  }

  return (
    <section
      aria-label="AI Snapshot"
      className="mt-6 rounded-2xl border bg-gradient-to-br from-[hsl(var(--chart-5))/8] to-transparent p-5 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full blur-3xl bg-[radial-gradient(circle, hsl(var(--chart-5))/18, transparent_60%)]" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-xl border border-[hsl(var(--chart-5))/30] bg-card/70 p-2">
            <Sparkles className="h-5 w-5 text-[hsl(var(--chart-5))]" aria-hidden="true" />
          </span>
          <h2 className="text-base font-medium">AI Snapshot</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInsight}
            className="h-8 rounded-xl border px-3 text-xs hover:bg-secondary inline-flex items-center gap-1"
            aria-label="Regenerate insight"
          >
            <RotateCw className="h-3.5 w-3.5" />
            Regenerate
          </button>
          <button
            onClick={copy}
            className="h-8 rounded-xl border px-3 text-xs hover:bg-secondary inline-flex items-center gap-1"
            aria-label="Copy insight"
          >
            <Clipboard className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-muted-foreground">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-4 w-3/4 rounded bg-muted/70" />
            <div className="mt-2 h-4 w-1/2 rounded bg-muted/60" />
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </section>
  )
}
