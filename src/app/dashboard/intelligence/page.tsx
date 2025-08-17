"use client"

import { KPICard } from "~/components/kpi-card"
import { ChartContainer } from "~/components/chart-container"
import { EnhancedDashboardFilters } from "~/components/enhanced-dashboard-filters"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts"
import { Brain, TrendingUp, Database, Zap, Target, Eye, Cpu } from "lucide-react"

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

const predictiveAnalytics = [
  { month: "Jul", predicted: 3800000, actual: 3650000, confidence: 92 },
  { month: "Aug", predicted: 4100000, actual: 4050000, confidence: 94 },
  { month: "Sep", predicted: 4350000, actual: 4200000, confidence: 89 },
  { month: "Oct", predicted: 4600000, actual: null, confidence: 91 },
  { month: "Nov", predicted: 4850000, actual: null, confidence: 88 },
  { month: "Dec", predicted: 5200000, actual: null, confidence: 85 },
]

const dataQualityMetrics = [
  { source: "CRM", completeness: 94, accuracy: 97, timeliness: 92, color: chartColors[0] },
  { source: "ERP", completeness: 98, accuracy: 95, timeliness: 96, color: chartColors[1] },
  { source: "Marketing", completeness: 87, accuracy: 89, timeliness: 85, color: chartColors[2] },
  { source: "Sales", completeness: 91, accuracy: 93, timeliness: 88, color: chartColors[3] },
  { source: "Finance", completeness: 99, accuracy: 98, timeliness: 97, color: chartColors[4] },
]

const mlModelPerformance = [
  { model: "Customer Churn", accuracy: 94.2, precision: 91.8, recall: 89.5, color: chartColors[0] },
  { model: "Demand Forecast", accuracy: 87.6, precision: 85.3, recall: 88.1, color: chartColors[1] },
  { model: "Price Optimization", accuracy: 92.1, precision: 90.7, recall: 91.4, color: chartColors[2] },
  { model: "Fraud Detection", accuracy: 98.5, precision: 97.2, recall: 96.8, color: chartColors[3] },
]

const businessInsights = [
  { insight: "Revenue Growth", impact: 8.5, confidence: 94, priority: "High", color: chartColors[3], size: 120 },
  { insight: "Cost Reduction", impact: 6.2, confidence: 87, priority: "Medium", color: chartColors[2], size: 80 },
  { insight: "Customer Retention", impact: 12.3, confidence: 91, priority: "High", color: chartColors[3], size: 120 },
  { insight: "Market Expansion", impact: 15.7, confidence: 78, priority: "High", color: chartColors[3], size: 120 },
  { insight: "Process Optimization", impact: 4.8, confidence: 89, priority: "Low", color: chartColors[1], size: 60 },
]

const analyticsUsage = [
  { department: "Sales", usage: 89, adoption: 94, satisfaction: 87, color: chartColors[0] },
  { department: "Marketing", usage: 92, adoption: 88, satisfaction: 91, color: chartColors[1] },
  { department: "Finance", usage: 95, adoption: 97, satisfaction: 93, color: chartColors[2] },
  { department: "Operations", usage: 78, adoption: 82, satisfaction: 79, color: chartColors[3] },
  { department: "Executive", usage: 85, adoption: 91, satisfaction: 88, color: chartColors[4] },
]

export default function IntelligenceDashboard() {
  return (
    <div className="space-y-6">
      <EnhancedDashboardFilters />

      {/* Key Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Prediction Accuracy"
          value={91.2}
          format="percentage"
          change={3.8}
          changeLabel="vs last month"
          trend="up"
          icon={<Brain className="h-4 w-4" />}
          className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
        />
        <KPICard
          title="Data Quality Score"
          value={94.5}
          format="percentage"
          change={2.1}
          changeLabel="vs last month"
          trend="up"
          icon={<Database className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20"
        />
        <KPICard
          title="Active Models"
          value={24}
          change={12.5}
          changeLabel="vs last quarter"
          trend="up"
          icon={<Cpu className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20"
        />
        <KPICard
          title="Insights Generated"
          value={156}
          change={28.3}
          changeLabel="this month"
          trend="up"
          icon={<Eye className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20"
        />
      </div>

      {/* Predictive Analytics and Data Quality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Predictive Analytics Performance" description="Predicted vs actual results">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictiveAnalytics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  value ? `$${(value / 1000000).toFixed(2)}M` : "N/A",
                  name === "predicted" ? "Predicted" : "Actual",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke={chartColors[0]}
                strokeWidth={3}
                strokeDasharray="5 5"
                name="Predicted"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={chartColors[1]}
                strokeWidth={3}
                name="Actual"
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Data Quality by Source" description="Completeness, accuracy, and timeliness metrics">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={dataQualityMetrics}>
              <PolarGrid />
              <PolarAngleAxis dataKey="source" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Completeness"
                dataKey="completeness"
                stroke={chartColors[0]}
                fill={chartColors[0]}
                fillOpacity={0.3}
              />
              <Radar
                name="Accuracy"
                dataKey="accuracy"
                stroke={chartColors[1]}
                fill={chartColors[1]}
                fillOpacity={0.3}
              />
              <Radar
                name="Timeliness"
                dataKey="timeliness"
                stroke={chartColors[2]}
                fill={chartColors[2]}
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* ML Model Performance and Business Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="ML Model Performance" description="Accuracy, precision, and recall metrics">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mlModelPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Score"]} />
              <Legend />
              <Bar dataKey="accuracy" name="Accuracy">
                {mlModelPerformance.map((entry, index) => (
                  <Cell key={`accuracy-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar dataKey="precision" fill={chartColors[5]} name="Precision" />
              <Bar dataKey="recall" fill={chartColors[6]} name="Recall" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="Business Insights Impact" description="Impact vs confidence of generated insights">
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={businessInsights}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="confidence" name="Confidence" unit="%" />
              <YAxis dataKey="impact" name="Impact" unit="%" />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value}${name === "impact" ? "%" : "%"}`,
                  name === "impact" ? "Impact" : "Confidence",
                ]}
                labelFormatter={(label) => `Insight: ${label}`}
              />
              {businessInsights.map((entry, index) => (
                <Scatter key={index} dataKey="impact" fill={entry.color} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Analytics Usage by Department */}
      <ChartContainer title="Analytics Adoption by Department" description="Usage, adoption, and satisfaction rates">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsUsage}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value: number) => [`${value}%`, "Rate"]} />
            <Legend />
            <Bar dataKey="usage" name="Usage Rate">
              {analyticsUsage.map((entry, index) => (
                <Cell key={`usage-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar dataKey="adoption" fill={chartColors[5]} name="Adoption Rate" />
            <Bar dataKey="satisfaction" fill={chartColors[6]} name="Satisfaction" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Additional Intelligence KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Processing Speed"
          value={2.3}
          change={-15.2}
          changeLabel="seconds avg"
          trend="up"
          icon={<Zap className="h-4 w-4" />}
        />
        <KPICard
          title="Model Accuracy"
          value={93.1}
          format="percentage"
          change={4.7}
          changeLabel="vs last month"
          trend="up"
          icon={<Target className="h-4 w-4" />}
        />
        <KPICard
          title="Data Volume"
          value={847}
          change={22.8}
          changeLabel="GB processed"
          trend="up"
          icon={<Database className="h-4 w-4" />}
        />
        <KPICard
          title="ROI from Analytics"
          value={340}
          format="percentage"
          change={45.2}
          changeLabel="vs investment"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
