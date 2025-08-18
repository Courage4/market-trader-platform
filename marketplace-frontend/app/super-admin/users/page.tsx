"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Search,
  MoreHorizontal,
  UserCheck,
  UserX,
  Ban,
  Shield,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Eye,
  Edit,
} from "lucide-react"

export default function SuperAdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")

  const userStats = [
    {
      title: "Total Users",
      value: "15,847",
      change: "+18% from last month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Vendors",
      value: "3,421",
      change: "+12% from last month",
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Verified Users",
      value: "12,456",
      change: "78.6% verification rate",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "Suspended Accounts",
      value: "89",
      change: "0.56% of total users",
      icon: Ban,
      color: "text-red-600",
    },
  ]

  const users = [
    {
      id: 1,
      name: "John Vendor",
      email: "john.vendor@example.com",
      phone: "+233 24 123 4567",
      role: "vendor",
      status: "active",
      verified: true,
      region: "Greater Accra",
      city: "Accra",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      totalProducts: 24,
      totalSales: 1250,
      rating: 4.8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Buyer",
      email: "sarah.buyer@example.com",
      phone: "+233 20 987 6543",
      role: "buyer",
      status: "active",
      verified: true,
      region: "Ashanti",
      city: "Kumasi",
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
      totalOrders: 45,
      totalSpent: 890,
      rating: 4.6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Michael Admin",
      email: "michael.admin@example.com",
      phone: "+233 24 555 7890",
      role: "admin",
      status: "active",
      verified: true,
      region: "Western",
      city: "Takoradi",
      joinDate: "2023-12-01",
      lastActive: "30 minutes ago",
      managedUsers: 156,
      resolvedComplaints: 89,
      rating: 4.9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Grace Market",
      email: "grace.market@example.com",
      phone: "+233 26 444 3210",
      role: "vendor",
      status: "suspended",
      verified: false,
      region: "Central",
      city: "Cape Coast",
      joinDate: "2024-01-08",
      lastActive: "1 week ago",
      totalProducts: 8,
      totalSales: 120,
      rating: 3.2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Emmanuel Trade",
      email: "emmanuel.trade@example.com",
      phone: "+233 23 888 9999",
      role: "buyer",
      status: "pending",
      verified: false,
      region: "Northern",
      city: "Tamale",
      joinDate: "2024-01-20",
      lastActive: "3 days ago",
      totalOrders: 2,
      totalSpent: 45,
      rating: null,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>
      case "banned":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Banned
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "vendor":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-700">
            Vendor
          </Badge>
        )
      case "buyer":
        return (
          <Badge variant="outline" className="border-green-200 text-green-700">
            Buyer
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="outline" className="border-purple-200 text-purple-700">
            Admin
          </Badge>
        )
      case "super-admin":
        return (
          <Badge variant="outline" className="border-red-200 text-red-700">
            Super Admin
          </Badge>
        )
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRegion = regionFilter === "all" || user.region === regionFilter

    return matchesSearch && matchesRole && matchesStatus && matchesRegion
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage all platform users and their accounts</p>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="vendor">Vendors</SelectItem>
                    <SelectItem value="buyer">Buyers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Greater Accra">Greater Accra</SelectItem>
                    <SelectItem value="Ashanti">Ashanti</SelectItem>
                    <SelectItem value="Western">Western</SelectItem>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="Northern">Northern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
                <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
              </div>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-center py-3 px-4">Role</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-center py-3 px-4">Location</th>
                    <th className="text-center py-3 px-4">Activity</th>
                    <th className="text-center py-3 px-4">Stats</th>
                    <th className="text-center py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{user.name}</span>
                              {user.verified && <UserCheck className="h-4 w-4 text-green-600" />}
                              {user.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-muted-foreground">★ {user.rating}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">{getRoleBadge(user.role)}</td>

                      <td className="py-4 px-4 text-center">{getStatusBadge(user.status)}</td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{user.city}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{user.region}</p>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{user.joinDate}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Last: {user.lastActive}</p>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <div className="space-y-1 text-sm">
                          {user.role === "vendor" && (
                            <>
                              <p>{user.totalProducts} products</p>
                              <p className="text-xs text-muted-foreground">${user.totalSales} sales</p>
                            </>
                          )}
                          {user.role === "buyer" && (
                            <>
                              <p>{user.totalOrders} orders</p>
                              <p className="text-xs text-muted-foreground">${user.totalSpent} spent</p>
                            </>
                          )}
                          {user.role === "admin" && (
                            <>
                              <p>{user.managedUsers} users</p>
                              <p className="text-xs text-muted-foreground">{user.resolvedComplaints} resolved</p>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Profile
                            </DropdownMenuItem>
                            {user.status === "pending" && (
                              <DropdownMenuItem className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Approve User
                              </DropdownMenuItem>
                            )}
                            {user.status === "active" && (
                              <DropdownMenuItem className="text-yellow-600">
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            )}
                            {user.status === "suspended" && (
                              <DropdownMenuItem className="text-green-600">
                                <UserCheck className="mr-2 h-4 w-4" />
                                Reactivate User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
