export interface SystemSetting {
  id: string
  name: string
  description: string
  value: string | number | boolean
  type: "text" | "number" | "boolean" | "select"
  category: string
  options?: string[]
  min?: number
  max?: number
}

export interface ServerHealth {
  name: string
  status: "healthy" | "warning" | "critical"
  uptime: string
  responseTime: string
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
}

export interface DatabaseHealth {
  name: string
  status: "healthy" | "warning" | "critical"
  connections: number
  maxConnections: number
  responseTime: string
  queryCount: number
}

export interface SecurityAlert {
  id: number
  type: "suspicious_login" | "failed_auth" | "data_breach" | "unauthorized_access"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: string
  source: string
  resolved: boolean
}

export const systemSettings: SystemSetting[] = [
  {
    id: "platform_name",
    name: "Platform Name",
    description: "The name displayed across the platform",
    value: "AgriMarket Pro",
    type: "text",
    category: "General",
  },
  {
    id: "max_file_size",
    name: "Max File Upload Size (MB)",
    description: "Maximum allowed file size for uploads",
    value: 10,
    type: "number",
    category: "Uploads",
    min: 1,
    max: 100,
  },
  {
    id: "enable_registration",
    name: "Enable User Registration",
    description: "Allow new users to register accounts",
    value: true,
    type: "boolean",
    category: "Authentication",
  },
  {
    id: "session_timeout",
    name: "Session Timeout (minutes)",
    description: "How long users stay logged in without activity",
    value: 30,
    type: "number",
    category: "Security",
    min: 5,
    max: 480,
  },
  {
    id: "email_notifications",
    name: "Email Notifications",
    description: "Send email notifications to users",
    value: true,
    type: "boolean",
    category: "Notifications",
  },
  {
    id: "default_currency",
    name: "Default Currency",
    description: "Default currency for the platform",
    value: "GHS",
    type: "select",
    category: "Payments",
    options: ["GHS", "USD", "EUR", "GBP"],
  },
  {
    id: "maintenance_mode",
    name: "Maintenance Mode",
    description: "Enable maintenance mode to restrict access",
    value: false,
    type: "boolean",
    category: "System",
  },
  {
    id: "auto_backup",
    name: "Automatic Backups",
    description: "Automatically backup data daily",
    value: true,
    type: "boolean",
    category: "Data",
  },
  {
    id: "api_rate_limit",
    name: "API Rate Limit (requests/minute)",
    description: "Maximum API requests per minute per user",
    value: 100,
    type: "number",
    category: "API",
    min: 10,
    max: 1000,
  },
  {
    id: "log_level",
    name: "Log Level",
    description: "Level of detail in system logs",
    value: "INFO",
    type: "select",
    category: "Logging",
    options: ["DEBUG", "INFO", "WARN", "ERROR"],
  },
]

export const serverHealth: ServerHealth[] = [
  {
    name: "Web Server",
    status: "healthy",
    uptime: "99.9%",
    responseTime: "45ms",
    cpuUsage: 35,
    memoryUsage: 68,
    diskUsage: 42,
  },
  {
    name: "API Server",
    status: "healthy",
    uptime: "99.8%",
    responseTime: "120ms",
    cpuUsage: 28,
    memoryUsage: 45,
    diskUsage: 38,
  },
  {
    name: "File Server",
    status: "warning",
    uptime: "99.5%",
    responseTime: "200ms",
    cpuUsage: 85,
    memoryUsage: 92,
    diskUsage: 88,
  },
  {
    name: "Cache Server",
    status: "healthy",
    uptime: "99.9%",
    responseTime: "8ms",
    cpuUsage: 15,
    memoryUsage: 32,
    diskUsage: 25,
  },
]

export const databaseHealth: DatabaseHealth[] = [
  {
    name: "Primary Database",
    status: "healthy",
    connections: 45,
    maxConnections: 100,
    responseTime: "12ms",
    queryCount: 15420,
  },
  {
    name: "Analytics DB",
    status: "healthy",
    connections: 12,
    maxConnections: 50,
    responseTime: "25ms",
    queryCount: 8920,
  },
  {
    name: "Cache Database",
    status: "warning",
    connections: 85,
    maxConnections: 100,
    responseTime: "45ms",
    queryCount: 45630,
  },
]

export const securityAlerts: SecurityAlert[] = [
  {
    id: 1,
    type: "suspicious_login",
    severity: "medium",
    title: "Multiple Failed Login Attempts",
    description: "User 'john.vendor@example.com' has 5 failed login attempts from IP 192.168.1.100",
    timestamp: "2 hours ago",
    source: "192.168.1.100",
    resolved: false,
  },
  {
    id: 2,
    type: "failed_auth",
    severity: "low",
    title: "API Authentication Failure",
    description: "Invalid API key used for endpoint /api/products",
    timestamp: "4 hours ago",
    source: "API Gateway",
    resolved: true,
  },
  {
    id: 3,
    type: "unauthorized_access",
    severity: "high",
    title: "Unauthorized Admin Panel Access",
    description: "Non-admin user attempted to access admin dashboard",
    timestamp: "6 hours ago",
    source: "Web Application",
    resolved: false,
  },
  {
    id: 4,
    type: "data_breach",
    severity: "critical",
    title: "Suspicious Data Export",
    description: "Large user data export requested by user ID 1234",
    timestamp: "1 day ago",
    source: "Data Export Service",
    resolved: false,
  },
]