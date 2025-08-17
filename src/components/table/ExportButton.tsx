"use client"

export default function ExportButton({
  filename = "export.csv",
  rows,
}: {
  filename?: string
  rows: Record<string, unknown>[]
}) {
  function toCsv(items: Record<string, unknown>[]) {
    if (!items?.length) return ""
    const headers = Object.keys(items[0]!)
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v)
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const lines = [
      headers.join(","),
      ...items.map((row) => headers.map((h) => esc(row[h])).join(",")),
    ]
    return lines.join("\n")
  }

  function download() {
    const csv = toCsv(rows)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-2 rounded-xl border px-3 h-9 text-sm hover:bg-secondary"
      title="Export to CSV"
      aria-label="Export to CSV"
      type="button"
    >
      Export CSV
    </button>
  )
}
