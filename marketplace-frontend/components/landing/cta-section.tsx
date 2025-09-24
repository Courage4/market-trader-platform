"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
      <div className="container-modern text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join our growing community of buyers and vendors. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/role-switcher">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Dashboards
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/buyer/products">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 bg-transparent shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}