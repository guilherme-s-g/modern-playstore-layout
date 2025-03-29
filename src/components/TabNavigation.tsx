
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
    <div className="flex space-x-1 mb-6 rounded-t-lg overflow-hidden border-b border-playstore-separator">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "py-3 px-6 font-medium transition-all duration-150 rounded-t-lg relative",
            activeTab === tab.id 
              ? "bg-card text-foreground border-t border-l border-r border-playstore-separator after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-playstore-blue"
              : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/50"
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
