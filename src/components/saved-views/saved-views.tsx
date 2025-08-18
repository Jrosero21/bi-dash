"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BookmarkPlus, Link2, Trash2, Bookmark, ChevronDown } from "lucide-react"

type SavedView = {
  id: string
  name: string
  url: string
  createdAt: number
}

const STORAGE_KEY = "bi.savedViews"

function loadSaved(): SavedView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedView[]) : []
  } catch {
    return []
  }
}
function saveAll(list: SavedView[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function SavedViews() {
  const router = useRouter()
  const pathname = usePathname()
  const sp = useSearchParams()

  const [open, setOpen] = React.useState(false)
  const [views, setViews] = React.useState<SavedView[]>([])
  const [name, setName] = React.useState("")

  // hydrate from localStorage
  React.useEffect(() => {
    setViews(loadSaved())
  }, [])

  const currentUrl = React.useMemo(() => {
    const qs = sp.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }, [pathname, sp])

  const onSave = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim() || "Saved view"
    const next: SavedView = {
      id: crypto.randomUUID(),
      name: trimmed,
      url: currentUrl,
      createdAt: Date.now(),
    }
    const list = [...views, next]
    setViews(list)
    saveAll(list)
    setName("")
  }

  const onOpen = (url: string) => router.push(url)
  const onCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // best effort
    }
  }
  const onDelete = (id: string) => {
    const list = views.filter(v => v.id !== id)
    setViews(list)
    saveAll(list)
  }

  return (
    <details
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="relative group"
    >
      <summary
        className="inline-flex select-none items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm hover:bg-card cursor-pointer"
        aria-label="Saved views"
      >
        <Bookmark className="h-4 w-4" />
        <span className="hidden md:inline">Views</span>
        <ChevronDown className="h-4 w-4 opacity-70" />
      </summary>

      <div
        className="absolute right-0 mt-2 w-80 rounded-xl border bg-card/95 p-3 shadow-xl supports-[backdrop-filter]:backdrop-blur z-40"
        role="menu"
        aria-label="Saved views menu"
      >
        {/* Save current */}
        <form onSubmit={onSave} className="flex items-center gap-2">
          <input
            placeholder="Name this view (e.g., NA · 90D)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-sm hover:bg-card"
            title="Save current view"
          >
            <BookmarkPlus className="h-4 w-4" />
            Save
          </button>
        </form>

        {/* List */}
        <div className="mt-3 max-h-72 overflow-auto rounded-md border bg-background/60">
          {views.length === 0 ? (
            <div className="p-3 text-xs text-muted-foreground">
              No saved views yet. Use the field above to save the current filters.
            </div>
          ) : (
            <ul className="divide-y">
              {views
                .slice()
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((v) => (
                  <li key={v.id} className="flex items-center justify-between gap-2 px-3 py-2">
                    <button
                      onClick={() => onOpen(v.url)}
                      className="truncate text-left hover:underline"
                      title={v.url}
                    >
                      {v.name}
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onCopy(v.url)}
                        className="rounded-md border p-1.5 hover:bg-card"
                        title="Copy link"
                        aria-label="Copy link"
                      >
                        <Link2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(v.id)}
                        className="rounded-md border p-1.5 hover:bg-card"
                        title="Delete"
                        aria-label="Delete saved view"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Current URL preview */}
        <div className="mt-3 rounded-md bg-muted/40 p-2 text-[11px] text-muted-foreground">
          Current view: <code className="break-all">{currentUrl}</code>
        </div>
      </div>
    </details>
  )
}
