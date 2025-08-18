import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "MarketPlace Ghana - Modern Local Trading Platform",
  description:
    "Connect with local market traders and discover fresh products in your area with our modern, vibrant platform",
  keywords: "marketplace, ghana, local trading, fresh products, vendors, buyers",
  authors: [{ name: "MarketPlace Ghana Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#9333ea",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#9333ea" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  )
}
