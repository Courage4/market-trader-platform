"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import UsersHeader from "@/components/super-admin/users-header"
import UsersStats from "@/components/super-admin/users-stats"
import UsersFilters from "@/components/super-admin/users-filters"
import UsersTable from "@/components/super-admin/users-table"
import { users } from "@/components/super-admin/users-data"

export default function SuperAdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")

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
    <DashboardLayout>
      <div className="space-y-8">
        <UsersHeader />
        <UsersStats />
        <UsersFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          regionFilter={regionFilter}
          setRegionFilter={setRegionFilter}
        />
        <UsersTable filteredUsers={filteredUsers} />
      </div>
    </DashboardLayout>
  )
}
