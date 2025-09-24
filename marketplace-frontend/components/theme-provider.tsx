'use client'

import * as React from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  forcedTheme?: string
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>
}
