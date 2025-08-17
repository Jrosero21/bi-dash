"use client"

import { useState } from "react"
import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { DashboardFilters } from "~/components/dashboard-filters"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { DollarSign, TrendingUp, Calculator, PieChartIcon, AlertTriangle, CreditCard, Banknote } from "lucide-react"

const chartColors = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#84cc16", // Lime
  "#f97316", // Orange
]

// Sample data for accounting charts
const budgetVsRevenueData = [
  { month: "Jan", budget: 2200000, revenue: 2400000, variance: 200000, variancePercent: 9.1 },
  { month: "Feb", budget: 2300000, revenue: 2100000, variance: -200000, variancePercent: -8.7 },
  { month: "Mar", budget: 2500000, revenue: 2800000, variance: 300000, variancePercent: 12.0 },
  { month: "Apr", budget: 2600000, revenue: 3200000, variance: 600000, variancePercent: 23.1 },
  { month: "May", budget: 2700000, revenue: 2900000, variance: 200000, variancePercent: 7.4 },
  { month: "Jun", budget: 2800000, revenue: 3500000, variance: 700000, variancePercent: 25.0 },
]

const profitMarginData = [
  { month: "Jan", revenue: 2400000, cogs: 1440000, grossProfit: 960000, gpm: 40.0 },
  { month: "Feb", revenue: 2100000, cogs: 1260000, grossProfit: 840000, gpm: 40.0 },
  { month: "Mar", revenue: 2800000, cogs: 1624000, grossProfit: 1176000, gpm: 42.0 },
  { month: "Apr", revenue: 3200000, cogs: 1792000, grossProfit: 1408000, gpm: 44.0 },
  { month: "May", revenue: 2900000, cogs: 1595000, grossProfit: 1305000, gpm: 45.0 },
  { month: "Jun", revenue: 3500000, cogs: 1890000, grossProfit: 1610000, gpm: 46.0 },
]

const expenseBreakdown = [
  { category: "Salaries & Benefits", amount: 1200000, percentage: 45 },
  { category: "Marketing", amount: 400000, percentage: 15 },
  { category: "Operations", amount: 350000, percentage: 13 },
  { category: "Technology", amount: 300000, percentage: 11 },
  { category: "Facilities", amount: 250000, percentage: 9 },
  { category: "Other", amount: 180000, percentage: 7 },
]

const cashFlowData = [
  { month: "Jan", operating: 450000, investing: -120000, financing: -80000, net: 250000 },
  { month: "Feb", operating: 380000, investing: -50000, financing: -100000, net: 230000 },
  { month: "Mar", operating: 620000, investing: -200000, financing: 150000, net: 570000 },
  { month: "Apr", operating: 780000, investing: -300000, financing: -150000, net: 330000 },
  { month: "May", operating: 650000, investing: -80000, financing: -120000, net: 450000 },
  { month: "Jun", operating: 890000, investing: -400000, financing: 200000, net: 690000 },
]

const accountsData = [
  { month: "Jan", receivables: 850000, payables: 420000, dso: 32, dpo: 28 },
  { month: "Feb", receivables: 920000, payables: 380000, dso: 35, dpo: 25 },
  { month: "Mar", receivables: 1100000, payables: 450000, dso: 30, dpo: 30 },
  { month: "Apr", receivables: 1250000, payables: 520000, dso: 28, dpo: 32 },
  { month: "May", receivables: 1180000, payables: 480000, dso: 31, dpo: 29 },
  { month: "Jun", receivables: 1350000, payables: 580000, dso: 29, dpo: 33 },
]

const financialRatios = [
  { metric: "Current Ratio", value: 2.4, benchmark: 2.0, status: "good" },
  { metric: "Quick Ratio", value: 1.8, benchmark: 1.0, status: "good" },
  { metric: "Debt-to-Equity", value: 0.35, benchmark: 0.5, status: "good" },
  { metric: "ROA", value: 12.5, benchmark: 10.0, status: "good" },
  { metric: "ROE", value: 18.2, benchmark: 15.0, status: "good" },
  { metric: "Gross Margin", value: 43.5, benchmark: 40.0, status: "good" },
]

