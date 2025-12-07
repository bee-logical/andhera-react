'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, XIcon } from '@/utils/icons';

export interface DrawerItem {
  name: string;
  link: string;
  children?: DrawerItem[];
}

export interface BeeDrawerProps {
  position: 'left' | 'right' | 'top' | 'bottom';
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
  items: DrawerItem[];
}

const positionStyles = {
  left: {
    drawer: 'top-0 left-0 h-full w-80 max-w-[80vw] transform transition-transform duration-300 ease-in-out',
    open: 'translate-x-0',
    closed: '-translate-x-full',
  },
  right: {
    drawer: 'top-0 right-0 h-full w-80 max-w-[80vw] transform transition-transform duration-300 ease-in-out',
    open: 'translate-x-0',
    closed: 'translate-x-full',
  },
  top: {
    drawer: 'top-0 left-0 w-full h-80 max-h-[80vh] transform transition-transform duration-300 ease-in-out',
    open: 'translate-y-0',
    closed: '-translate-y-full',
  },
  bottom: {
    drawer: 'bottom-0 left-0 w-full h-80 max-h-[80vh] transform transition-transform duration-300 ease-in-out',
    open: 'translate-y-0',
    closed: 'translate-y-full',
  },
} as const;

// Recursive component for nested drawer items
interface DrawerItemComponentProps {
  item: DrawerItem;
  onClose: () => void;
  level?: number;
}

const DrawerItemComponent: React.FC<DrawerItemComponentProps> = ({ 
  item, 
  onClose, 
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = level * 16 + 16; // 16px base + 16px per level

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      console.log(`Clicked: ${item.name} - ${item.link}`);
      onClose();
    }
  };

  return (
    <div>
      <button
        className="
          w-full text-left flex items-center justify-between py-3 rounded-lg text-gray-300 hover:bg-gray-800 
          hover:text-white transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-800
        "
        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '16px' }}
        onClick={handleClick}
      >
        <span className="flex-1">{item.name}</span>
        {hasChildren && (
          <span className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            )}
          </span>
        )}
      </button>
      
      {/* Nested items */}
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children!.map((childItem, childIndex) => (
            <DrawerItemComponent
              key={childIndex}
              item={childItem}
              onClose={onClose}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const BeeDrawer: React.FC<BeeDrawerProps> = ({
  position,
  isOpen,
  onClose,
  className = '',
  items,
}) => {
  const styles = positionStyles[position];

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  const isVertical = position === 'left' || position === 'right';
  const isHorizontal = position === 'top' || position === 'bottom';

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      />
      
      {/* Drawer */}
      <div
        className={`
          fixed bg-gray-900 text-white shadow-xl z-50 border-gray-700
          ${styles.drawer}
          ${isOpen ? styles.open : styles.closed}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 border-b border-gray-700
          ${isHorizontal ? 'flex-row' : 'flex-row'}
        `}>
          <h2 id="drawer-title" className="text-lg font-semibold text-white">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            aria-label="Close drawer"
          >
            <XIcon className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className={`
          flex-1 p-4 overflow-y-auto
          ${isVertical ? 'h-full' : 'w-full'}
        `}>
          {/* Navigation Items */}
          <nav className="space-y-1">
            {items.map((item, index) => (
              <DrawerItemComponent
                key={index}
                item={item}
                onClose={onClose}
                level={0}
              />
            ))}
          </nav>

          {/* Additional Content Area */}
          {items.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <p>No menu items available</p>
            </div>
          )}
        </div>

        {/* Footer (optional) */}
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <p className="text-xs text-gray-400 text-center">
            Press Escape or click outside to close
          </p>
        </div>
      </div>
    </>
  );
};

export default BeeDrawer;