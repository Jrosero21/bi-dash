"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import {
  Home,
  Building2,
  TrendingUp,
  Calculator,
  Server,
  Settings,
  BarChart3,
  Brain,
  Handshake,
  Filter,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "~/lib/utils"

const departments = [
  { id: "executive", name: "Executive", icon: Building2 },
  { id: "sales", name: "Sales", icon: TrendingUp },
  { id: "accounting", name: "Accounting", icon: Calculator },
  { id: "it", name: "IT", icon: Server },
  { id: "operations", name: "Operations", icon: Settings },
  { id: "business", name: "Business", icon: BarChart3 },
  { id: "intelligence", name: "Intelligence", icon: Brain },
  { id: "vendor-relations", name: "Vendor Relations", icon: Handshake },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  department: string
}

export function DashboardLayout({ children, title, description, department }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600/10 via-teal-500/5 to-blue-500/10 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-600/10 supports-[backdrop-filter]:via-teal-500/5 supports-[backdrop-filter]:to-blue-500/10">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="h-4 w-4" />
              <span>Back to Overview</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold font-sans">{title}</h1>
              {description && <p className="text-sm text-muted-foreground font-serif">{description}</p>}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "sticky top-16 h-[calc(100vh-4rem)] border-r bg-sidebar transition-all duration-300",
            sidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <div className="flex h-full flex-col">
            <div className="p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full justify-start"
              >
                <Filter className="h-4 w-4" />
                {!sidebarCollapsed && <span className="ml-2">Departments</span>}
              </Button>
            </div>

            <nav className="flex-1 space-y-1 p-2">
              {departments.map((dept) => {
                const IconComponent = dept.icon
                const isActive = pathname.includes(dept.id)

                return (
                  <Button
                    key={dept.id}
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => router.push(`/dashboard/${dept.id}`)}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    {!sidebarCollapsed && <span className="ml-2">{dept.name}</span>}
                  </Button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 pb-12 space-y-6">{children}</main>
      </div>
    </div>
  )
}
