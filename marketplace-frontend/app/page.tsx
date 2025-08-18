"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import {
  ShoppingCart,
  Store,
  Users,
  MapPin,
  Star,
  Search,
  Shield,
  Zap,
  Heart,
  ChevronRight,
  Sparkles,
  Globe,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"

const features = [
  {
    icon: Store,
    title: "Local Market Discovery",
    description: "Find fresh products from verified local vendors in your area",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure payment processing with buyer protection",
    color: "from-purple-600 to-purple-700",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications about orders, deliveries, and promotions",
    color: "from-purple-400 to-purple-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with local traders and build lasting relationships",
    color: "from-purple-500 to-purple-600",
  },
]

const stats = [
  { label: "Active Vendors", value: "2,500+", icon: Store },
  { label: "Happy Customers", value: "15,000+", icon: Users },
  { label: "Daily Orders", value: "1,200+", icon: ShoppingCart },
  { label: "Cities Covered", value: "25+", icon: MapPin },
]

const testimonials = [
  {
    name: "Akosua Mensah",
    role: "Local Buyer",
    content: "This platform has revolutionized how I shop for fresh produce. The quality is amazing!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Kwame Asante",
    role: "Market Vendor",
    content: "My sales have increased by 300% since joining. The platform is user-friendly and effective.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ama Osei",
    role: "Regular Customer",
    content: "Fast delivery, fresh products, and excellent customer service. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const popularProducts = [
  {
    name: "Fresh Tomatoes",
    price: "GHS 8.50",
    vendor: "Kumasi Central Market",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Popular",
  },
  {
    name: "Organic Plantain",
    price: "GHS 12.00",
    vendor: "Accra Market Hub",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Organic",
  },
  {
    name: "Fresh Fish",
    price: "GHS 25.00",
    vendor: "Tema Fish Market",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Fresh",
  },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-purple-400/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="space-y-4">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">
                  <Sparkles className="w-3 h-3 mr-1" />
                  New Platform Launch
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="gradient-text">Connect</span> with Local{" "}
                  <span className="gradient-text">Markets</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Discover fresh products from verified local vendors, support your community, and enjoy seamless
                  shopping experiences across Ghana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="btn-primary group">
                    Start Shopping
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <Input
                  placeholder="Search for products, vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-modern"
                />
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-purple-100">
                  <div className="grid grid-cols-2 gap-4">
                    {popularProducts.map((product, index) => (
                      <Card key={index} className="modern-card hover:scale-105 transition-transform duration-300">
                        <CardContent className="p-4">
                          <div className="aspect-square bg-purple-50 rounded-xl mb-3 flex items-center justify-center">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-purple-100 text-purple-800 text-xs">{product.badge}</Badge>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 fill-purple-400 text-purple-400" />
                                <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                              </div>
                            </div>
                            <h4 className="font-semibold text-sm">{product.name}</h4>
                            <p className="text-purple-600 font-bold text-sm">{product.price}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4 group-hover:bg-purple-200 transition-colors">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">
              <Award className="w-3 h-3 mr-1" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span> for Modern Trading
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of local commerce with our comprehensive platform designed for both buyers and
              vendors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="modern-card group hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">
              <Heart className="w-3 h-3 mr-1" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl font-bold mb-6">
              What Our <span className="gradient-text">Community</span> Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their shopping experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="modern-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-purple-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Shopping Experience?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join our growing community of buyers and vendors. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  Get Started Now
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold gradient-text">MarketPlace Ghana</h3>
              <p className="text-gray-400">
                Connecting local markets with modern technology for a better shopping experience.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Globe className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-300">For Vendors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/vendor/register" className="hover:text-white transition-colors">
                    Become a Vendor
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/dashboard" className="hover:text-white transition-colors">
                    Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/support" className="hover:text-white transition-colors">
                    Vendor Support
                  </Link>
                </li>
                <li>
                  <Link href="/vendor/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +233 24 123 4567
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@marketplaceghana.com
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Accra, Ghana
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MarketPlace Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
