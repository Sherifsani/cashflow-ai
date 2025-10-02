"use client"

import Link from 'next/link'
import { FiPlus, FiUpload, FiMessageCircle, FiBarChart } from 'react-icons/fi'

export default function QuickActionsGrid() {
  const actions = [
    {
      href: "/dashboard/add-transaction",
      icon: FiPlus,
      title: "Add Transaction",
      description: "Record income or expense",
      bgColor: "bg-primary/10",
      hoverColor: "group-hover:bg-primary/20",
      iconColor: "text-primary"
    },
    {
      href: "/dashboard/upload",
      icon: FiUpload,
      title: "Upload Data",
      description: "Bank statements & files",
      bgColor: "bg-blue-50",
      hoverColor: "group-hover:bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      href: "/dashboard/chat",
      icon: FiMessageCircle,
      title: "AI Assistant",
      description: "Chat with Co-Pilot",
      bgColor: "bg-green-50",
      hoverColor: "group-hover:bg-green-100",
      iconColor: "text-green-600"
    },
    {
      href: "/dashboard/reports",
      icon: FiBarChart,
      title: "View Reports",
      description: "Analytics & insights",
      bgColor: "bg-purple-50",
      hoverColor: "group-hover:bg-purple-100",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action) => {
        const IconComponent = action.icon
        return (
          <Link 
            key={action.href}
            href={action.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className={`p-3 ${action.bgColor} rounded-lg ${action.hoverColor} transition-colors`}>
                <IconComponent className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}