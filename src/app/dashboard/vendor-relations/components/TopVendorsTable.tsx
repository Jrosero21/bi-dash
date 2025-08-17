// src/app/dashboard/vendor-relations/TopVendorsTable.tsx
"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import DataTable from "~/components/table/DataTable"

export type RiskLevel = "Low" | "Medium" | "High"

export type Vendor = {
  name: string
  spend: number            // annual spend in USD
  performance: number      // 0–100
  risk: RiskLevel
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function formatPercent(n: number) {
  return `${n.toFixed(1)}%`
}

const columns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "name",
    header: "Vendor",
    cell: ({ getValue }) => <span className="font-medium">{String(getValue() ?? "")}</span>,
  },
  {
    accessorKey: "spend",
    header: "Annual Spend",
    cell: ({ getValue }) => <span>{formatCurrency(Number(getValue() ?? 0))}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ getValue }) => <span>{formatPercent(Number(getValue() ?? 0))}</span>,
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ getValue }) => {
      const r = String(getValue() ?? "") as RiskLevel
      const badge =
        r === "Low"
          ? "bg-[hsl(var(--chart-2))/0.12] text-[hsl(var(--chart-2))]"
          : r === "Medium"
          ? "bg-[hsl(var(--chart-4))/0.14] text-[hsl(var(--chart-4))]"
          : "bg-[hsl(var(--chart-5))/0.14] text-[hsl(var(--chart-5))]"
      return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${badge}`}>
          {r}
        </span>
      )
    },
  },
]

export default function TopVendorsTable({ data }: { data: Vendor[] }) {
  const rows = Array.isArray(data) ? data : []

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Top Vendors</h3>

      {/* NOTE: DataTable has a single generic now */}
      <DataTable<Vendor>
        columns={columns}
        data={rows}
        filename="top-vendors.csv"
        searchPlaceholder="Search vendors…"
      />
    </div>
  )
}
