// src/app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Manrope } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "next-themes"
import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "KPI Dashboard",
  description: "Modern business intelligence dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="hidden md:block shrink-0 w-64 border-r bg-sidebar">
              <Sidebar />
            </aside>

            {/* Main column */}
            <div className="flex-1 flex min-w-0">
              <div className="relative flex-1 min-w-0">
                {/* Sticky header */}
                <div className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 h-14 flex items-center">
                    <Header />
                  </div>
                </div>

                {/* Page content */}
                <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
