import { type ZodSchema } from "zod"

export async function getJSON<T>(url: string, schema?: ZodSchema<T>, init?: RequestInit) {
  const res = await fetch(url, { ...init, cache: "no-store" })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (schema) return schema.parse(json)
  return json as T
}
