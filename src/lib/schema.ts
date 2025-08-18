import { z } from "zod"

export const RevenuePoint = z.object({
  month: z.string(),
  revenue: z.number(),
  profit: z.number(),
  expenses: z.number(),
})

export const Vendor = z.object({
  name: z.string(),
  spend: z.number(),
  performance: z.number(),
  risk: z.enum(["Low", "Medium", "High"]),
})

export const MetricsResponse = z.object({
  kpis: z.object({
    revenueYTD: z.number(),
    activeCustomers: z.number(),
    grossMargin: z.number(),
    nps: z.number(),
    delta: z.object({
      revenueYTD: z.number(),
      activeCustomers: z.number(),
      grossMargin: z.number(),
      nps: z.number(),
    }),
  }),
  series: z.object({
    revenue: z.array(RevenuePoint),
  }),
  vendors: z.array(Vendor),
  generatedAt: z.string(),
})

export type TMetricsResponse = z.infer<typeof MetricsResponse>
export type TVendor = z.infer<typeof Vendor>
export type TRevenuePoint = z.infer<typeof RevenuePoint>
