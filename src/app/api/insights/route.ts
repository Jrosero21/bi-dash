import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // read optional query params: ?dept=sales&range=30d
  const { searchParams } = new URL(request.url)
  const dept = (searchParams.get("dept") ?? "company").toLowerCase()
  const range = (searchParams.get("range") ?? "30d").toLowerCase()

  // fake-but-plausible aggregated metrics
  const metrics = {
    revenue: 12_450_000,
    growth: 8.4,
    churn: 1.7,
    margin: 61.8,
    nps: 47,
  }

  const text = generateInsight({ dept, range, ...metrics })
  return NextResponse.json({ text })
}

function generateInsight({
  dept,
  range,
  revenue,
  growth,
  churn,
  margin,
  nps,
}: {
  dept: string
  range: string
  revenue: number
  growth: number
  churn: number
  margin: number
  nps: number
}) {
  const prettyRevenue = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(revenue)

  const dir = growth >= 0 ? "↑" : "↓"
  const risk = churn > 2.5 ? "Watch churn and retention levers." : "Churn remains healthy."

  return `In the last ${range}, ${dept} is tracking ${dir} ${Math.abs(growth).toFixed(
    1
  )}% with ${prettyRevenue} YTD, margin ${margin.toFixed(
    1
  )}%, churn ${churn.toFixed(1)}%, NPS ${nps}. ${risk}`
}
