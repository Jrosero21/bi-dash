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
  ComposedChart,
  Area,
  AreaChart,
} from "recharts"
import { DollarSign, TrendingUp, Target, Phone, Mail, Calendar, Award } from "lucide-react"

// Sample data for sales charts
const salesTrendData = [
  { month: "Jan", revenue: 850000, cashCollected: 780000, target: 900000, deals: 45 },
  { month: "Feb", revenue: 920000, cashCollected: 850000, target: 900000, deals: 52 },
  { month: "Mar", revenue: 1100000, cashCollected: 980000, target: 1000000, deals: 61 },
  { month: "Apr", revenue: 1250000, cashCollected: 1150000, target: 1200000, deals: 68 },
  { month: "May", revenue: 1180000, cashCollected: 1080000, target: 1200000, deals: 59 },
  { month: "Jun", revenue: 1350000, cashCollected: 1220000, target: 1300000, deals: 74 },
]

const chartColors = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
]

const salesTeamPerformance = [
  { name: "Enterprise", revenue: 2800000, deals: 28, avgDeal: 100000, color: chartColors[0] },
  { name: "Mid-Market", revenue: 1950000, deals: 65, avgDeal: 30000, color: chartColors[1] },
  { name: "SMB", revenue: 1200000, deals: 120, avgDeal: 10000, color: chartColors[2] },
  { name: "Inside Sales", revenue: 850000, deals: 170, avgDeal: 5000, color: chartColors[3] },
]

const pipelineData = [
  { stage: "Prospecting", value: 45, deals: 180, amount: 4500000, color: chartColors[0] },
  { stage: "Qualification", value: 35, deals: 140, amount: 3500000, color: chartColors[1] },
  { stage: "Proposal", value: 25, deals: 100, amount: 2500000, color: chartColors[2] },
  { stage: "Negotiation", value: 15, deals: 60, amount: 1500000, color: chartColors[3] },
  { stage: "Closed Won", value: 10, deals: 40, amount: 1000000, color: chartColors[4] },
]

const salesRepPerformance = [
  { name: "Sarah Johnson", quota: 100, achieved: 125, deals: 18 },
  { name: "Mike Chen", quota: 100, achieved: 118, deals: 22 },
  { name: "Emily Davis", quota: 100, achieved: 95, deals: 15 },
  { name: "David Wilson", quota: 100, achieved: 142, deals: 28 },
  { name: "Lisa Brown", quota: 100, achieved: 88, deals: 12 },
  { name: "Tom Anderson", quota: 100, achieved: 156, deals: 31 },
]

const conversionFunnelData = [
  { stage: "Leads", count: 5000, conversion: 100 },
  { stage: "Qualified", count: 2500, conversion: 50 },
  { stage: "Opportunities", count: 1000, conversion: 20 },
  { stage: "Proposals", count: 400, conversion: 8 },
  { stage: "Closed Won", count: 120, conversion: 2.4 },
]

const monthlyTargets = [
  { month: "Jan", target: 900000, achieved: 850000, percentage: 94.4 },
  { month: "Feb", target: 900000, achieved: 920000, percentage: 102.2 },
  { month: "Mar", target: 1000000, achieved: 1100000, percentage: 110.0 },
  { month: "Apr", target: 1200000, achieved: 1250000, percentage: 104.2 },
  { month: "May", target: 1200000, achieved: 1180000, percentage: 98.3 },
  { month: "Jun", target: 1300000, achieved: 1350000, percentage: 103.8 },
]

export default function SalesDashboard() {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFiltersChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters)
    console.log("[v0] Sales dashboard filters changed:", newFilters)
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <DashboardFilters onFiltersChange={handleFiltersChange} />

      {/* Key Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Cash Collected"
          value={6060000}
          format="currency"
          change={15.8}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Total Revenue"
          value={6650000}
          format="currency"
          change={18.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="Active Deals"
          value={359}
          change={12.4}
          changeLabel="vs last month"
          trend="up"
          icon={<Target className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Conversion Rate"
          value={2.4}
          format="percentage"
          change={0.3}
          changeLabel="vs last month"
          trend="up"
          icon={<Award className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* Revenue vs Cash Collected and Sales Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Revenue vs Cash Collected" description="Monthly revenue and actual cash collected">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${(value / 1000000).toFixed(2)}M`,
                  name === "revenue" ? "Revenue" : name === "cashCollected" ? "Cash Collected" : "Target",
                ]}
              />
              <Legend />
              <Bar dataKey="revenue" fill={chartColors[0]} name="Revenue" />
              <Bar dataKey="cashCollected" fill={chartColors[1]} name="Cash Collected" />
              <Line
                type="monotone"
                dataKey="target"
                stroke={chartColors[2]}
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Target"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Sales Pipeline" description="Current pipeline by stage">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <YAxis dataKey="stage" type="category" width={100} />
              <Tooltip
                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Pipeline Value"]}
                labelFormatter={(label) => `Stage: ${label}`}
              />
              <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                {pipelineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Sales Team Performance and Target Achievement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Sales Team Performance" description="Revenue by sales team">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesTeamPerformance}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="revenue"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {salesTeamPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, "Revenue"]}
                labelFormatter={(label) => `Team: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Monthly Target Achievement" description="Target vs actual performance">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTargets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Achievement"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke={chartColors[0]}
                strokeWidth={3}
                dot={{ fill: chartColors[0], strokeWidth: 2, r: 6 }}
                name="Achievement %"
              />
              <Line
                type="monotone"
                dataKey={100}
                stroke={chartColors[2]}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Target (100%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Sales Rep Performance and Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Top Sales Representatives" description="Quota achievement by sales rep">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesRepPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Quota Achievement"]}
                labelFormatter={(label) => `Rep: ${label}`}
              />
              <Bar dataKey="achieved" radius={[4, 4, 0, 0]} name="Achievement %">
                {salesRepPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Sales Conversion Funnel" description="Lead to customer conversion rates">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionFunnelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "conversion" ? `${value}%` : value.toLocaleString(),
                  name === "conversion" ? "Conversion Rate" : "Count",
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="conversion"
                stroke={chartColors[1]}
                fill={chartColors[1]}
                fillOpacity={0.6}
                name="Conversion %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Additional Sales KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Average Deal Size"
          value={18500}
          format="currency"
          change={8.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Sales Cycle (Days)"
          value={42}
          change={-5.1}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Calendar className="h-4 w-4" />}
        />
        <KPICard
          title="Lead Response Time"
          value={2.3}
          change={-12.5}
          changeLabel="hours, vs last month"
          trend="up"
          icon={<Phone className="h-4 w-4" />}
        />
        <KPICard
          title="Email Open Rate"
          value={24.8}
          format="percentage"
          change={3.2}
          changeLabel="vs last campaign"
          trend="up"
          icon={<Mail className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
