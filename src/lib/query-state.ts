"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function mergeSearchParams(current: URLSearchParams, patch: Record<string, string | null | undefined>) {
  const next = new URLSearchParams(current.toString())
  for (const [k, v] of Object.entries(patch)) {
    if (v == null || v === "") next.delete(k)
    else next.set(k, v)
  }
  return next
}

export function useQueryParam(key: string) {
  const sp = useSearchParams()
  return sp.get(key)
}

export function useSetQuery() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()
  return (patch: Record<string, string | null | undefined>, opts: { scroll?: boolean } = {}) => {
    const next = mergeSearchParams(sp, patch)
    router.replace(`${pathname}?${next.toString()}`, { scroll: opts.scroll ?? false })
  }
}
