"use client"

import * as React from "react"
import { Download } from "lucide-react"

type Props = {
  rows: Record<string, unknown>[]
  filename?: string
  className?: string
}

export default function ExportButton({ rows, filename = "export.csv", className }: Props) {
  function download() {
    const csv = toCsv(rows)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={download}
      className={`inline-flex items-center gap-2 rounded-xl border bg-card/70 px-3 py-2 text-xs
                  hover:bg-secondary supports-[backdrop-filter]:backdrop-blur ${className ?? ""}`}
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  )
}

/* simple CSV serializer */
function toCsv(rows: Record<string, unknown>[]) {
  if (!rows?.length) return ""
  const headers = Object.keys(rows[0]!)
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = r[h]
          const s = v == null ? "" : String(v)
          const needsQuote = /[,"\n]/.test(s)
          return needsQuote ? `"${s.replace(/"/g, '""')}"` : s
        })
        .join(","),
    ),
  ]
  return lines.join("\n")
}
