
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
  variant?: 'default' | 'pills' | 'card';
  className?: string;
}

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  variant = 'default',
  className 
}: TabNavigationProps) => {
  return (
    <div className={cn(
      "flex mb-6 overflow-x-auto",
      variant === 'default' 
        ? "space-x-1 border-b border-customtk-separator" 
        : variant === 'pills'
          ? "space-x-2 p-1 bg-[#292936] rounded-lg"
          : "space-x-2",
      className
    )}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            "transition-all duration-150 whitespace-nowrap",
            variant === 'default'
              ? cn(
                  "customtk-tab py-3 px-6 font-medium rounded-t-lg relative",
                  activeTab === tab.id 
                    ? "active after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-customtk-blue"
                    : ""
                )
              : variant === 'pills'
                ? cn(
                    "py-2 px-4 font-medium rounded-md flex items-center",
                    activeTab === tab.id 
                      ? "bg-customtk-blue text-white" 
                      : "text-muted-foreground hover:text-foreground hover:bg-[#292936]/80"
                  )
                : cn(
                    "py-3 px-6 font-medium rounded-t-lg border-b-2",
                    activeTab === tab.id 
                      ? "border-customtk-blue text-customtk-blue" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
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
