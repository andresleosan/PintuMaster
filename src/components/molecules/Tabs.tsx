import React, { useState } from 'react'

export interface TabItem {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  items: TabItem[]
  defaultActive?: string
  onTabChange: (tabId: string) => void
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActive = items[0]?.id,
  onTabChange,
}) => {
  const [active, setActive] = useState(defaultActive)

  const handleTabClick = (id: string) => {
    setActive(id)
    onTabChange(id)
  }

  return (
    <div className="flex gap-3 border-b border-gray-200 overflow-x-auto pb-4 mb-6">
      {items.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            active === tab.id
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-primary'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 text-xs font-semibold`}>({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  )
}

export default Tabs
