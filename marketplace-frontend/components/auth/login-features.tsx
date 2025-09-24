"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Globe, Users } from "lucide-react"
import { features } from "./login-data"

export default function LoginFeatures() {
  const iconMap = {
    Globe: Globe,
    Users: Users,
  }

  return (
    <div className="hidden lg:block">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-purple-100 text-purple-800">
            <Sparkles className="w-3 h-3 mr-1" />
            Modern Platform
          </Badge>
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Empowering
            </span>{" "}
            Local Commerce
          </h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Join thousands of users who trust our platform for their daily market needs
          </p>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-lg"
              >
                <div className="flex-shrink-0 p-3 bg-purple-100 rounded-xl">
                  <IconComponent className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-white shadow-xl">
          <h3 className="font-semibold mb-2">Ready to get started?</h3>
          <p className="text-purple-100 mb-4">Join our growing community today</p>
          <Link href="/register">
            <Button className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg">Create Account</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}