"use client"

import { DollarSign, Users, TrendingUp, TrendingDown, LineChart, SmilePlus } from "lucide-react"

type Card = {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: string
  delta: number // >= 0 => green, < 0 => red
  note: string
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export default function GlobalKpis() {
  const cards: Card[] = [
    {
      title: "Revenue YTD",
      icon: DollarSign,
      value: formatCurrency(12_450_000),
      delta: 8.4,
      note: "vs last YTD",
    },
    {
      title: "Active Customers",
      icon: Users,
      value: new Intl.NumberFormat("en-US").format(5_870),
      delta: -4.1,
      note: "last 30 days",
    },
    {
      title: "Gross Margin",
      icon: LineChart,
      value: "61.8%",
      delta: 1.2,
      note: "vs last quarter",
    },
    {
      title: "NPS",
      icon: SmilePlus,
      value: "47",
      delta: 0, // treat as non-negative (green)
      note: "new survey",
    },
  ]

  const deltaClass = (n: number) =>
    n < 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"

  const Arrow = ({ n }: { n: number }) =>
    n < 0 ? (
      <TrendingDown className="h-3.5 w-3.5" />
    ) : (
      <TrendingUp className="h-3.5 w-3.5" />
    )

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, icon: Icon, value, delta, note }) => (
        <article
          key={title}
          className="rounded-2xl border bg-card/80 p-5 ring-1 ring-inset ring-[hsl(var(--ring)/0.06)] supports-[backdrop-filter]:backdrop-blur"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">{title}</h3>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>

              <div className={`mt-1 flex items-center gap-1.5 text-xs ${deltaClass(delta)}`}>
                {/* Icons inherit currentColor to match red/green */}
                <Arrow n={delta} />
                <span>{Math.abs(delta).toFixed(1)}%</span>
                <span className="text-muted-foreground"> {note}</span>
              </div>
            </div>

            <div className="rounded-xl border bg-secondary text-secondary-foreground p-2">
              <Icon className="h-4 w-4 text-[hsl(var(--chart-1))]" />
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
