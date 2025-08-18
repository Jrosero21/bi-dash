import { NextResponse } from "next/server"

// Simple seeded PRNG so numbers are stable across a day
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export async function GET() {
  const d = new Date()
  const seed = Number(
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`
  )
  const rnd = mulberry32(seed)

  const revenueYTD = Math.round(10_000_000 + rnd() * 8_000_000)
  const activeCustomers = Math.round(5_000 + rnd() * 2_500)
  const grossMargin = Math.round(56 + rnd() * 14) // 56–70%
  const nps = Math.round(35 + rnd() * 20) // 35–55

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const revenueSeries = months.map((m, i) => {
    const base = 1_800_000 + i * 120_000
    const noise = (rnd() - 0.5) * 180_000
    const revenue = Math.max(900_000, Math.round(base + noise))
    const profit = Math.round(revenue * (0.18 + rnd() * 0.08))
    const expenses = revenue - profit
    return { month: m, revenue, profit, expenses }
  })

  const topVendors = Array.from({ length: 6 }).map((_, i) => {
    const spend = Math.round(600_000 + rnd() * 2_000_000)
    const performance = Math.round(85 + rnd() * 12)
    const risk = (["Low", "Medium", "High"] as const)[Math.min(2, Math.floor(rnd() * 3))]
    return { name: `Vendor ${i + 1}`, spend, performance, risk }
  })

  return NextResponse.json({
    kpis: {
      revenueYTD,
      activeCustomers,
      grossMargin,
      nps,
      delta: {
        revenueYTD: +(rnd() * 8 - 4).toFixed(1),
        activeCustomers: +(rnd() * 6 - 3).toFixed(1),
        grossMargin: +(rnd() * 3 - 1.5).toFixed(1),
        nps: +(rnd() * 6 - 3).toFixed(1),
      },
    },
    series: {
      revenue: revenueSeries,
    },
    vendors: topVendors,
    generatedAt: new Date().toISOString(),
  })
}
