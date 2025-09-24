/**
 * Auth utilities for role-based access control
 */

export type UserRole = 'buyer' | 'vendor' | 'admin' | 'super-admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

/**
 * Get user role from pathname
 * This is a simple implementation - in a real app, you'd get this from auth context/API
 */
export function getUserRoleFromPath(pathname: string): UserRole {
  if (pathname.startsWith('/super-admin')) return 'super-admin'
  if (pathname.startsWith('/admin')) return 'admin'
  if (pathname.startsWith('/vendor')) return 'vendor'
  if (pathname.startsWith('/buyer')) return 'buyer'
  
  // Default to buyer for home page and other routes
  return 'buyer'
}

/**
 * Get mock user data based on role
 * In a real app, this would come from your auth context/API
 */
export function getMockUser(role: UserRole): User {
  const baseUser = {
    id: '1',
    email: 'user@example.com',
    avatar: '/placeholder-user.jpg'
  }

  switch (role) {
    case 'buyer':
      return {
        ...baseUser,
        name: 'John Doe',
        role: 'buyer'
      }
    case 'vendor':
      return {
        ...baseUser,
        name: 'Sarah Market',
        role: 'vendor'
      }
    case 'admin':
      return {
        ...baseUser,
        name: 'Admin User',
        role: 'admin'
      }
    case 'super-admin':
      return {
        ...baseUser,
        name: 'Super Admin',
        role: 'super-admin'
      }
    default:
      return {
        ...baseUser,
        name: 'User',
        role: 'buyer'
      }
  }
}

/**
 * Check if user has permission for a route
 */
export function hasPermission(userRole: UserRole, pathname: string): boolean {
  const pathRole = getUserRoleFromPath(pathname)
  
  // Super admin can access everything
  if (userRole === 'super-admin') return true
  
  // Admin can access admin and below
  if (userRole === 'admin' && (pathRole === 'admin' || pathRole === 'vendor' || pathRole === 'buyer')) return true
  
  // Vendor can access vendor and buyer routes
  if (userRole === 'vendor' && (pathRole === 'vendor' || pathRole === 'buyer')) return true
  
  // Buyer can only access buyer routes
  if (userRole === 'buyer' && pathRole === 'buyer') return true
  
  return false
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'buyer': return 'Buyer'
    case 'vendor': return 'Vendor'
    case 'admin': return 'Admin'
    case 'super-admin': return 'Super Admin'
    default: return 'User'
  }
}

/**
 * Get role-specific color theme
 */
export function getRoleTheme(role: UserRole) {
  switch (role) {
    case 'buyer':
      return {
        primary: 'emerald',
        primaryHex: '#10b981',
        gradient: 'from-emerald-500 to-emerald-600'
      }
    case 'vendor':
      return {
        primary: 'orange',
        primaryHex: '#f97316',
        gradient: 'from-orange-500 to-orange-600'
      }
    case 'admin':
      return {
        primary: 'blue',
        primaryHex: '#3b82f6',
        gradient: 'from-blue-500 to-blue-600'
      }
    case 'super-admin':
      return {
        primary: 'purple',
        primaryHex: '#8b5cf6',
        gradient: 'from-purple-500 to-purple-600'
      }
    default:
      return {
        primary: 'gray',
        primaryHex: '#6b7280',
        gradient: 'from-gray-500 to-gray-600'
      }
  }
}