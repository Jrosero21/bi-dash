import { notFound } from "next/navigation"
import { dashboards, dashboardSlugs } from "../../../lib/dashboard/registry"
import DashboardRenderer from "../../../components/dashboard/Renderer"

type Props = { params: { slug: string } }

// pre-generate known slugs
export function generateStaticParams() {
  return dashboardSlugs.map((slug) => ({ slug }))
}

export default function DashboardDynamicPage({ params }: Props) {
  const config = dashboards[params.slug]
  if (!config) return notFound()
  return <DashboardRenderer config={config} />
}
