import type { DashboardConfig } from "./types"

// Simple demo data (you can replace with API data later)
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenueSeries = months.map((m, i) => {
  const revenue = 1800000 + i * 140000
  const profit = Math.round(revenue * 0.24)
  const expenses = revenue - profit
  return { month: m, revenue, profit, expenses }
})

export const dashboards: Record<string, DashboardConfig> = {
  sample: {
    title: "Sample Analytics",
    description: "Minimal dashboard driven by the registry.",
    blocks: [
      {
        kind: "kpi",
        items: [
          { title: "Revenue YTD", value: 12450000, format: "currency", delta: 2.8, icon: "dollar" },
          { title: "Active Customers", value: 5870, delta: 1.5, icon: "users" },
          { title: "Gross Margin", value: 61.8, format: "percentage", delta: -1.2, icon: "margin" },
          { title: "NPS", value: 47, delta: 5, icon: "nps" },
        ],
      },
      {
        kind: "chart",
        title: "Revenue & Profit (6m)",
        description: "Synthetic series to show registry rendering.",
        type: "line",
        data: revenueSeries,
        xKey: "month",
        yKeys: ["revenue", "profit"],
        height: 300,
        colorKeys: ["--chart-1", "--chart-2"],
      },
      {
        kind: "chart",
        title: "Revenue Mix",
        description: "Pie driven by line series totals.",
        type: "pie",
        data: [
          { name: "Revenue", value: revenueSeries.reduce((s, r) => s + (r.revenue as number), 0) },
          { name: "Profit", value: revenueSeries.reduce((s, r) => s + (r.profit as number), 0) },
          { name: "Expenses", value: revenueSeries.reduce((s, r) => s + (r.expenses as number), 0) },
        ],
        valueKey: "value",
        height: 280,
        colorKeys: ["--chart-1", "--chart-2", "--chart-3"],
      },
    ],
  },
}

export const dashboardSlugs = Object.keys(dashboards)
