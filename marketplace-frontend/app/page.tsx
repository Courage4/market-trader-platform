"use client"

// Import landing page components
import HeroSection from "@/components/landing/hero-section"
import StatsSection from "@/components/landing/stats-section"
import FeaturedProductsSection from "@/components/landing/featured-products-section"
import FeaturesSection from "@/components/landing/features-section"
import TestimonialsSection from "@/components/landing/testimonials-section"
import CTASection from "@/components/landing/cta-section"
import Footer from "@/components/landing/footer"

export default function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <HeroSection />
      <StatsSection />
      <FeaturedProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
