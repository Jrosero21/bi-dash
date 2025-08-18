"use client"

import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { KPICard } from "../../../components/kpi-card"
import { ChartContainer } from "../../../components/chart-container"
import { EnhancedDashboardFilters } from "../../../components/enhanced-dashboard-filters"

// NOTE: this is now pointing to the components subfolder:
import TopVendorsTable, { type Vendor } from "../vendor-relations/_components/TopVendorsTable"

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter,
} from "recharts"
import { Handshake, TrendingUp, Clock, Award, AlertTriangle, DollarSign, Users, Target } from "lucide-react"

// ---------- helpers ----------
const currency  = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
const currencyM = (n: number) => `$${(n / 1_000_000).toFixed(1)}M`
const percent   = (n: number) => `${n.toFixed(1)}%`

// canonicalize legacy region values
const REGION_MAP: Record<string, "all"|"na"|"emea"|"apac"|"latam"> = {
  all: "all",
  na: "na",
  "north": "na",
  "north america": "na",
  emea: "emea",
  eu: "emea",
  europe: "emea",
  apac: "apac",
  asia: "apac",
  latam: "latam",
  "south america": "latam",
}

// multipliers to simulate real filtering without a backend
const REGION_MULT = {
  na:    1.00,
  emea:  0.85,
  apac:  0.90,
  latam: 0.65,
  all:   1.00,
} as const

// months in the demo (6 months total)
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun"] as const
function sliceByRange(range: string) {
  switch (range) {
    case "7D":  return MONTHS.slice(-2) // ~2 months view
    case "30D": return MONTHS.slice(-3)
    case "90D": return MONTHS.slice(-6)
    case "QTD": return MONTHS.slice(-3)
    case "YTD": return MONTHS
    default:    return MONTHS.slice(-3)
  }
}

// ---------- base (fake but consistent) data ----------
const BASE_VENDOR_PERF = [
  { month: "Jan", onTime: 87.5, quality: 92.1, satisfaction: 88.5 },
  { month: "Feb", onTime: 89.2, quality: 93.8, satisfaction: 90.2 },
  { month: "Mar", onTime: 91.8, quality: 94.5, satisfaction: 91.8 },
  { month: "Apr", onTime: 88.9, quality: 91.2, satisfaction: 87.9 },
  { month: "May", onTime: 93.1, quality: 95.7, satisfaction: 93.5 },
  { month: "Jun", onTime: 94.7, quality: 96.2, satisfaction: 94.8 },
] as const

const BASE_TOP_VENDORS: (Vendor & { region: "na" | "emea" | "apac" | "latam" })[] = [
  { name: "TechCorp Solutions", spend: 2_400_000, performance: 94.5, risk: "Low",    region: "na"   },
  { name: "Global Logistics",   spend: 1_800_000, performance: 91.2, risk: "Medium", region: "emea" },
  { name: "Premium Materials",  spend: 1_500_000, performance: 96.8, risk: "Low",    region: "apac" },
  { name: "Swift Services",     spend: 1_200_000, performance: 88.7, risk: "Medium", region: "na"   },
  { name: "Quality Components", spend:   950_000, performance: 92.3, risk: "Low",    region: "latam"},
]

const BASE_SPEND_BY_CATEGORY = [
  { category: "Technology", amount: 3_200_000, vendors: 12, color: "hsl(var(--chart-1))" },
  { category: "Logistics",  amount: 2_800_000, vendors: 8,  color: "hsl(var(--chart-2))" },
  { category: "Materials",  amount: 2_100_000, vendors: 15, color: "hsl(var(--chart-3))" },
  { category: "Services",   amount: 1_600_000, vendors: 22, color: "hsl(var(--chart-4))" },
  { category: "Equipment",  amount: 1_200_000, vendors: 6,  color: "hsl(var(--chart-5))" },
]

const BASE_CONTRACT_METRICS = [
  { status: "Active",         count: 145, value: 12_500_000 },
  { status: "Expiring Soon",  count: 23,  value: 2_100_000  },
  { status: "Under Review",   count: 18,  value: 1_800_000  },
  { status: "Pending Renewal",count: 12,  value:   950_000  },
]

const BASE_RISK = [
  { vendor: "TechCorp",  region: "na",    financial: 95, operational: 92, compliance: 98, overall: 95 },
  { vendor: "GlobalLog", region: "emea",  financial: 88, operational: 85, compliance: 90, overall: 88 },
  { vendor: "Premium",   region: "apac",  financial: 96, operational: 98, compliance: 94, overall: 96 },
  { vendor: "Swift",     region: "na",    financial: 82, operational: 78, compliance: 85, overall: 82 },
  { vendor: "Quality",   region: "latam", financial: 91, operational: 89, compliance: 93, overall: 91 },
]

