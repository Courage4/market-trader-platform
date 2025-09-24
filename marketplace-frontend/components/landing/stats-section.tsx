"use client"

import { ShoppingCart, Store, Users, MapPin } from "lucide-react"

const stats = [
  { label: "Active Vendors", value: "2,500+", icon: Store },
  { label: "Happy Customers", value: "15,000+", icon: Users },
  { label: "Daily Orders", value: "1,200+", icon: ShoppingCart },
  { label: "Cities Covered", value: "25+", icon: MapPin },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container-modern">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl mb-4 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300 group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}