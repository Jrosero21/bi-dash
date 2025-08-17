"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default function Breadcrumbs() {
  const pathname = usePathname() || "/"
  const parts = pathname.split("/").filter(Boolean)

  // Don’t duplicate “Home” on the root
  if (parts.length === 0) {
    return (
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li className="font-medium text-foreground">Home</li>
        </ol>
      </nav>
    )
  }

  const links = parts.map((p, idx) => {
    const href = "/" + parts.slice(0, idx + 1).join("/")
    return { label: titleCase(p), href, last: idx === parts.length - 1 }
  })

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground">Home</Link>
        </li>
        <li aria-hidden="true">›</li>
        {links.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {!item.last ? (
              <>
                <Link href={item.href} className="hover:text-foreground">{item.label}</Link>
                <span aria-hidden="true">›</span>
              </>
            ) : (
              <span className="text-foreground font-medium truncate">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