// ---------- component ----------
export default function VendorRelationsDashboard() {
  const sp = useSearchParams()

  // range + region from URL (normalized)
  const rangeRaw  = (sp.get("range") ?? "30D").toUpperCase()
  const range     = (["7D","30D","90D","QTD","YTD"].includes(rangeRaw) ? rangeRaw : "30D")
  const regionRaw = (sp.get("region") ?? "all").toLowerCase()
  const region    = REGION_MAP[regionRaw] ?? "all"

  // time window + scalar to scale totals (our base has 6 months)
  const monthsAllowed = sliceByRange(range)
  const timeframeScalar = monthsAllowed.length / 6

  // region scalar
  const rMult = REGION_MULT[region]

  // 1) Performance by month (adjusted by region; sliced by range)
  const vendorPerformance = useMemo(() => {
    const tweak = region === "na" ? 0.5 : region === "emea" ? -0.3 : region === "apac" ? 0.2 : region === "latam" ? -0.8 : 0
    return BASE_VENDOR_PERF
      .map(d => ({
        month: d.month,
        onTime: Math.max(0, Math.min(100, d.onTime + tweak)),
        quality: Math.max(0, Math.min(100, d.quality + tweak)),
        satisfaction: Math.max(0, Math.min(100, d.satisfaction + tweak)),
      }))
      .filter(d => monthsAllowed.includes(d.month as typeof MONTHS[number]))
  }, [region, monthsAllowed])

  // 2) Vendors + risk (filtered by region)
  const topVendors = useMemo(() => {
    if (region === "all") return BASE_TOP_VENDORS
    return BASE_TOP_VENDORS.filter(v => v.region === region)
  }, [region])

  const riskAssessment = useMemo(() => {
    if (region === "all") return BASE_RISK
    return BASE_RISK.filter(r => r.region === region)
  }, [region])

  // 3) Spend by category + contracts (scaled by region + timeframe)
  const spendByCategory = useMemo(() => {
    return BASE_SPEND_BY_CATEGORY.map(s => ({
      ...s,
      amount: Math.round(s.amount * rMult * timeframeScalar),
      vendors: Math.max(1, Math.round(s.vendors * (region === "all" ? 1 : rMult))),
    }))
  }, [rMult, timeframeScalar, region])

  const contractMetrics = useMemo(() => {
    return BASE_CONTRACT_METRICS.map(c => ({
      ...c,
      count: Math.max(1, Math.round(c.count * (region === "all" ? 1 : rMult))),
      value: Math.round(c.value * rMult * timeframeScalar),
    }))
  }, [rMult, timeframeScalar, region])

  // 4) KPIs derived from filtered data
  const kpiVendorPerf = useMemo(() => {
    if (!vendorPerformance.length) return 0
    const avg = vendorPerformance.reduce((acc, d) => acc + d.quality, 0) / vendorPerformance.length
    return Number(avg.toFixed(1))
  }, [vendorPerformance])

  const kpiOnTime = useMemo(() => {
    if (!vendorPerformance.length) return 0
    const avg = vendorPerformance.reduce((acc, d) => acc + d.onTime, 0) / vendorPerformance.length
    return Number(avg.toFixed(1))
  }, [vendorPerformance])

  const kpiTotalSpend = useMemo(() => {
    return spendByCategory.reduce((acc, s) => acc + s.amount, 0)
  }, [spendByCategory])

  const kpiActiveVendors = useMemo(() => {
    return spendByCategory.reduce((acc, s) => acc + (s.vendors ?? 0), 0)
  }, [spendByCategory])

  return (
    <div className="space-y-6" aria-label="Vendor Relations Dashboard">
      {/* Filters row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <EnhancedDashboardFilters />
      </div>

      {/* KPIs (now dynamic) */}
      <section aria-label="Key Vendor Metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Vendor Performance"
          value={kpiVendorPerf}
          format="percentage"
          change={region === "all" ? 0 : (rMult - 1) * 100}
          changeLabel="vs all regions"
          trend={rMult >= 1 ? "up" : "down"}
          icon={<Award className="h-4 w-4" aria-hidden="true" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Total Spend"
          value={kpiTotalSpend}
          format="currency"
          change={Number(((timeframeScalar - 1) * 100).toFixed(1))}
          changeLabel="vs 6-month base"
          trend={timeframeScalar >= 1 ? "up" : "down"}
          icon={<DollarSign className="h-4 w-4" aria-hidden="true" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="On-Time Delivery"
          value={kpiOnTime}
          format="percentage"
          change={Number(((kpiOnTime - 90)).toFixed(1))}
          changeLabel="vs target 90%"
          trend={kpiOnTime >= 90 ? "up" : "down"}
          icon={<Clock className="h-4 w-4" aria-hidden="true" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Active Vendors"
          value={kpiActiveVendors}
          change={region === "all" ? 0 : Math.round((rMult - 1) * 100)}
          changeLabel="vs all regions"
          trend={rMult >= 1 ? "up" : "down"}
          icon={<Users className="h-4 w-4" aria-hidden="true" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </section>

      {/* Performance & Top Vendors */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Performance & Top Vendors">
        <ChartContainer title="Vendor Performance Trends" description="Monthly performance metrics">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => percent(v)} domain={[0, 100]} />
              <Tooltip formatter={(v: number, name: string) => [percent(v), name]} labelFormatter={(label) => `Month: ${label}`} />
              <Legend />
              <Line type="monotone" dataKey="onTime" stroke="hsl(var(--chart-1))" strokeWidth={2} name="On-Time %" />
              <Line type="monotone" dataKey="quality" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Quality %" />
              <Line type="monotone" dataKey="satisfaction" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Satisfaction %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Top Vendors by Spend" description="Performance vs spending analysis">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="spend" type="number" name="Annual Spend" tickFormatter={currencyM} domain={["auto", "auto"]} />
              <YAxis dataKey="performance" type="number" name="Performance" unit="%" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value: number, name: string) => name === "spend" ? [currencyM(value), "Annual Spend"] : [`${value}%`, "Performance"]} labelFormatter={() => `Vendor`} />
              <Legend />
              <Scatter name="Vendors" data={topVendors}>
                {topVendors.map((v) => (
                  <Cell key={v.name} fill={
                    v.region === "na" ? "hsl(var(--chart-1))" :
                    v.region === "emea" ? "hsl(var(--chart-2))" :
                    v.region === "apac" ? "hsl(var(--chart-3))" : "hsl(var(--chart-4))"
                  } />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </section>

      {/* Spend & Contracts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Spend & Contracts">
        <ChartContainer title="Spend by Category" description="Vendor spending breakdown by category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendByCategory}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                label={({ category, amount }) => `${category}: ${currencyM(amount)}`}
                labelLine={false}
              >
                {spendByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [currencyM(value), "Spend"]} labelFormatter={(label) => `Category: ${label}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Contract Status Overview" description="Current contract portfolio status">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contractMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => currencyM(Number(v))} />
              <Tooltip formatter={(v: number, name: string) => name === "value" ? [currency(v), "Contract Value"] : [v, "Contract Count"]} />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Contract Count">
                {contractMetrics.map((_, i) => (<Cell key={`count-${i}`} fill={`hsl(var(--chart-${(i % 4) + 1}))`} />))}
              </Bar>
              <Bar yAxisId="right" dataKey="value" name="Contract Value">
                {contractMetrics.map((_, i) => (<Cell key={`value-${i}`} fill={`hsl(var(--chart-${(i % 4) + 1}))`} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </section>

      {/* Risk */}
      <ChartContainer title="Vendor Risk Assessment" description="Risk scores across key dimensions">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskAssessment}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vendor" />
            <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
            <Tooltip formatter={(v: number) => [`${v}%`, "Risk Score"]} />
            <Legend />
            <Bar dataKey="financial"   fill="hsl(var(--chart-1))" name="Financial" />
            <Bar dataKey="operational" fill="hsl(var(--chart-2))" name="Operational" />
            <Bar dataKey="compliance"  fill="hsl(var(--chart-3))" name="Compliance" />
            <Bar dataKey="overall"     fill="hsl(var(--chart-4))" name="Overall" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Table */}
      <TopVendorsTable data={topVendors} />

      {/* Extra KPIs */}
      <section aria-label="Additional Vendor KPIs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Cost Savings" value={1_250_000 * rMult * timeframeScalar} format="currency" change={18.5} changeLabel="vs last year" trend="up" icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Contract Compliance" value={96.8} format="percentage" change={2.3} changeLabel="vs last quarter" trend="up" icon={<Target className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Risk Score" value={12} change={-25.0} changeLabel="high risk vendors" trend="up" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Vendor Satisfaction" value={91.4} format="percentage" change={4.2} changeLabel="vs last survey" trend="up" icon={<Handshake className="h-4 w-4" aria-hidden="true" />} />
      </section>
    </div>
  )
}
