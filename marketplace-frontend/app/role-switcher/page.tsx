"use client"

import RoleSwitcher from "@/components/role-switcher"

export default function RoleSwitcherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gradient mb-6">Ghana Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive marketplace platform connecting buyers and vendors across Ghana's major markets
            </p>
          </div>
          
          <RoleSwitcher />
          
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              This is a demo interface. In production, user roles would be determined by authentication and authorization systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}