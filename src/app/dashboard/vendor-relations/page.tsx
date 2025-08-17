"use client"

import { useMemo } from "react"
import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import UnifiedFilters from "~/components/filters/UnifiedFilters"
import TopVendorsTable, { type Vendor } from "./components/TopVendorsTable"

import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter,
} from "recharts"

import { Handshake, TrendingUp, Clock, Award, AlertTriangle, DollarSign, Users, Target } from "lucide-react"

function formatCurrency(n: number) { return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n) }
function formatCurrencyMillions(n: number) { return `$${(n / 1_000_000).toFixed(1)}M` }
function formatPercent(n: number) { return `${n.toFixed(1)}%` }

export default function VendorRelationsDashboard() {
  const vendorPerformance = useMemo(() => [
    { month: "Jan", onTime: 87.5, quality: 92.1, cost: 2.1, satisfaction: 88.5 },
    { month: "Feb", onTime: 89.2, quality: 93.8, cost: 2.0, satisfaction: 90.2 },
    { month: "Mar", onTime: 91.8, quality: 94.5, cost: 1.9, satisfaction: 91.8 },
    { month: "Apr", onTime: 88.9, quality: 91.2, cost: 2.2, satisfaction: 87.9 },
    { month: "May", onTime: 93.1, quality: 95.7, cost: 1.8, satisfaction: 93.5 },
    { month: "Jun", onTime: 94.7, quality: 96.2, cost: 1.7, satisfaction: 94.8 },
  ], [])

  const topVendors: Vendor[] = useMemo(() => [
    { name: "TechCorp Solutions", spend: 2_400_000, performance: 94.5, risk: "Low" },
    { name: "Global Logistics",   spend: 1_800_000, performance: 91.2, risk: "Medium" },
    { name: "Premium Materials",  spend: 1_500_000, performance: 96.8, risk: "Low" },
    { name: "Swift Services",     spend: 1_200_000, performance: 88.7, risk: "Medium" },
    { name: "Quality Components", spend:   950_000, performance: 92.3, risk: "Low" },
  ], [])

  const spendByCategory = useMemo(() => [
    { category: "Technology", amount: 3_200_000, vendors: 12, color: "hsl(var(--chart-1))" },
    { category: "Logistics",  amount: 2_800_000, vendors: 8,  color: "hsl(var(--chart-2))" },
    { category: "Materials",  amount: 2_100_000, vendors: 15, color: "hsl(var(--chart-3))" },
    { category: "Services",   amount: 1_600_000, vendors: 22, color: "hsl(var(--chart-4))" },
    { category: "Equipment",  amount: 1_200_000, vendors: 6,  color: "hsl(var(--chart-5))" },
  ], [])

  const contractMetrics = useMemo(() => [
    { status: "Active", count: 145, value: 12_500_000 },
    { status: "Expiring Soon", count: 23, value: 2_100_000 },
    { status: "Under Review", count: 18, value: 1_800_000 },
    { status: "Pending Renewal", count: 12, value: 950_000 },
  ], [])

  const riskAssessment = useMemo(() => [
    { vendor: "TechCorp",  financial: 95, operational: 92, compliance: 98, overall: 95 },
    { vendor: "GlobalLog", financial: 88, operational: 85, compliance: 90, overall: 88 },
    { vendor: "Premium",   financial: 96, operational: 98, compliance: 94, overall: 96 },
    { vendor: "Swift",     financial: 82, operational: 78, compliance: 85, overall: 82 },
    { vendor: "Quality",   financial: 91, operational: 89, compliance: 93, overall: 91 },
  ], [])

  return (
    <div className="space-y-6" aria-label="Vendor Relations Dashboard">
      {/* Filters row */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <UnifiedFilters />
      </div>

      {/* KPIs */}
      <section aria-label="Key Vendor Metrics" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Vendor Performance" value={94.7} format="percentage" change={7.2} changeLabel="vs last quarter" trend="up" icon={<Award className="h-4 w-4" aria-hidden="true" />} className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20" />
        <KPICard title="Total Spend" value={10_900_000} format="currency" change={-5.8} changeLabel="vs last quarter" trend="up" icon={<DollarSign className="h-4 w-4" aria-hidden="true" />} className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20" />
        <KPICard title="On-Time Delivery" value={94.7} format="percentage" change={7.2} changeLabel="vs last quarter" trend="up" icon={<Clock className="h-4 w-4" aria-hidden="true" />} className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20" />
        <KPICard title="Active Vendors" value={63} change={-8.7} changeLabel="vs last quarter" trend="up" icon={<Users className="h-4 w-4" aria-hidden="true" />} className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20" />
      </section>

      {/* Performance & Top Vendors */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Performance & Top Vendors">
        <ChartContainer title="Vendor Performance Trends" description="Monthly performance metrics">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vendorPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => formatPercent(v)} />
              <Tooltip formatter={(v: number, name: string) => [formatPercent(v), name]} labelFormatter={(label) => `Month: ${label}`} />
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
              <XAxis dataKey="spend" type="number" name="Annual Spend" tickFormatter={formatCurrencyMillions} domain={["auto", "auto"]} />
              <YAxis dataKey="performance" type="number" name="Performance" unit="%" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value: number, name: string) => name === "spend" ? [formatCurrencyMillions(value), "Annual Spend"] : [`${value}%`, "Performance"]} labelFormatter={() => `Vendor`} />
              <Legend />
              <Scatter name="Vendors" data={topVendors} fill="hsl(var(--chart-1))" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </section>

      {/* Spend & Contracts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Spend & Contracts">
        <ChartContainer title="Spend by Category" description="Vendor spending breakdown by category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={spendByCategory} dataKey="amount" nameKey="category" cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} label={({ category, amount }) => `${category}: ${formatCurrencyMillions(amount)}`} labelLine={false}>
                {spendByCategory.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip formatter={(value: number) => [formatCurrencyMillions(value), "Spend"]} labelFormatter={(label) => `Category: ${label}`} />
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
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrencyMillions(Number(v))} />
              <Tooltip formatter={(v: number, name: string) => name === "value" ? [formatCurrency(v), "Contract Value"] : [v, "Contract Count"]} />
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
            <Bar dataKey="financial" fill="hsl(var(--chart-1))" name="Financial" />
            <Bar dataKey="operational" fill="hsl(var(--chart-2))" name="Operational" />
            <Bar dataKey="compliance" fill="hsl(var(--chart-3))" name="Compliance" />
            <Bar dataKey="overall" fill="hsl(var(--chart-4))" name="Overall" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Table */}
      <TopVendorsTable data={topVendors} />

      {/* Extra KPIs */}
      <section aria-label="Additional Vendor KPIs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Cost Savings" value={1_250_000} format="currency" change={18.5} changeLabel="vs last year" trend="up" icon={<TrendingUp className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Contract Compliance" value={96.8} format="percentage" change={2.3} changeLabel="vs last quarter" trend="up" icon={<Target className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Risk Score" value={12} change={-25.0} changeLabel="high risk vendors" trend="up" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />} />
        <KPICard title="Vendor Satisfaction" value={91.4} format="percentage" change={4.2} changeLabel="vs last survey" trend="up" icon={<Handshake className="h-4 w-4" aria-hidden="true" />} />
      </section>
    </div>
  )
}
