// Root App Layout (Next.js App Router)

import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "~/styles/globals.css"

import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

export const metadata: Metadata = {
  title: "KPI Dashboard",
  description: "Business Intelligence dashboards with live KPIs, charts, and reports.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${manrope.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-dvh">
            <Sidebar />

            {/* Full-bleed background behind the entire main area (touches header + sidebar edges) */}
            <main className="relative flex-1">
              <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-spotlight" />
                <div className="absolute inset-0 bg-grid" />
                <div className="absolute inset-0 bg-noise" />
                <div className="absolute inset-0 bg-vignette" />
              </div>

              <Header />

              {/* Content container */}
              <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 pb-10">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
