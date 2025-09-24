"use client"

import DashboardLayout from "./dashboard-layout"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function PageLayout({ children, title, subtitle, actions }: PageLayoutProps) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        {(title || subtitle || actions) && (
          <div className="flex items-center justify-between">
            <div>
              {title && <h1 className="text-2xl font-bold text-slate-900">{title}</h1>}
              {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-3">{actions}</div>}
          </div>
        )}
        
        {/* Page Content */}
        {children}
      </div>
    </DashboardLayout>
  )
}