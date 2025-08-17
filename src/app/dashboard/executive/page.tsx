"use client"
import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { EnhancedDashboardFilters } from "~/components/enhanced-dashboard-filters"
import { InteractiveChart } from "~/components/interactive-chart"
import { useFilters } from "~/components/filter-context"
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
  Treemap,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, DollarSign, Users, Target, Building, Globe, Award, Zap } from "lucide-react"

const chartColors = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#84CC16", // Lime
]

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 2400000, profit: 400000, expenses: 2000000 },
  { month: "Feb", revenue: 2100000, profit: 300000, expenses: 1800000 },
  { month: "Mar", revenue: 2800000, profit: 600000, expenses: 2200000 },
  { month: "Apr", revenue: 3200000, profit: 800000, expenses: 2400000 },
  { month: "May", revenue: 2900000, profit: 650000, expenses: 2250000 },
  { month: "Jun", revenue: 3500000, profit: 950000, expenses: 2550000 },
]

const departmentPerformance = [
  { name: "Sales", value: 35, color: chartColors[0] },
  { name: "Marketing", value: 25, color: chartColors[1] },
  { name: "Operations", value: 20, color: chartColors[2] },
  { name: "IT", value: 12, color: chartColors[3] },
  { name: "HR", value: 8, color: chartColors[4] },
]

const regionalData = [
  { region: "North America", revenue: 12500000, growth: 15.2, color: chartColors[0] },
  { region: "Europe", revenue: 8900000, growth: 12.8, color: chartColors[1] },
  { region: "Asia Pacific", revenue: 6700000, growth: 22.1, color: chartColors[2] },
  { region: "Latin America", revenue: 850000, growth: 8.5, color: chartColors[3] },
  { region: "Middle East", revenue: 650000, growth: 18.7, color: chartColors[4] },
]

const treemapData = [
  {
    name: "Enterprise Software",
    size: 8500000,
    fill: chartColors[0],
    children: [
      { name: "CRM Platform", size: 3200000, fill: chartColors[0] },
      { name: "ERP Solutions", size: 2800000, fill: "#2563EB" },
      { name: "Analytics Suite", size: 1500000, fill: "#1D4ED8" },
      { name: "Security Tools", size: 1000000, fill: "#1E40AF" },
    ],
  },
  {
    name: "Cloud Services",
    size: 6200000,
    fill: chartColors[1],
    children: [
      { name: "Infrastructure", size: 2500000, fill: chartColors[1] },
      { name: "Platform Services", size: 2000000, fill: "#059669" },
      { name: "Storage Solutions", size: 1200000, fill: "#047857" },
      { name: "Backup & Recovery", size: 500000, fill: "#065F46" },
    ],
  },
  {
    name: "Mobile Applications",
    size: 4800000,
    fill: chartColors[2],
    children: [
      { name: "iOS Apps", size: 2200000, fill: chartColors[2] },
      { name: "Android Apps", size: 1800000, fill: "#D97706" },
      { name: "Cross-Platform", size: 800000, fill: "#B45309" },
    ],
  },
  {
    name: "AI & Machine Learning",
    size: 950000,
    fill: chartColors[3],
    children: [
      { name: "Predictive Analytics", size: 450000, fill: chartColors[3] },
      { name: "Natural Language", size: 300000, fill: "#DC2626" },
      { name: "Computer Vision", size: 150000, fill: "#B91C1C" },
      { name: "Automation Tools", size: 50000, fill: "#991B1B" },
    ],
  },
  {
    name: "Consulting Services",
    size: 780000,
    fill: chartColors[4],
    children: [
      { name: "Digital Transformation", size: 350000, fill: chartColors[4] },
      { name: "System Integration", size: 250000, fill: "#7C3AED" },
      { name: "Training & Support", size: 180000, fill: "#6D28D9" },
    ],
  },
  {
    name: "Hardware Solutions",
    size: 620000,
    fill: chartColors[5],
    children: [
      { name: "Servers & Storage", size: 320000, fill: chartColors[5] },
      { name: "Networking Equipment", size: 200000, fill: "#0891B2" },
      { name: "IoT Devices", size: 100000, fill: "#0E7490" },
    ],
  },
  {
    name: "Cybersecurity",
    size: 480000,
    fill: chartColors[6],
    children: [
      { name: "Threat Detection", size: 220000, fill: chartColors[6] },
      { name: "Identity Management", size: 160000, fill: "#EA580C" },
      { name: "Compliance Tools", size: 100000, fill: "#C2410C" },
    ],
  },
  {
    name: "Data Analytics",
    size: 350000,
    fill: chartColors[7],
    children: [
      { name: "Business Intelligence", size: 180000, fill: chartColors[7] },
      { name: "Data Visualization", size: 120000, fill: "#65A30D" },
      { name: "Reporting Tools", size: 50000, fill: "#4D7C0F" },
    ],
  },
]

