"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"

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

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50 to-white">
      <div className="container-modern">
        <div className="text-center mb-16">
          <Badge className="badge-primary mb-4">
            <Heart className="w-3 h-3 mr-1" />
            Customer Stories
          </Badge>
          <h2 className="text-4xl font-bold mb-6">
            What Our <span className="text-gradient">Community</span> Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-interactive">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 border-2 border-emerald-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-emerald-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}