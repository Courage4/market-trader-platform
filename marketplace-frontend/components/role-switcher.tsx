"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Store, 
  Shield, 
  Crown,
  ArrowRight
} from "lucide-react"

const roles = [
  {
    id: 'buyer',
    name: 'Buyer',
    description: 'Browse products and connect with vendors',
    icon: Users,
    color: 'emerald',
    path: '/buyer/dashboard'
  },
  {
    id: 'vendor',
    name: 'Vendor',
    description: 'Manage products and connect with buyers',
    icon: Store,
    color: 'orange',
    path: '/vendor/dashboard'
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Manage platform users and vendors',
    icon: Shield,
    color: 'blue',
    path: '/admin/dashboard'
  },
  {
    id: 'super-admin',
    name: 'Super Admin',
    description: 'Complete platform control and analytics',
    icon: Crown,
    color: 'purple',
    path: '/super-admin/dashboard'
  }
]

export default function RoleSwitcher() {
  const [selectedRole, setSelectedRole] = useState('buyer')
  const router = useRouter()

  const handleSwitchRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (role) {
      router.push(role.path)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Role Switcher</h2>
        <p className="text-gray-600">Choose your role to access the appropriate dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => {
          const Icon = role.icon
          const isSelected = selectedRole === role.id
          
          return (
            <div
              key={role.id}
              className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                isSelected 
                  ? `border-${role.color}-500 bg-${role.color}-50` 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${role.color}-500 to-${role.color}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{role.name}</h3>
                    <Badge className={`bg-${role.color}-100 text-${role.color}-700 border-${role.color}-200`}>
                      {role.id}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{role.description}</p>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSwitchRole(role.id)
                    }}
                    className={`w-full bg-gradient-to-r from-${role.color}-500 to-${role.color}-600 hover:from-${role.color}-600 hover:to-${role.color}-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5`}
                  >
                    Access Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              
              {isSelected && (
                <div className={`absolute -top-2 -right-2 w-6 h-6 bg-${role.color}-500 rounded-full flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-bold text-gray-900 mb-2">Current Role: {roles.find(r => r.id === selectedRole)?.name}</h4>
        <p className="text-sm text-gray-600">
          Click "Access Dashboard" to switch to the {roles.find(r => r.id === selectedRole)?.name.toLowerCase()} interface with role-specific navigation and features.
        </p>
      </div>
    </div>
  )
}