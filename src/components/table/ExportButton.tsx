"use client"

import * as React from "react"

export default function ExportButton({
  rows,
  filename = "table.csv",
}: {
  rows: Record<string, unknown>[]
  filename?: string
}) {
  const onExport = React.useCallback(() => {
    if (!rows?.length) return

    // Build header from union of keys
    const headers = Array.from(
      rows.reduce((set, r) => {
        Object.keys(r).forEach((k) => set.add(k))
        return set
      }, new Set<string>())
    )

    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v)
      // escape quotes and wrap if needed
      const needsQuotes = /[",\n]/.test(s)
      const escaped = s.replaceAll('"', '""')
      return needsQuotes ? `"${escaped}"` : escaped
    }

    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => esc((r as any)[h])).join(",")),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [rows, filename])

  return (
    <button
      onClick={onExport}
      className="rounded-xl border bg-card/70 px-3 py-2 text-xs hover:bg-card/90"
      disabled={!rows?.length}
      title={rows?.length ? "Export CSV" : "No rows to export"}
      aria-label="Export CSV"
    >
      Export CSV
    </button>
  )
}
