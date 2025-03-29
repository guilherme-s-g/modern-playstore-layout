
import React from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="border-b border-border mb-6">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "tab-button",
              activeTab === tab.id ? "active" : ""
            )}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
