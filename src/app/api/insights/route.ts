import { NextResponse } from "next/server"

export async function GET() {
  const now = new Date()
  const hour = now.getHours()
  const window = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening"

  // Lightweight, deterministic-ish blurb so demos look “alive”
  const tips = [
    "Revenue growth outpaced quarterly target—consider reallocating spend toward top-performing regions.",
    "Customer activity is trending up; a retention campaign could compound gains.",
    "Gross margin variance narrowed; review vendor terms to lock in improvements.",
    "NPS rose on the latest pulse—double down on the feature areas mentioned in feedback.",
  ]
  const tip = tips[hour % tips.length]

  return NextResponse.json({
    text: `Good ${window}! ${tip}`,
    generatedAt: now.toISOString(),
  })
}