const budgetVarianceData = [
  { department: "Sales", budget: 500000, actual: 520000, variance: 4.0 },
  { department: "Marketing", budget: 400000, actual: 380000, variance: -5.0 },
  { department: "Operations", budget: 350000, actual: 365000, variance: 4.3 },
  { department: "IT", budget: 300000, actual: 285000, variance: -5.0 },
  { department: "HR", budget: 200000, actual: 195000, variance: -2.5 },
  { department: "Finance", budget: 150000, actual: 145000, variance: -3.3 },
]

export default function AccountingDashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFiltersChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <DashboardFilters onFiltersChange={handleFiltersChange} />

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Gross Profit Margin"
          value={43.5}
          format="percentage"
          change={2.8}
          changeLabel="vs last quarter"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Budget Variance"
          value={8.2}
          format="percentage"
          change={1.5}
          changeLabel="favorable vs plan"
          trend="up"
          icon={<Calculator className="h-4 w-4" />}
        />
        <KPICard
          title="Cash Flow"
          value={2520000}
          format="currency"
          change={15.4}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Current Ratio"
          value={2.4}
          change={0.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<PieChartIcon className="h-4 w-4" />}
        />
      </div>

      {/* Budget vs Revenue and Profit Margin Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Budget vs Revenue Analysis" description="Monthly budget performance and variance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetVsRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  name === "budget" ? "Budget" : "Revenue",
                ]}
              />
              <Legend />
              <Bar dataKey="budget" fill={chartColors[1]} name="Budget" />
              <Bar dataKey="revenue" fill={chartColors[0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Gross Profit Margin Trend" description="Monthly GPM and profit analysis">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitMarginData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "GPM"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="gpm"
                stroke={chartColors[2]}
                strokeWidth={3}
                name="GPM %"
                dot={{ fill: chartColors[2], strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Expense Breakdown and Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Expense Breakdown" description="Operating expenses by category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="amount"
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                labelLine={false}
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Cash Flow Analysis" description="Operating, investing, and financing cash flows">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${(value / 1000).toFixed(0)}K`,
                  name === "operating" ? "Operating" : name === "investing" ? "Investing" : "Financing",
                ]}
              />
              <Legend />
              <Bar dataKey="operating" fill={chartColors[2]} name="Operating" />
              <Bar dataKey="investing" fill={chartColors[3]} name="Investing" />
              <Bar dataKey="financing" fill={chartColors[1]} name="Financing" />
              <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Accounts Receivable/Payable and Budget Variance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Accounts Receivable & Payable" description="AR/AP balances and trends">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accountsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  name === "receivables" ? "A/R" : "A/P",
                ]}
              />
              <Legend />
              <Bar dataKey="receivables" fill={chartColors[0]} name="Receivables" />
              <Bar dataKey="payables" fill={chartColors[1]} name="Payables" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Budget Variance by Department" description="Actual vs budget performance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetVarianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Variance"]} />
              <Bar dataKey="variance" name="Budget Variance %">
                {budgetVarianceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.variance >= 0 ? chartColors[2] : chartColors[3]} />
                ))}
              </Bar>
              <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Financial Ratios */}
      <ChartContainer title="Key Financial Ratios" description="Current financial health indicators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {financialRatios.map((ratio, index) => (
            <div key={index} className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{ratio.metric}</h4>
                <div
                  className={`text-xs px-2 py-1 rounded ${
                    ratio.status === "good" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {ratio.status === "good" ? "Good" : "Watch"}
                </div>
              </div>
              <div className="text-2xl font-bold">
                {ratio.metric.includes("Ratio") ? ratio.value.toFixed(1) : `${ratio.value}%`}
              </div>
              <div className="text-xs text-muted-foreground">
                Benchmark: {ratio.metric.includes("Ratio") ? ratio.benchmark.toFixed(1) : `${ratio.benchmark}%`}
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Additional Accounting KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Days Sales Outstanding"
          value={29}
          change={-2.1}
          changeLabel="days vs last quarter"
          trend="up"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <KPICard
          title="Days Payable Outstanding"
          value={31}
          change={1.8}
          changeLabel="days vs last quarter"
          trend="up"
          icon={<Banknote className="h-4 w-4" />}
        />
        <KPICard
          title="Working Capital"
          value={4200000}
          format="currency"
          change={12.5}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Debt Service Coverage"
          value={3.2}
          change={0.4}
          changeLabel="vs last quarter"
          trend="up"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
