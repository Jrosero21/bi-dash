"use client"

import React from "react"
import DataTable from "~/components/table/DataTable"
import type { ColumnDef } from "@tanstack/react-table"

export type Vendor = {
  name: string
  spend: number
  performance: number
  risk: "Low" | "Medium" | "High"
}

const defaultData: Vendor[] = [
  { name: "TechCorp Solutions", spend: 2_400_000, performance: 94.5, risk: "Low" },
  { name: "Global Logistics",   spend: 1_800_000, performance: 91.2, risk: "Medium" },
  { name: "Premium Materials",  spend: 1_500_000, performance: 96.8, risk: "Low" },
  { name: "Swift Services",     spend: 1_200_000, performance: 88.7, risk: "Medium" },
  { name: "Quality Components", spend:   950_000, performance: 92.3, risk: "Low" },
]

function currency(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
}

type Props = { data?: Vendor[] }

const TopVendorsTable: React.FC<Props> = ({ data = defaultData }) => {
  const columns = React.useMemo<ColumnDef<Vendor, unknown>[]>(() => [
    { accessorKey: "name", header: "Vendor" },
    { accessorKey: "spend", header: "Spend", cell: ({ getValue }) => currency(getValue() as number) },
    { accessorKey: "performance", header: "Performance", cell: ({ getValue }) => `${(getValue() as number).toFixed(1)}%` },
    { accessorKey: "risk", header: "Risk" },
  ], [])

  return (
    <div className="space-y-2">
      <h3 className="text-base font-medium">Top Vendors</h3>
      <DataTable<Vendor, unknown>
        columns={columns}
        data={data}
        filename="top-vendors.csv"
        searchPlaceholder="Search vendors…"
      />
    </div>
  )
}

export default TopVendorsTable
