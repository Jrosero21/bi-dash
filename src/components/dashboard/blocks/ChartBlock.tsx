"use client"

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"

import { ChartContainer } from "../../chart-container"
import type { ChartBlock as ChartBlockType } from "../../../lib/dashboard/types"

export default function ChartBlock({ block }: { block: ChartBlockType }) {
  const colors = (block.colorKeys?.length
    ? block.colorKeys
    : ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"]
  ).map((v) => `hsl(var(${v}))`)

  // Render exactly ONE chart element to satisfy Recharts' TS types
  const chart = (() => {
    switch (block.type) {
      case "line":
        return (
          <LineChart data={block.data}>
            <CartesianGrid strokeDasharray="3 3" />
            {block.xKey && <XAxis dataKey={block.xKey} />}
            <YAxis />
            <Tooltip />
            <Legend />
            {(block.yKeys ?? []).map((k, i) => (
              <Line
                key={k}
                type="monotone"
                dataKey={k}
                stroke={colors[i % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )

      case "bar":
        return (
          <BarChart data={block.data}>
            <CartesianGrid strokeDasharray="3 3" />
            {block.xKey && <XAxis dataKey={block.xKey} />}
            <YAxis />
            <Tooltip />
            <Legend />
            {(block.yKeys ?? []).map((k, i) => (
              <Bar key={k} dataKey={k} fill={colors[i % colors.length]} />
            ))}
          </BarChart>
        )

      case "pie":
        return (
          <PieChart>
            <Pie
              data={block.data}
              dataKey={block.valueKey ?? "value"}
              nameKey={block.xKey ?? "name"}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={4}
              label
            >
              {block.data.map((_: any, i: number) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )

      case "scatter":
      default:
        return (
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            {block.xKey && <XAxis dataKey={block.xKey} />}
            {block.yKeys?.[0] && <YAxis dataKey={block.yKeys[0]} />}
            <Tooltip />
            <Legend />
            <Scatter data={block.data} fill={colors[0]} />
          </ScatterChart>
        )
    }
  })()

  return (
    <ChartContainer title={block.title} description={block.description}>
      <ResponsiveContainer width="100%" height={block.height ?? 300}>
        {chart}
      </ResponsiveContainer>
    </ChartContainer>
  )
}
