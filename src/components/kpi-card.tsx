import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "~/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  trend?: "up" | "down" | "neutral"
  format?: "currency" | "percentage" | "number"
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon,
  className,
  trend,
  format = "number",
}: KPICardProps) {
  const formatValue = (val: string | number) => {
    if (format === "currency") {
      return typeof val === "number" ? `$${val.toLocaleString()}` : val
    }
    if (format === "percentage") {
      return typeof val === "number" ? `${val}%` : val
    }
    return typeof val === "number" ? val.toLocaleString() : val
  }

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-3 w-3" />
    if (trend === "down") return <TrendingDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const getTrendColor = () => {
    if (trend === "up") return "text-chart-3"
    if (trend === "down") return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-sans">{formatValue(value)}</div>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(change)}%</span>
            {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
