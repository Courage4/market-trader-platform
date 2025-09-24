"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  MoreHorizontal,
  UserCheck,
  UserX,
  Ban,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Eye,
  Edit,
} from "lucide-react"
import { User } from "./users-data"

interface UsersTableProps {
  filteredUsers: User[]
}

export default function UsersTable({ filteredUsers }: UsersTableProps) {
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

  return (
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
  )
}