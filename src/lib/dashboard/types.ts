export type KpiItem = {
  title: string
  value: number | string
  format?: "number" | "currency" | "percent"
  delta?: number // negative => red, non-negative => green
  note?: string
  icon?: "dollar" | "users" | "margin" | "nps" | "generic"
}

export type KpiBlock = {
  kind: "kpi"
  items: KpiItem[]
}

export type ChartBlock = {
  kind: "chart"
  title: string
  description?: string
  type: "line" | "bar" | "pie" | "scatter"
  data: any[]
  xKey?: string
  yKeys?: string[]       // for line/bar/scatter
  valueKey?: string      // for pie
  colorKeys?: string[]   // CSS vars like --chart-1, --chart-2
  height?: number
}

export type DashboardConfig = {
  slug: string
  title: string
  description?: string
  blocks: Array<KpiBlock | ChartBlock>
}

export type DashboardRegistry = Record<string, DashboardConfig>
