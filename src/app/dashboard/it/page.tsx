"use client"

import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { EnhancedDashboardFilters } from "~/components/enhanced-dashboard-filters"
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
} from "recharts"
import { Server, Shield, Clock, Zap, AlertTriangle, Database, Wifi, HardDrive } from "lucide-react"

const systemUptimeData = [
  { month: "Jan", uptime: 99.9, incidents: 2, mttr: 45 },
  { month: "Feb", uptime: 99.8, incidents: 3, mttr: 52 },
  { month: "Mar", uptime: 99.95, incidents: 1, mttr: 30 },
  { month: "Apr", uptime: 99.7, incidents: 4, mttr: 65 },
  { month: "May", uptime: 99.85, incidents: 2, mttr: 40 },
  { month: "Jun", uptime: 99.92, incidents: 1, mttr: 35 },
]

const securityMetrics = [
  { category: "Threats Blocked", count: 1247, color: "hsl(var(--chart-1))" },
  { category: "Vulnerabilities Fixed", count: 89, color: "hsl(var(--chart-2))" },
  { category: "Security Scans", count: 156, color: "hsl(var(--chart-3))" },
  { category: "Compliance Checks", count: 45, color: "hsl(var(--chart-4))" },
]

const infrastructureCosts = [
  { service: "Cloud Services", cost: 125000, usage: 85 },
  { service: "Software Licenses", cost: 89000, usage: 92 },
  { service: "Hardware", cost: 67000, usage: 78 },
  { service: "Network", cost: 45000, usage: 88 },
  { service: "Storage", cost: 34000, usage: 82 },
]

const performanceData = [
  { metric: "CPU Usage", current: 68, threshold: 80, status: "good" },
  { metric: "Memory Usage", current: 72, threshold: 85, status: "good" },
  { metric: "Disk Usage", current: 45, threshold: 90, status: "good" },
  { metric: "Network Load", current: 58, threshold: 75, status: "good" },
]

export default function ITDashboard() {
  return (
    <div className="space-y-6">
      <EnhancedDashboardFilters />

      {/* Key IT Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="System Uptime"
          value={99.87}
          format="percentage"
          change={0.12}
          changeLabel="vs last month"
          trend="up"
          icon={<Server className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Security Score"
          value={94.5}
          format="percentage"
          change={2.3}
          changeLabel="vs last month"
          trend="up"
          icon={<Shield className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="MTTR (Minutes)"
          value={42}
          change={-8.5}
          changeLabel="vs last month"
          trend="up"
          icon={<Clock className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Active Incidents"
          value={3}
          change={-40}
          changeLabel="vs last month"
          trend="up"
          icon={<AlertTriangle className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* System Performance and Security */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="System Uptime & Incidents" description="Monthly uptime and incident tracking">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemUptimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="uptime"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                name="Uptime %"
              />
              <Bar yAxisId="right" dataKey="incidents" fill="hsl(var(--chart-4))" name="Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Security Metrics" description="Monthly security activities">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={securityMetrics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
                label={({ category, count }) => `${category}: ${count}`}
                labelLine={false}
              >
                {securityMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Infrastructure Costs and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Infrastructure Costs" description="Monthly IT infrastructure spending">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={infrastructureCosts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, "Cost"]} />
              <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                {infrastructureCosts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 5) + 1}))`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="System Performance" description="Current system resource utilization">
          <div className="space-y-4">
            {performanceData.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">{metric.metric}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${metric.current > metric.threshold ? "bg-chart-4" : "bg-chart-3"}`}
                      style={{ width: `${metric.current}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium w-12">{metric.current}%</div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Additional IT KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Storage Usage"
          value={67.8}
          format="percentage"
          change={5.2}
          changeLabel="vs last month"
          trend="neutral"
          icon={<HardDrive className="h-4 w-4" />}
        />
        <KPICard
          title="Network Bandwidth"
          value={1.2}
          change={-8.5}
          changeLabel="Gbps avg usage"
          trend="up"
          icon={<Wifi className="h-4 w-4" />}
        />
        <KPICard
          title="Database Performance"
          value={245}
          change={-12.3}
          changeLabel="ms avg response"
          trend="up"
          icon={<Database className="h-4 w-4" />}
        />
        <KPICard
          title="Energy Efficiency"
          value={87.2}
          format="percentage"
          change={3.1}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
