'use client';

import React, { useRef, useEffect } from 'react';

export interface TabItem {
  value: string;
  label: string;
}

export interface BeeTabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: TabItem[];
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  containerClassName?: string;
}

export const BeeTabs: React.FC<BeeTabsProps> = ({
  value,
  onChange,
  tabs,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  inactiveTabClassName = '',
  containerClassName = '',
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Default styles
  const defaultTabStyles = 'px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FFCB00] focus:ring-offset-2 focus:ring-offset-gray-800';
  const defaultActiveStyles = 'border-b-2 border-[#FFCB00] text-[#FFCB00]';
  const defaultInactiveStyles = 'text-gray-300 hover:text-[#FFCB00] border-b-2 border-transparent hover:border-[#FFCB00]';
  const defaultContainerStyles = 'bg-gray-800';

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, tabIndex: number) => {
    let newIndex = tabIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = tabIndex > 0 ? tabIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = tabIndex < tabs.length - 1 ? tabIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    // Focus the new tab and select it
    tabRefs.current[newIndex]?.focus();
    onChange(tabs[newIndex].value);
  };

  // Set up tab refs array
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs.length]);

  return (
    <div className={`${defaultContainerStyles} ${containerClassName} ${className}`}>
      <div
        role="tablist"
        className="flex border-b border-gray-600 overflow-x-auto scrollbar-hide"
        aria-label="Tabs"
      >
      {tabs?.map((tab, index) => {
  const isActive = tab.value === value;

  return (
    <button
      key={tab.value}
      ref={(el) => {
        tabRefs.current[index] = el;
      }}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${tab.value}`}
      id={`tab-${tab.value}`}
      tabIndex={isActive ? 0 : -1}
      className={`
        ${defaultTabStyles}
        ${tabClassName}
        ${isActive 
          ? `${defaultActiveStyles} ${activeTabClassName}` 
          : `${defaultInactiveStyles} ${inactiveTabClassName}`
        }
        whitespace-nowrap flex-shrink-0
      `}
      onClick={() => onChange(tab.value)}
      onKeyDown={(e) => handleKeyDown(e, index)}
    >
      {tab.label}
    </button>
  );
})}
      </div>
    </div>
  );
};

export default BeeTabs;