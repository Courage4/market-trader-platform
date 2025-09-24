"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { demoAccounts } from "./login-data"

interface DemoAccountsProps {
  onDemoLogin: (account: typeof demoAccounts[0]) => void
}

export default function DemoAccounts({ onDemoLogin }: DemoAccountsProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
          Demo Accounts
        </CardTitle>
        <CardDescription>Try the platform with pre-configured demo accounts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {demoAccounts.map((account, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors cursor-pointer"
            onClick={() => onDemoLogin(account)}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${account.color}`}>
                <account.icon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{account.role}</div>
                <div className="text-sm text-gray-600">{account.description}</div>
              </div>
            </div>
            <Badge className="bg-purple-200 text-purple-800">Try Now</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}