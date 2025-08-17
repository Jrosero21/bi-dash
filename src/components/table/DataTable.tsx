"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { ColumnDef, SortingState, VisibilityState } from "@tanstack/react-table"
import ExportButton from "./ExportButton"

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchPlaceholder?: string
  filename?: string
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search…",
  filename = "table.csv",
}: DataTableProps<TData, TValue>) {
  // Guard against undefined/non-array inputs in dev/StrictMode
  const safeData = (Array.isArray(data) ? data : []) as TData[]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const table = useReactTable({
    data: safeData,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const exportRows = React.useMemo(() => {
    const visibleCols = table.getAllLeafColumns().filter((c) => c.getIsVisible())
    const model = table.getPrePaginationRowModel?.()
    const rows = model?.rows ?? []
    return rows.map((row) => {
      const obj: Record<string, unknown> = {}
      visibleCols.forEach((col) => {
        const header = String(col.columnDef.header ?? col.id)
        obj[header] = row.getValue(col.id)
      })
      return obj
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, columnVisibility, safeData])

  return (
    <div className="rounded-2xl border p-[var(--card-p,1rem)] bg-card">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-9 w-64 rounded-xl border bg-transparent px-3 text-sm outline-none"
            aria-label="Global search"
          />
          <ExportButton filename={filename} rows={exportRows} />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <details className="rounded-xl border px-3 h-9 flex items-center">
            <summary className="cursor-pointer list-none select-none">Columns</summary>
            <div className="mt-2 p-2 bg-card border rounded-xl shadow-sm min-w-48">
              <div className="space-y-1">
                {table.getAllLeafColumns().map((column) => (
                  <label key={column.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    <span>{String(column.columnDef.header ?? column.id)}</span>
                  </label>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-muted-foreground border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left py-[var(--row-py,0.5rem)] px-[var(--cell-px,0.75rem)] font-medium cursor-pointer select-none"
                    title="Sort"
                    aria-sort={
                      header.column.getIsSorted()
                        ? (header.column.getIsSorted() as "ascending" | "descending")
                        : "none"
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " ▲",
                      desc: " ▼",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-secondary/40">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-[var(--row-py,0.5rem)] px-[var(--cell-px,0.75rem)]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="py-8 text-center text-sm text-muted-foreground">
                  No matching results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-muted-foreground">
          Showing {table.getRowModel().rows.length} of {table.getPrePaginationRowModel()?.rows?.length ?? 0}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border px-3 h-8 hover:bg-secondary disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <span>
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
          </span>
          <button
            className="rounded-xl border px-3 h-8 hover:bg-secondary disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
