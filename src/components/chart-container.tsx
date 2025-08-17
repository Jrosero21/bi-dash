import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { MoreHorizontal, Download, Maximize2 } from "lucide-react"
import { cn } from "~/lib/utils"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  actions?: React.ReactNode
}

export function ChartContainer({ title, description, children, className, actions }: ChartContainerProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold font-sans">{title}</CardTitle>
          {description && <CardDescription className="font-serif">{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-1">
          {actions}
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
}
