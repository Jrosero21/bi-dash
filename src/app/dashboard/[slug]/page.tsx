import { notFound } from "next/navigation"

// from: src/app/dashboard/[slug]/page.tsx
// to:   src/lib/dashboard/registry.ts          => ../../../lib/dashboard/registry
import { dashboards, dashboardSlugs } from "../../../lib/dashboard/registry"

// from: src/app/dashboard/[slug]/page.tsx
// to:   src/components/dashboard/Renderer.tsx   => ../../../components/dashboard/Renderer
import DashboardRenderer from "../../../components/dashboard/Renderer"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return dashboardSlugs.map((slug) => ({ slug }))
}

export default function DashboardDynamicPage({ params }: Props) {
  const config = dashboards[params.slug]
  if (!config) return notFound()
  return <DashboardRenderer config={config} />
}