const quarterlyGrowth = [
  { quarter: "Q1 2023", growth: 12.5, target: 15.0 },
  { quarter: "Q2 2023", growth: 18.2, target: 15.0 },
  { quarter: "Q3 2023", growth: 14.8, target: 15.0 },
  { quarter: "Q4 2023", growth: 22.1, target: 15.0 },
  { quarter: "Q1 2024", growth: 19.5, target: 18.0 },
  { quarter: "Q2 2024", growth: 25.3, target: 18.0 },
]

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`
  } else {
    return `$${value}`
  }
}

export default function ExecutiveDashboard() {
  const { filters, getFilteredData } = useFilters()

  const filteredRevenueData = getFilteredData(revenueData, (item, filters) => {
    if (filters.timeRange && filters.timeRange !== "30d") return false
    return true
  })

  const handleChartInteraction = (filterKey: string, value: string) => {
    console.log(`[v0] Executive dashboard chart interaction: ${filterKey} = ${value}`)
  }

  return (
    <div className="space-y-6">
      {Object.keys(filters).length > 0 && (
        <div className="text-xs text-muted-foreground">Active filters: {JSON.stringify(filters)}</div>
      )}

      <EnhancedDashboardFilters />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={34200000}
          format="currency"
          change={18.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="Net Profit"
          value={8450000}
          format="currency"
          change={22.5}
          changeLabel="vs last quarter"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Active Customers"
          value={125400}
          change={12.8}
          changeLabel="vs last month"
          trend="up"
          icon={<Users className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Market Share"
          value={24.7}
          format="percentage"
          change={3.2}
          changeLabel="vs last year"
          trend="up"
          icon={<Target className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* Revenue and Profit Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InteractiveChart
          title="Revenue & Profit Trends"
          description="Monthly revenue and profit over the last 6 months"
          filterKey="month"
          onDataClick={handleChartInteraction}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke={chartColors[0]}
                fill={chartColors[0]}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stackId="2"
                stroke={chartColors[1]}
                fill={chartColors[1]}
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </InteractiveChart>

        <InteractiveChart
          title="Department Performance"
          description="Revenue contribution by department"
          filterKey="department"
          onDataClick={handleChartInteraction}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, "Contribution"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </InteractiveChart>
      </div>

      {/* Regional Performance and Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Regional Revenue" description="Revenue performance by geographic region">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionalData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis dataKey="region" type="category" width={100} />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                labelFormatter={(label) => `Region: ${label}`}
              />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {regionalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Quarterly Growth vs Target" description="Growth performance against targets">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quarterlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Growth"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="growth"
                stroke={chartColors[1]}
                strokeWidth={3}
                dot={{ fill: chartColors[1], strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={chartColors[3]}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: chartColors[3], strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Product Revenue Treemap */}
      <ChartContainer
        title="Product Revenue Distribution"
        description="Revenue breakdown by product lines and categories"
      >
        <ResponsiveContainer width="100%" height={500}>
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            strokeWidth={2}
            content={({ root, depth, x, y, width, height, index, payload, colors, name }) => {
              const fillColor = payload?.fill || chartColors[index % chartColors.length]
              const displayName = name || payload?.name || "Unknown"
              const displaySize = payload?.size || 0
              const isLargeEnough = width > 80 && height > 50
              const isMediumSize = width > 50 && height > 30

              return (
                <g>
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                      fill: fillColor,
                      stroke: "#fff",
                      strokeWidth: 2,
                      strokeOpacity: 1,
                      opacity: 0.9,
                    }}
                  />
                  {isLargeEnough && (
                    <>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 - 12}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="14"
                        fontWeight="bold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {displayName}
                      </text>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 4}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="12"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {formatCurrency(displaySize)}
                      </text>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 18}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="10"
                        opacity={0.9}
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {((displaySize / 23680000) * 100).toFixed(1)}%
                      </text>
                    </>
                  )}
                  {isMediumSize && !isLargeEnough && (
                    <>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 - 4}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="11"
                        fontWeight="bold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {displayName.length > 12 ? displayName.substring(0, 12) + "..." : displayName}
                      </text>
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 8}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="9"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
                      >
                        {formatCurrency(displaySize)}
                      </text>
                    </>
                  )}
                </g>
              )
            }}
          />
        </ResponsiveContainer>
      </ChartContainer>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Employee Count"
          value={2847}
          change={5.2}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Building className="h-4 w-4" />}
        />
        <KPICard
          title="Global Offices"
          value={24}
          change={2}
          changeLabel="new this year"
          trend="up"
          icon={<Globe className="h-4 w-4" />}
        />
        <KPICard
          title="Customer Satisfaction"
          value={94.2}
          format="percentage"
          change={1.8}
          changeLabel="vs last survey"
          trend="up"
          icon={<Award className="h-4 w-4" />}
        />
        <KPICard
          title="Operational Efficiency"
          value={87.5}
          format="percentage"
          change={3.4}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
