"use client"

import React from "react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

type SavedView = { id: string; name: string; path: string; params: string; createdAt: number }
const STORAGE_KEY = "bi_saved_views_v1"

function loadAll(): SavedView[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as SavedView[] : [] }
  catch { return [] }
}
function saveAll(list: SavedView[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) }

export default function SavedViews() {
  const pathname = usePathname()
  const sp = useSearchParams()
  const router = useRouter()
  const [views, setViews] = React.useState<SavedView[]>([])

  React.useEffect(() => { setViews(loadAll()) }, [])

  const pageViews = views.filter(v => v.path === pathname)

  function saveView() {
    const name = window.prompt("Name this view:")
    if (!name) return
    const next: SavedView = {
      id: crypto.randomUUID(),
      name,
      path: pathname,
      params: sp.toString(),
      createdAt: Date.now(),
    }
    const all = [next, ...views]
    setViews(all); saveAll(all)
  }

  function loadView(v: SavedView) { router.replace(`${v.path}?${v.params}`) }
  function deleteView(id: string) { const all = views.filter(v => v.id !== id); setViews(all); saveAll(all) }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={saveView}
        className="inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-sm hover:bg-secondary"
      >
        Save View
      </button>

      <details className="rounded-xl border px-3 h-9 flex items-center">
        <summary className="cursor-pointer list-none select-none text-sm">My Views</summary>
        <div className="mt-2 p-2 bg-card border rounded-xl shadow-sm min-w-56">
          {pageViews.length === 0 ? (
            <div className="text-sm text-muted-foreground px-1 py-2">No saved views yet.</div>
          ) : (
            <ul className="space-y-1">
              {pageViews.map(v => (
                <li key={v.id} className="flex items-center justify-between gap-2">
                  <button
                    className="text-sm hover:underline text-left"
                    onClick={() => loadView(v)}
                    title={new Date(v.createdAt).toLocaleString()}
                  >
                    {v.name}
                  </button>
                  <button
                    className="text-[11px] text-muted-foreground hover:text-foreground"
                    onClick={() => deleteView(v.id)}
                    aria-label={`Delete ${v.name}`}
                    title="Delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </details>
    </div>
  )
}
