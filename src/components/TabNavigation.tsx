
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
    <div className="flex space-x-1 mb-6 rounded-t-lg bg-playstore-darker overflow-hidden border-b border-playstore-separator">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "py-3 px-6 font-medium transition-colors rounded-t-lg",
            activeTab === tab.id 
              ? "bg-card text-foreground border-t border-l border-r border-playstore-separator"
              : "text-muted-foreground hover:text-foreground hover:bg-playstore-darker/80"
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
