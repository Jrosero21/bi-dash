export type ChartKind = "line" | "bar" | "pie" | "scatter"

export type ChartBlock = {
  kind: "chart"
  title: string
  description?: string
  type: ChartKind
  data: Record<string, unknown>[]
  xKey?: string
  yKeys?: string[]
  valueKey?: string // for pie
  height?: number
  colorKeys?: string[] // CSS vars e.g. ["--chart-1", ...]
}

export type KpiIcon = "dollar" | "users" | "margin" | "nps" | "generic"

export type KpiItem = {
  title: string
  value: number
  format?: "currency" | "percentage" | "number"
  delta?: number
  icon?: KpiIcon
}

export type KpiBlock = {
  kind: "kpi"
  title?: string
  items: KpiItem[]
}

export type Block = ChartBlock | KpiBlock

export type DashboardConfig = {
  title: string
  description?: string
  blocks: Block[]
}
