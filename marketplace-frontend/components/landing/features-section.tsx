"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Store, Shield, Zap, Users, Award } from "lucide-react"

const features = [
  {
    icon: Store,
    title: "Local Market Discovery",
    description: "Find fresh products from verified local vendors in your area",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and secure payment processing with buyer protection",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications about orders, deliveries, and promotions",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with local traders and build lasting relationships",
    color: "from-emerald-600 to-teal-600",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="container-modern">
        <div className="text-center mb-16">
          <Badge className="badge-primary mb-4">
            <Award className="w-3 h-3 mr-1" />
            Why Choose Us
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-gradient">Powerful Features</span> for Modern Trading
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of local commerce with our comprehensive platform designed for both buyers and
            vendors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-interactive group">
              <CardHeader className="text-center pb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2 text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}