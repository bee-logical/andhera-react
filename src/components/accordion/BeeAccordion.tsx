'use client';

import React from 'react';
import { MinusIcon, PlusIcon } from '@/utils/icons';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface BeeAccordionProps {
  items: AccordionItem[];
  expanded?: string | null;
  onChange: (expandedId: string | null) => void;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  width?: string;
}

export const BeeAccordion: React.FC<BeeAccordionProps> = ({
  items,
  expanded,
  onChange,
  className = '',
  itemClassName = '',
  headerClassName = '',
  contentClassName = '',
  width = 'w-full',
}) => {
  // Default styles
  const defaultContainerStyles = 'space-y-3';
  const defaultItemStyles = 'bg-gray-800 rounded-lg shadow-md border border-gray-600 overflow-hidden transition-all duration-300';
  const defaultHeaderStyles = 'w-full px-6 py-4 text-left font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFCB00] focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 flex items-center justify-between';
  const defaultContentStyles = 'px-6 pb-6 text-gray-300 leading-relaxed';

  const handleToggle = (itemId: string) => {
    // Single accordion behavior: close if already open, open if closed
    onChange(expanded === itemId ? null : itemId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle(itemId);
    }
  };

  return (
    <div className={`${defaultContainerStyles} ${width} ${className}`}>
      {items.map((item) => {
        const isExpanded = expanded === item.id;

        return (
          <div
            key={item.id}
            className={`${defaultItemStyles} ${itemClassName} ${
              isExpanded ? 'border-[#FFCB00] shadow-lg ring-1 ring-[#FFCB00]/30' : 'hover:shadow-lg'
            }`}
          >
            {/* Header */}
            <button
              onClick={() => handleToggle(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              className={`${defaultHeaderStyles} ${headerClassName} ${
                isExpanded ? 'bg-gray-700 text-[#FFCB00]' : ''
              }`}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              <span className="text-base font-semibold pr-4">{item.title}</span>
              <div
                className={`transition-transform duration-300 ease-in-out flex-shrink-0 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              >
                {isExpanded ? (
                  <MinusIcon className="w-5 h-5 text-[#FFCB00]" />
                ) : (
                  <PlusIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Content */}
            <div
              id={`accordion-content-${item.id}`}
              aria-labelledby={`accordion-header-${item.id}`}
              role="region"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`${defaultContentStyles} ${contentClassName} pt-4`}>
                <div className="text-sm leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BeeAccordion;