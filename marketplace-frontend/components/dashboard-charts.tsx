"use client"

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Activity
} from "lucide-react"

interface ChartCardProps {
  title: string
  subtitle?: string
  value?: string
  children: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

function ChartCard({ title, subtitle, value, children, icon: Icon }: ChartCardProps) {
  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </div>
      
      {value && (
        <div className="mb-4">
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      )}
      
      <div className="h-64">
        {children}
      </div>
    </div>
  )
}

// Simple line chart component (placeholder for real chart library)
function SimpleLineChart() {
  const data = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 6500 },
  ]

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  return (
    <div className="w-full h-full flex items-end justify-between px-2 pb-4">
      {data.map((point, index) => {
        const height = ((point.value - minValue) / range) * 100
        return (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div 
              className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
              style={{ height: `${Math.max(height, 5)}%` }}
            ></div>
            <span className="text-xs text-slate-500 font-medium">{point.month}</span>
          </div>
        )
      })}
    </div>
  )
}

// Simple bar chart component
function SimpleBarChart() {
  const data = [
    { label: 'Users', value: 32984, color: 'bg-blue-500' },
    { label: 'Clicks', value: 2420000, color: 'bg-emerald-500' },
    { label: 'Sales', value: 2400, color: 'bg-amber-500' },
    { label: 'Items', value: 320, color: 'bg-red-500' },
  ]

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {item.value > 1000000 
                ? `${(item.value / 1000000).toFixed(1)}m`
                : item.value > 1000 
                ? `${(item.value / 1000).toFixed(1)}k`
                : item.value
              }
            </div>
            <div className="text-sm text-slate-600">{item.label}</div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const width = (item.value / maxValue) * 100
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-slate-900">
                  {item.value > 1000000 
                    ? `${(item.value / 1000000).toFixed(1)}m`
                    : item.value > 1000 
                    ? `${(item.value / 1000).toFixed(1)}k`
                    : item.value
                  }
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${width}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Projects list component
function ProjectsList() {
  const projects = [
    { name: 'Website Redesign', progress: 80, status: 'In Progress' },
    { name: 'Mobile App', progress: 60, status: 'In Progress' },
    { name: 'API Integration', progress: 100, status: 'Completed' },
    { name: 'Database Migration', progress: 40, status: 'In Progress' },
    { name: 'Testing Phase', progress: 20, status: 'Pending' },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-slate-900">30</p>
        <p className="text-sm text-slate-600">done this month</p>
      </div>
      
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-900">{project.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                project.status === 'Completed' 
                  ? 'bg-emerald-100 text-emerald-700'
                  : project.status === 'In Progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Orders overview component
function OrdersOverview() {
  const orders = [
    { id: '#1234', amount: '$245.00', status: 'Completed', date: '2 hours ago' },
    { id: '#1235', amount: '$89.50', status: 'Processing', date: '4 hours ago' },
    { id: '#1236', amount: '$156.75', status: 'Pending', date: '6 hours ago' },
    { id: '#1237', amount: '$78.90', status: 'Completed', date: '8 hours ago' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-900">+30%</p>
          <p className="text-sm text-slate-600">this month</p>
        </div>
        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-slate-900">{order.id}</p>
              <p className="text-xs text-slate-500">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">{order.amount}</p>
              <span className={`text-xs px-2 py-1 rounded-full ${
                order.status === 'Completed' 
                  ? 'bg-emerald-100 text-emerald-700'
                  : order.status === 'Processing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Sales Overview */}
      <div className="lg:col-span-2">
        <ChartCard 
          title="Sales overview" 
          icon={BarChart3}
        >
          <SimpleLineChart />
        </ChartCard>
      </div>

      {/* Active Users */}
      <ChartCard 
        title="Active Users" 
        icon={Users}
      >
        <SimpleBarChart />
      </ChartCard>

      {/* Projects */}
      <ChartCard 
        title="Projects" 
        icon={Activity}
      >
        <ProjectsList />
      </ChartCard>

      {/* Orders Overview */}
      <ChartCard 
        title="Orders overview" 
        icon={ShoppingCart}
      >
        <OrdersOverview />
      </ChartCard>
    </div>
  )
}

export { ChartCard, SimpleLineChart, SimpleBarChart }