"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import ExportButton from "./ExportButton"

export type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  searchPlaceholder?: string
  filename?: string
}

export default function DataTable<TData>({
  columns,
  data,
  searchPlaceholder = "Search…",
  filename = "table.csv",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, globalFilter },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // rows for CSV (visible columns only)
  const exportRows = React.useMemo(() => {
    const visibleCols = table.getAllLeafColumns().filter((c) => c.getIsVisible())
    return table.getPrePaginationRowModel().rows.map((row) => {
      const obj: Record<string, unknown> = {}
      visibleCols.forEach((col) => {
        const header = String(col.columnDef.header ?? col.id)
        obj[header] = row.getValue(col.id)
      })
      return obj
    })
  }, [table, columnVisibility, sorting, globalFilter, data])

  return (
    <div className="space-y-3">
      {/* toolbar */}
      <div className="flex items-center gap-2">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full max-w-xs rounded-xl border bg-card/70 px-3 py-2 text-sm
                     supports-[backdrop-filter]:backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="ml-auto flex items-center gap-2">
          <ColumnVisibility table={table} />
          <ExportButton rows={exportRows} filename={filename} />
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto rounded-2xl border bg-card/70 supports-[backdrop-filter]:backdrop-blur ring-1 ring-inset ring-[hsl(var(--ring)/0.06)]">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-[var(--cell-px)] py-2 text-left font-medium"
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        className="inline-flex items-center gap-1 hover:underline"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {({ asc: "↑", desc: "↓" } as any)[header.column.getIsSorted() as string] ?? null}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-card/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-[var(--cell-px)] py-[var(--row-py)]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-xl border bg-card/70 px-3 py-1.5 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-xl border bg-card/70 px-3 py-1.5 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

/* column visibility dropdown (simple) */
function ColumnVisibility({ table }: { table: ReturnType<typeof useReactTable<any>> }) {
  const all = table.getAllLeafColumns()
  return (
    <details className="rounded-xl border bg-card/70 px-3 py-2 text-xs supports-[backdrop-filter]:backdrop-blur">
      <summary className="cursor-pointer select-none">Columns</summary>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {all.map((col) => (
          <label key={col.id} className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={col.getIsVisible()}
              onChange={col.getToggleVisibilityHandler()}
            />
            <span className="truncate">{String(col.columnDef.header ?? col.id)}</span>
          </label>
        ))}
      </div>
    </details>
  )
}
