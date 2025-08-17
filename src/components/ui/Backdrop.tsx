"use client"

type Layer = "spotlight" | "grid" | "noise" | "vignette" | "aurora" | "mesh"

export default function Backdrop({
  layers = ["spotlight", "grid", "noise", "vignette"],
  className = "",
}: {
  layers?: Layer[]
  className?: string
}) {
  const has = (l: Layer) => layers.includes(l)

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {has("spotlight") && <div className="absolute inset-0 bg-spotlight" aria-hidden />}
      {has("mesh") && <div className="absolute inset-0 bg-mesh animate-aurora" aria-hidden />}
      {has("aurora") && <div className="absolute inset-0 bg-aurora animate-aurora" aria-hidden />}
      {has("grid") && <div className="absolute inset-0 bg-grid" aria-hidden />}
      {has("noise") && <div className="absolute inset-0 bg-noise" aria-hidden />}
      {has("vignette") && <div className="absolute inset-0 bg-vignette" aria-hidden />}
    </div>
  )
}
