"use client"

import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { EnhancedDashboardFilters } from "~/components/enhanced-dashboard-filters"
import {
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
} from "recharts"
import { Settings, TrendingUp, Clock, Package, Truck, Users, Target, AlertCircle } from "lucide-react"

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

const operationalEfficiency = [
  { month: "Jan", efficiency: 82.5, throughput: 1250, quality: 94.2 },
  { month: "Feb", efficiency: 85.1, throughput: 1320, quality: 95.1 },
  { month: "Mar", efficiency: 87.8, throughput: 1450, quality: 96.3 },
  { month: "Apr", efficiency: 89.2, throughput: 1520, quality: 95.8 },
  { month: "May", efficiency: 91.5, throughput: 1680, quality: 97.1 },
  { month: "Jun", efficiency: 93.2, throughput: 1750, quality: 96.9 },
]

const processMetrics = [
  { process: "Manufacturing", efficiency: 94.5, target: 90, variance: 4.5, color: chartColors[0] },
  { process: "Quality Control", efficiency: 97.2, target: 95, variance: 2.2, color: chartColors[1] },
  { process: "Packaging", efficiency: 89.8, target: 85, variance: 4.8, color: chartColors[2] },
  { process: "Shipping", efficiency: 92.1, target: 90, variance: 2.1, color: chartColors[3] },
  { process: "Inventory", efficiency: 88.5, target: 85, variance: 3.5, color: chartColors[4] },
]

const supplyChainData = [
  { month: "Jan", onTime: 87.5, inventory: 145, costs: 2.1 },
  { month: "Feb", onTime: 89.2, inventory: 138, costs: 2.0 },
  { month: "Mar", onTime: 91.8, inventory: 142, costs: 1.9 },
  { month: "Apr", onTime: 88.9, inventory: 151, costs: 2.2 },
  { month: "May", onTime: 93.1, inventory: 135, costs: 1.8 },
  { month: "Jun", onTime: 94.7, inventory: 129, costs: 1.7 },
]

export default function OperationsDashboard() {
  return (
    <div className="space-y-6">
      <EnhancedDashboardFilters />

      {/* Key Operations Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Overall Efficiency"
          value={93.2}
          format="percentage"
          change={8.7}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Settings className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Throughput"
          value={1750}
          change={15.2}
          changeLabel="units/day"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="Quality Score"
          value={96.9}
          format="percentage"
          change={2.7}
          changeLabel="vs last month"
          trend="up"
          icon={<Target className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="On-Time Delivery"
          value={94.7}
          format="percentage"
          change={7.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Truck className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* Operational Efficiency and Process Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Operational Efficiency Trends" description="Monthly efficiency, throughput, and quality">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={operationalEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="efficiency"
                stroke={chartColors[0]}
                strokeWidth={3}
                name="Efficiency %"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="quality"
                stroke={chartColors[1]}
                strokeWidth={2}
                name="Quality %"
              />
              <Bar yAxisId="right" dataKey="throughput" fill={chartColors[2]} name="Throughput" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Process Performance" description="Efficiency by operational process">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" name="Current %">
                {processMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar dataKey="target" fill={chartColors[5]} name="Target %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Supply Chain and Inventory */}
      <ChartContainer title="Supply Chain Performance" description="On-time delivery, inventory levels, and costs">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={supplyChainData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="onTime"
              stroke={chartColors[1]}
              strokeWidth={3}
              name="On-Time %"
            />
            <Bar yAxisId="right" dataKey="inventory" fill={chartColors[0]} name="Inventory Days" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="costs"
              stroke={chartColors[3]}
              strokeWidth={2}
              name="Cost Index"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Additional Operations KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Cycle Time"
          value={4.2}
          change={-12.5}
          changeLabel="hours avg"
          trend="up"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Inventory Turnover"
          value={8.5}
          change={15.2}
          changeLabel="times per year"
          trend="up"
          icon={<Package className="h-4 w-4" />}
        />
        <KPICard
          title="Workforce Utilization"
          value={89.3}
          format="percentage"
          change={3.8}
          changeLabel="vs last month"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Defect Rate"
          value={0.8}
          format="percentage"
          change={-25.0}
          changeLabel="vs last quarter"
          trend="up"
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
