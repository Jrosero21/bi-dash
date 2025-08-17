"use client"

import type React from "react"
import { DashboardLayout } from "~/components/dashboard-layout"
import { FilterProvider } from "~/components/filter-context"

const departmentConfig = {
  executive: {
    title: "Executive Dashboard",
    description: "High-level strategic metrics and company overview",
  },
  sales: {
    title: "Sales Dashboard",
    description: "Revenue, cash collected, and sales performance",
  },
  accounting: {
    title: "Accounting Dashboard",
    description: "Financial metrics, budget vs revenue, profit margins",
  },
  it: {
    title: "IT Dashboard",
    description: "Technology infrastructure and system performance",
  },
  operations: {
    title: "Operations Dashboard",
    description: "Operational efficiency and process metrics",
  },
  business: {
    title: "Business Dashboard",
    description: "General business metrics and performance indicators",
  },
  intelligence: {
    title: "Business Intelligence Dashboard",
    description: "Advanced analytics and business intelligence",
  },
  "vendor-relations": {
    title: "Vendor Relations Dashboard",
    description: "Supplier performance and vendor management",
  },
}

export default function DashboardLayoutWrapper({
  children,
  params,
}: {
  children: React.ReactNode
  params: { department: string }
}) {
  const config = departmentConfig[params.department as keyof typeof departmentConfig] || {
    title: "Dashboard",
    description: "Department metrics and KPIs",
  }

  return (
    <FilterProvider>
      <DashboardLayout title={config.title} description={config.description} department={params.department}>
        {children}
      </DashboardLayout>
    </FilterProvider>
  )
}
