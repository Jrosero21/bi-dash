import type { DashboardRegistry } from "~/lib/dashboard/types"

// sample data
const vendorPerformance = [
  { month: "Jan", onTime: 87.5, quality: 92.1, satisfaction: 88.5 },
  { month: "Feb", onTime: 89.2, quality: 93.8, satisfaction: 90.2 },
  { month: "Mar", onTime: 91.8, quality: 94.5, satisfaction: 91.8 },
  { month: "Apr", onTime: 88.9, quality: 91.2, satisfaction: 87.9 },
  { month: "May", onTime: 93.1, quality: 95.7, satisfaction: 93.5 },
  { month: "Jun", onTime: 94.7, quality: 96.2, satisfaction: 94.8 },
]

const spendByCategory = [
  { category: "Technology", amount: 3_200_000 },
  { category: "Logistics", amount: 2_800_000 },
  { category: "Materials", amount: 2_100_000 },
  { category: "Services", amount: 1_600_000 },
  { category: "Equipment", amount: 1_200_000 },
]

export const dashboards: DashboardRegistry = {
  executive: {
    slug: "executive",
    title: "Executive",
    description: "Company-wide KPIs & trends",
    blocks: [
      {
        kind: "kpi",
        items: [
          { title: "Revenue YTD", value: 12_450_000, format: "currency", delta: 8.4, note: "vs last YTD", icon: "dollar" },
          { title: "Active Customers", value: 5_870, format: "number", delta: -4.1, note: "last 30 days", icon: "users" },
          { title: "Gross Margin", value: 61.8, format: "percent", delta: 1.2, note: "vs last quarter", icon: "margin" },
          { title: "NPS", value: 47, format: "number", delta: 0, note: "new survey", icon: "nps" },
        ],
      },
      {
        kind: "chart",
        title: "Margin & Satisfaction",
        description: "Demo from vendor performance data",
        type: "line",
        data: vendorPerformance,
        xKey: "month",
        yKeys: ["quality", "satisfaction"],
        colorKeys: ["--chart-1", "--chart-4"],
        height: 280,
      },
    ],
  },

  "vendor-relations": {
    slug: "vendor-relations",
    title: "Vendor Relations",
    description: "Supplier performance & spend",
    blocks: [
      {
        kind: "kpi",
        items: [
          { title: "Vendor Performance", value: 94.7, format: "percent", delta: 7.2, note: "vs last quarter", icon: "margin" },
          { title: "Total Spend", value: 10_900_000, format: "currency", delta: -5.8, note: "vs last quarter", icon: "dollar" },
          { title: "On-Time Delivery", value: 94.7, format: "percent", delta: 7.2, note: "vs last quarter", icon: "generic" },
          { title: "Active Vendors", value: 63, format: "number", delta: -8.7, note: "vs last quarter", icon: "users" },
        ],
      },
      {
        kind: "chart",
        title: "Vendor Performance Trends",
        description: "Monthly performance metrics",
        type: "line",
        data: vendorPerformance,
        xKey: "month",
        yKeys: ["onTime", "quality", "satisfaction"],
        colorKeys: ["--chart-2", "--chart-1", "--chart-4"],
        height: 300,
      },
      {
        kind: "chart",
        title: "Spend by Category",
        description: "Vendor spend breakdown",
        type: "pie",
        data: spendByCategory,
        xKey: "category",
        valueKey: "amount",
        colorKeys: ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"],
        height: 320,
      },
    ],
  },
}

export const dashboardSlugs = Object.keys(dashboards)
