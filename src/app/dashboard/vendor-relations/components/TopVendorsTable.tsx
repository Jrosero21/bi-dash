"use client"

import * as React from "react"
import DataTable from "~/components/table/DataTable"
import type { ColumnDef } from "@tanstack/react-table"

export type Vendor = {
  name: string
  spend: number
  performance: number
  risk: "Low" | "Medium" | "High"
  region?: "na" | "emea" | "apac" | "latam"
}

const currency = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)

export default function TopVendorsTable({ data = [] }: { data?: Vendor[] }) {
  const columns = React.useMemo<ColumnDef<Vendor, unknown>[]>(() => {
    return [
      {
        accessorKey: "name",
        header: "Vendor",
      },
      {
        accessorKey: "region",
        header: "Region",
        cell: ({ getValue }) => {
          const v = (getValue() as Vendor["region"]) ?? ""
          return String(v).toUpperCase()
        },
      },
      {
        accessorKey: "spend",
        header: "Spend",
        cell: ({ getValue }) => currency(getValue() as number),
      },
      {
        accessorKey: "performance",
        header: "Performance",
        cell: ({ getValue }) => `${(getValue() as number).toFixed(1)}%`,
      },
      {
        accessorKey: "risk",
        header: "Risk",
      },
    ]
  }, [])

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Top Vendors</h3>
      <DataTable<Vendor, unknown>
        columns={columns}
        data={Array.isArray(data) ? data : []}
        filename="top-vendors.csv"
        searchPlaceholder="Search vendors…"
      />
    </div>
  )
}
