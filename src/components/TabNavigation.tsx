
import React from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  variant = 'default' 
}: TabNavigationProps) => {
  return (
    <div className={cn(
      "flex mb-6 overflow-x-auto",
      variant === 'default' 
        ? "space-x-1 border-b border-playstore-separator" 
        : "space-x-2 p-1 bg-[#333333] rounded-lg"
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "transition-all duration-150 whitespace-nowrap",
            variant === 'default'
              ? cn(
                  "py-3 px-6 font-medium rounded-t-lg relative",
                  activeTab === tab.id 
                    ? "bg-card text-foreground border-t border-l border-r border-playstore-separator after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-playstore-blue"
                    : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/50"
                )
              : cn(
                  "py-2 px-4 font-medium rounded-md flex items-center",
                  activeTab === tab.id 
                    ? "bg-playstore-blue text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-[#333333]/80"
                )
          )}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
