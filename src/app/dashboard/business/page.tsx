"use client"

import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { EnhancedDashboardFilters } from "~/components/enhanced-dashboard-filters"
import {
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
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, Target, DollarSign, Award, Globe, Zap } from "lucide-react"

const businessGrowthData = [
  { quarter: "Q1 2023", revenue: 8500000, customers: 12400, marketShare: 22.1 },
  { quarter: "Q2 2023", revenue: 9200000, customers: 13800, marketShare: 23.5 },
  { quarter: "Q3 2023", revenue: 10100000, customers: 15200, marketShare: 24.2 },
  { quarter: "Q4 2023", revenue: 11800000, customers: 17600, marketShare: 25.8 },
  { quarter: "Q1 2024", revenue: 12900000, customers: 19200, marketShare: 26.4 },
  { quarter: "Q2 2024", revenue: 14200000, customers: 21500, marketShare: 27.1 },
]

const businessUnits = [
  { unit: "Enterprise Solutions", revenue: 45, growth: 18.5, color: "hsl(var(--chart-1))" },
  { unit: "Consumer Products", revenue: 30, growth: 12.3, color: "hsl(var(--chart-2))" },
  { unit: "Professional Services", revenue: 15, growth: 25.1, color: "hsl(var(--chart-3))" },
  { unit: "Digital Platform", revenue: 10, growth: 35.7, color: "hsl(var(--chart-4))" },
]

const customerSegments = [
  { segment: "Enterprise", value: 4200000, customers: 450, retention: 94.5 },
  { segment: "Mid-Market", value: 2800000, customers: 1200, retention: 89.2 },
  { segment: "Small Business", value: 1900000, customers: 3400, retention: 82.1 },
  { segment: "Startup", value: 850000, customers: 2100, retention: 76.8 },
]

const competitiveAnalysis = [
  { metric: "Market Share", us: 27.1, competitor1: 24.8, competitor2: 18.5 },
  { metric: "Customer Satisfaction", us: 94.2, competitor1: 87.5, competitor2: 82.1 },
  { metric: "Innovation Index", us: 8.7, competitor1: 7.2, competitor2: 6.8 },
  { metric: "Brand Recognition", us: 85.4, competitor1: 78.9, competitor2: 71.2 },
]

export default function BusinessDashboard() {
  return (
    <div className="space-y-6">
      <EnhancedDashboardFilters />

      {/* Key Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={14200000}
          format="currency"
          change={22.8}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="Market Share"
          value={27.1}
          format="percentage"
          change={1.3}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Target className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Customer Base"
          value={21500}
          change={18.5}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Users className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Business Growth"
          value={22.8}
          format="percentage"
          change={4.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* Business Growth and Unit Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Business Growth Trends" description="Quarterly revenue, customers, and market share">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={businessGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
                name="Revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="marketShare"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                name="Market Share %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Business Unit Performance" description="Revenue contribution by business unit">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={businessUnits}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="revenue"
                label={({ unit, revenue }) => `${unit}: ${revenue}%`}
                labelLine={false}
              >
                {businessUnits.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, "Revenue Share"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Customer Segments and Competitive Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Customer Segments" description="Revenue and retention by customer segment">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerSegments}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis yAxisId="left" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="value" fill="hsl(var(--chart-1))" name="Revenue" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="retention"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                name="Retention %"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Competitive Analysis" description="Performance vs key competitors">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={competitiveAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="us" fill="hsl(var(--chart-1))" name="Our Company" />
              <Bar dataKey="competitor1" fill="hsl(var(--chart-2))" name="Competitor A" />
              <Bar dataKey="competitor2" fill="hsl(var(--chart-3))" name="Competitor B" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Additional Business KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Customer Lifetime Value"
          value={12500}
          format="currency"
          change={8.7}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Award className="h-4 w-4" />}
        />
        <KPICard
          title="Brand Recognition"
          value={85.4}
          format="percentage"
          change={3.2}
          changeLabel="vs last survey"
          trend="up"
          icon={<Globe className="h-4 w-4" />}
        />
        <KPICard
          title="Innovation Index"
          value={8.7}
          change={0.5}
          changeLabel="vs industry avg"
          trend="up"
          icon={<Zap className="h-4 w-4" />}
        />
        <KPICard
          title="Employee Satisfaction"
          value={87.2}
          format="percentage"
          change={2.1}
          changeLabel="vs last survey"
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
