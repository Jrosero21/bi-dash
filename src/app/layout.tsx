// Root App Layout (Next.js App Router)

import type { Metadata } from "next"
import { Geist, Manrope } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "~/styles/globals.css" // <-- robust alias import so path can't break

import Sidebar from "../components/layout/Sidebar"
import Header from "../components/layout/Header"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

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
            <main className="flex-1">
              <Header />
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
