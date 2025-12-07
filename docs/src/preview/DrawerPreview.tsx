'use client';

import React, { useState } from 'react';
import { Drawer, type DrawerItem } from '../../../src/components/drawer';

export const DrawerPreview: React.FC = () => {
  // Basic drawer states
  const [isBasicLeftOpen, setIsBasicLeftOpen] = useState(false);
  const [isBasicRightOpen, setIsBasicRightOpen] = useState(false);
  const [isBasicTopOpen, setIsBasicTopOpen] = useState(false);
  const [isBasicBottomOpen, setIsBasicBottomOpen] = useState(false);
  
  // Navigation drawer states
  const [isNavLeftOpen, setIsNavLeftOpen] = useState(false);
  const [isNavRightOpen, setIsNavRightOpen] = useState(false);
  
  // Content drawer states
  const [isContentLeftOpen, setIsContentLeftOpen] = useState(false);
  const [isContentRightOpen, setIsContentRightOpen] = useState(false);
  
  // Settings drawer states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Notification drawer states
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Multi-level drawer states
  const [isMultiLevelOpen, setIsMultiLevelOpen] = useState(false);
  
  // Interactive states drawer
  const [isInteractiveOpen, setIsInteractiveOpen] = useState(false);

  const basicMenuItems: DrawerItem[] = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' }
  ];

  const navigationMenuItems: DrawerItem[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Analytics', link: '/analytics' },
    { name: 'Projects', link: '/projects' },
    { name: 'Team', link: '/team' },
    { name: 'Settings', link: '/settings' },
    { name: 'Help', link: '/help' }
  ];

  const contentMenuItems: DrawerItem[] = [
    { name: 'Documents', link: '/documents' },
    { name: 'Images', link: '/images' },
    { name: 'Videos', link: '/videos' },
    { name: 'Downloads', link: '/downloads' },
    { name: 'Trash', link: '/trash' }
  ];

  const settingsMenuItems: DrawerItem[] = [
    { name: 'Profile Settings', link: '/settings/profile' },
    { name: 'Account Security', link: '/settings/security' },
    { name: 'Privacy Controls', link: '/settings/privacy' },
    { name: 'Notifications', link: '/settings/notifications' },
    { name: 'Billing', link: '/settings/billing' },
    { name: 'API Keys', link: '/settings/api' }
  ];

  const notificationMenuItems: DrawerItem[] = [
    { name: 'Recent Updates', link: '/notifications/recent' },
    { name: 'Mentions', link: '/notifications/mentions' },
    { name: 'System Alerts', link: '/notifications/alerts' },
    { name: 'Marketing', link: '/notifications/marketing' }
  ];

  const multiLevelMenuItems: DrawerItem[] = [
    {
      name: 'Products',
      link: '/products',
      children: [
        { name: 'Electronics', link: '/products/electronics' },
        { name: 'Clothing', link: '/products/clothing' },
        {
          name: 'Home & Garden',
          link: '/products/home-garden',
          children: [
            { name: 'Furniture', link: '/products/home-garden/furniture' },
            { name: 'Decor', link: '/products/home-garden/decor' },
            { name: 'Garden Tools', link: '/products/home-garden/tools' }
          ]
        }
      ]
    },
    {
      name: 'Services',
      link: '/services',
      children: [
        { name: 'Consulting', link: '/services/consulting' },
        { name: 'Support', link: '/services/support' },
        { name: 'Training', link: '/services/training' }
      ]
    },
    { name: 'About', link: '/about' }
  ];

  const interactiveMenuItems: DrawerItem[] = [
    { name: 'Profile', link: '/profile' },
    { name: 'Messages', link: '/messages' },
    { name: 'Notifications', link: '/notifications' },
    { name: 'Settings', link: '/settings' },
    { name: 'Log Out', link: '/logout' }
  ];

  return (
    <div className="space-y-8">
      {/* Basic Drawer Positions */}
      <PreviewCard
        title="Basic Drawer Positions"
        preview={
          <div className="space-y-6">
            {/* Demo Container */}
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '300px' }}
            >
              {/* Simulated App Layout */}
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">Demo App Layout</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => setIsBasicLeftOpen(true)}
                      className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Left Drawer
                    </button>
                    <button
                      onClick={() => setIsBasicRightOpen(true)}
                      className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Right Drawer
                    </button>
                    <button
                      onClick={() => setIsBasicTopOpen(true)}
                      className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                      Top Drawer
                    </button>
                    <button
                      onClick={() => setIsBasicBottomOpen(true)}
                      className="px-3 py-1.5 text-xs bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                    >
                      Bottom Drawer
                    </button>
                  </div>
                </div>
                
                {/* Demo Backdrop when drawer is open */}
                {(isBasicLeftOpen || isBasicRightOpen || isBasicTopOpen || isBasicBottomOpen) && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => {
                      setIsBasicLeftOpen(false);
                      setIsBasicRightOpen(false);
                      setIsBasicTopOpen(false);
                      setIsBasicBottomOpen(false);
                    }}
                  />
                )}
                
                {/* Demo Left Drawer */}
                {isBasicLeftOpen && (
                  <div className="absolute left-0 top-0 h-full w-60 bg-gray-800 shadow-xl z-20 transform transition-transform duration-300">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Menu</h5>
                      <button
                        onClick={() => setIsBasicLeftOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      {basicMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Demo Right Drawer */}
                {isBasicRightOpen && (
                  <div className="absolute right-0 top-0 h-full w-60 bg-gray-800 shadow-xl z-20 transform transition-transform duration-300">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Menu</h5>
                      <button
                        onClick={() => setIsBasicRightOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      {basicMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Demo Top Drawer */}
                {isBasicTopOpen && (
                  <div className="absolute top-0 left-0 w-full h-48 bg-gray-800 shadow-xl z-20 transform transition-transform duration-300">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Menu</h5>
                      <button
                        onClick={() => setIsBasicTopOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {basicMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer text-center">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Demo Bottom Drawer */}
                {isBasicBottomOpen && (
                  <div className="absolute bottom-0 left-0 w-full h-48 bg-gray-800 shadow-xl z-20 transform transition-transform duration-300">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Menu</h5>
                      <button
                        onClick={() => setIsBasicBottomOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 grid grid-cols-4 gap-2">
                      {basicMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer text-center">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 text-sm text-center">
              ↑ Interactive demo showing drawer positions within a contained layout
            </p>
          </div>
        }
        code={`// Basic drawer positions - left, right, top, bottom
const [isLeftOpen, setIsLeftOpen] = useState(false);
const [isRightOpen, setIsRightOpen] = useState(false);
const [isTopOpen, setIsTopOpen] = useState(false);
const [isBottomOpen, setIsBottomOpen] = useState(false);

const basicMenuItems = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Services', link: '/services' },
  { name: 'Contact', link: '/contact' }
];

// Left drawer
<Drawer
  position="left"
  isOpen={isLeftOpen}
  onOpen={() => setIsLeftOpen(true)}
  onClose={() => setIsLeftOpen(false)}
  items={basicMenuItems}
/>

// Right drawer
<Drawer
  position="right"
  isOpen={isRightOpen}
  onOpen={() => setIsRightOpen(true)}
  onClose={() => setIsRightOpen(false)}
  items={basicMenuItems}
/>

// Top drawer
<Drawer
  position="top"
  isOpen={isTopOpen}
  onOpen={() => setIsTopOpen(true)}
  onClose={() => setIsTopOpen(false)}
  items={basicMenuItems}
/>

// Bottom drawer
<Drawer
  position="bottom"
  isOpen={isBottomOpen}
  onOpen={() => setIsBottomOpen(true)}
  onClose={() => setIsBottomOpen(false)}
  items={basicMenuItems}
/>`}
      />

      {/* Navigation Drawers */}
      <PreviewCard
        title="Navigation Drawers"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">Dashboard App</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsNavLeftOpen(true)}
                      className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors"
                    >
                      Main Navigation
                    </button>
                    <button
                      onClick={() => setIsNavRightOpen(true)}
                      className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors"
                    >
                      Secondary Nav
                    </button>
                  </div>
                </div>
                
                {(isNavLeftOpen || isNavRightOpen) && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => {
                      setIsNavLeftOpen(false);
                      setIsNavRightOpen(false);
                    }}
                  />
                )}
                
                {isNavLeftOpen && (
                  <div className="absolute left-0 top-0 h-full w-64 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Dashboard Menu</h5>
                      <button
                        onClick={() => setIsNavLeftOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {navigationMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center">
                          <span className="text-sm">📊</span>
                          <span className="ml-3">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {isNavRightOpen && (
                  <div className="absolute right-0 top-0 h-full w-64 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Quick Actions</h5>
                      <button
                        onClick={() => setIsNavRightOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {navigationMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ Navigation drawers for dashboard and secondary menus
            </p>
          </div>
        }
        code={`// Navigation drawer with comprehensive menu items
const [isNavOpen, setIsNavOpen] = useState(false);

const navigationMenuItems = [
  { name: 'Dashboard', link: '/dashboard' },
  { name: 'Analytics', link: '/analytics' },
  { name: 'Projects', link: '/projects' },
  { name: 'Team', link: '/team' },
  { name: 'Settings', link: '/settings' },
  { name: 'Help', link: '/help' }
];

<Drawer
  position="left"
  isOpen={isNavOpen}
  onOpen={() => setIsNavOpen(true)}
  onClose={() => setIsNavOpen(false)}
  items={navigationMenuItems}
/>`}
      />

      {/* Content & File Drawers */}
      <PreviewCard
        title="Content & File Drawers"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">File Manager</h4>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsContentLeftOpen(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                      File Browser
                    </button>
                    <button
                      onClick={() => setIsContentRightOpen(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                      Properties Panel
                    </button>
                  </div>
                </div>
                
                {(isContentLeftOpen || isContentRightOpen) && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => {
                      setIsContentLeftOpen(false);
                      setIsContentRightOpen(false);
                    }}
                  />
                )}
                
                {isContentLeftOpen && (
                  <div className="absolute left-0 top-0 h-full w-56 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Files</h5>
                      <button
                        onClick={() => setIsContentLeftOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {contentMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center">
                          <span className="text-sm">📁</span>
                          <span className="ml-3">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {isContentRightOpen && (
                  <div className="absolute right-0 top-0 h-full w-56 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Properties</h5>
                      <button
                        onClick={() => setIsContentRightOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {contentMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer">
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ File browser and content management panels
            </p>
          </div>
        }
        code={`// Content and file management drawer
const [isContentOpen, setIsContentOpen] = useState(false);

const contentMenuItems = [
  { name: 'Documents', link: '/documents' },
  { name: 'Images', link: '/images' },
  { name: 'Videos', link: '/videos' },
  { name: 'Downloads', link: '/downloads' },
  { name: 'Trash', link: '/trash' }
];

<Drawer
  position="left"
  isOpen={isContentOpen}
  onOpen={() => setIsContentOpen(true)}
  onClose={() => setIsContentOpen(false)}
  items={contentMenuItems}
/>`}
      />

      {/* Settings Drawer */}
      <PreviewCard
        title="Settings & Configuration Drawer"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">Account Settings</h4>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    ⚙️ Open Settings
                  </button>
                </div>
                
                {isSettingsOpen && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsSettingsOpen(false)}
                  />
                )}
                
                {isSettingsOpen && (
                  <div className="absolute right-0 top-0 h-full w-72 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Settings</h5>
                      <button
                        onClick={() => setIsSettingsOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {settingsMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center">
                          <span className="text-sm">⚙️</span>
                          <span className="ml-3">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ Settings panel with configuration options
            </p>
          </div>
        }
        code={`// Settings and configuration drawer
const [isSettingsOpen, setIsSettingsOpen] = useState(false);

const settingsMenuItems = [
  { name: 'Profile Settings', link: '/settings/profile' },
  { name: 'Account Security', link: '/settings/security' },
  { name: 'Privacy Controls', link: '/settings/privacy' },
  { name: 'Notifications', link: '/settings/notifications' },
  { name: 'Billing', link: '/settings/billing' },
  { name: 'API Keys', link: '/settings/api' }
];

<Drawer
  position="right"
  isOpen={isSettingsOpen}
  onOpen={() => setIsSettingsOpen(true)}
  onClose={() => setIsSettingsOpen(false)}
  items={settingsMenuItems}
/>`}
      />

      {/* Notification Drawer */}
      <PreviewCard
        title="Notification & Alert Drawer"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">Notification Center</h4>
                  <button
                    onClick={() => setIsNotificationOpen(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors relative"
                  >
                    🔔 Notifications
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      4
                    </span>
                  </button>
                </div>
                
                {isNotificationOpen && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsNotificationOpen(false)}
                  />
                )}
                
                {isNotificationOpen && (
                  <div className="absolute right-0 top-0 h-full w-68 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Notifications</h5>
                      <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {notificationMenuItems.map((item, idx) => (
                        <div key={idx} className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center">
                          <span className="text-sm">🔔</span>
                          <span className="ml-3">{item.name}</span>
                          {idx === 0 && <span className="ml-auto bg-red-500 text-xs px-1.5 py-0.5 rounded-full">2</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ Notification center with unread count badges
            </p>
          </div>
        }
        code={`// Notification and alert drawer
const [isNotificationOpen, setIsNotificationOpen] = useState(false);

const notificationMenuItems = [
  { name: 'Recent Updates', link: '/notifications/recent' },
  { name: 'Mentions', link: '/notifications/mentions' },
  { name: 'System Alerts', link: '/notifications/alerts' },
  { name: 'Marketing', link: '/notifications/marketing' }
];

<button className="relative">
  Notifications
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    4
  </span>
</button>

<Drawer
  position="right"
  isOpen={isNotificationOpen}
  onOpen={() => setIsNotificationOpen(true)}
  onClose={() => setIsNotificationOpen(false)}
  items={notificationMenuItems}
/>`}
      />

      {/* Multi-level Navigation */}
      <PreviewCard
        title="Multi-level Navigation Drawer"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '320px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">E-commerce Site</h4>
                  <button
                    onClick={() => setIsMultiLevelOpen(true)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    🌳 Category Menu
                  </button>
                </div>
                
                {isMultiLevelOpen && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsMultiLevelOpen(false)}
                  />
                )}
                
                {isMultiLevelOpen && (
                  <div className="absolute left-0 top-0 h-full w-72 bg-gray-800 shadow-xl z-20">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                      <h5 className="text-white font-medium">Categories</h5>
                      <button
                        onClick={() => setIsMultiLevelOpen(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: '240px' }}>
                      <div className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm">📱</span>
                          <span className="ml-3">Products</span>
                        </div>
                        <span className="text-xs">▶</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="text-gray-400 py-1 px-3 rounded hover:bg-gray-700 cursor-pointer text-sm">
                          Electronics
                        </div>
                        <div className="text-gray-400 py-1 px-3 rounded hover:bg-gray-700 cursor-pointer text-sm">
                          Clothing
                        </div>
                        <div className="text-gray-400 py-1 px-3 rounded hover:bg-gray-700 cursor-pointer text-sm flex items-center justify-between">
                          <span>Home & Garden</span>
                          <span className="text-xs">▶</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          <div className="text-gray-500 py-1 px-2 rounded hover:bg-gray-700 cursor-pointer text-xs">
                            Furniture
                          </div>
                          <div className="text-gray-500 py-1 px-2 rounded hover:bg-gray-700 cursor-pointer text-xs">
                            Decor
                          </div>
                          <div className="text-gray-500 py-1 px-2 rounded hover:bg-gray-700 cursor-pointer text-xs">
                            Garden Tools
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-sm">🛌</span>
                          <span className="ml-3">Services</span>
                        </div>
                        <span className="text-xs">▶</span>
                      </div>
                      <div className="text-gray-300 py-2 px-3 rounded hover:bg-gray-700 cursor-pointer flex items-center">
                        <span className="text-sm">ℹ️</span>
                        <span className="ml-3">About</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ Nested navigation with expandable categories
            </p>
          </div>
        }
        code={`// Multi-level navigation with nested items
const [isMultiLevelOpen, setIsMultiLevelOpen] = useState(false);

const multiLevelMenuItems = [
  {
    name: 'Products',
    link: '/products',
    children: [
      { name: 'Electronics', link: '/products/electronics' },
      { name: 'Clothing', link: '/products/clothing' },
      {
        name: 'Home & Garden',
        link: '/products/home-garden',
        children: [
          { name: 'Furniture', link: '/products/home-garden/furniture' },
          { name: 'Decor', link: '/products/home-garden/decor' },
          { name: 'Garden Tools', link: '/products/home-garden/tools' }
        ]
      }
    ]
  },
  {
    name: 'Services',
    link: '/services',
    children: [
      { name: 'Consulting', link: '/services/consulting' },
      { name: 'Support', link: '/services/support' },
      { name: 'Training', link: '/services/training' }
    ]
  },
  { name: 'About', link: '/about' }
];

<Drawer
  position="left"
  isOpen={isMultiLevelOpen}
  onOpen={() => setIsMultiLevelOpen(true)}
  onClose={() => setIsMultiLevelOpen(false)}
  items={multiLevelMenuItems}
/>`}
      />

      {/* Interactive States & Custom Styling */}
      <PreviewCard
        title="Interactive States & Custom Styling"
        preview={
          <div className="space-y-4">
            <div 
              className="relative bg-gray-800 rounded-lg overflow-hidden"
              style={{ height: '280px' }}
            >
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h4 className="text-white text-lg font-semibold">User Profile</h4>
                  <button
                    onClick={() => setIsInteractiveOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                  >
                    ✨ User Menu
                  </button>
                </div>
                
                {isInteractiveOpen && (
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsInteractiveOpen(false)}
                  />
                )}
                
                {isInteractiveOpen && (
                  <div className="absolute left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-900 to-pink-900 shadow-xl z-20 border-r-4 border-purple-400">
                    <div className="p-4 border-b border-purple-600 flex justify-between items-center">
                      <h5 className="text-white font-medium">User Menu</h5>
                      <button
                        onClick={() => setIsInteractiveOpen(false)}
                        className="text-purple-200 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      {interactiveMenuItems.map((item, idx) => {
                        const icons = ['👤', '💬', '🔔', '⚙️', '🚪'];
                        const isLogout = item.name === 'Log Out';
                        return (
                          <div 
                            key={idx} 
                            className={`py-2 px-3 rounded cursor-pointer flex items-center transition-colors ${
                              isLogout 
                                ? 'text-red-300 hover:bg-red-900/50' 
                                : 'text-purple-100 hover:bg-purple-800/50'
                            }`}
                          >
                            <span className="text-sm">{icons[idx]}</span>
                            <span className="ml-3">{item.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm text-center">
              ↑ Custom styled drawer with gradient background and themed colors
            </p>
          </div>
        }
        code={`// Interactive drawer with custom styling
const [isInteractiveOpen, setIsInteractiveOpen] = useState(false);

const interactiveMenuItems = [
  { name: 'Profile', link: '/profile' },
  { name: 'Messages', link: '/messages' },
  { name: 'Notifications', link: '/notifications' },
  { name: 'Settings', link: '/settings' },
  { name: 'Log Out', link: '/logout' }
];

// Custom styled button with gradient
<button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105">
  Custom Styled Drawer
</button>

// Drawer with custom className for styling
<Drawer
  position="left"
  isOpen={isInteractiveOpen}
  onOpen={() => setIsInteractiveOpen(true)}
  onClose={() => setIsInteractiveOpen(false)}
  items={interactiveMenuItems}
  className="border-l-4 border-purple-500"
/>

// Features:
// - Escape key support for closing
// - Click outside to close
// - Smooth animations for all positions
// - Responsive design with max-width/max-height
// - Focus management and accessibility
// - Nested menu item expansion
// - Body scroll prevention when open`}
      />
    </div>
  );
};

/**
 * PreviewCard Component
 * Wraps each drawer variant section with title, preview area, and code tabs
 */
interface PreviewCardProps {
  title: string;
  preview: React.ReactNode;
  code: string;
}

function PreviewCard({ title, preview, code }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 
          style={{ 
            fontFamily: "Manrope, sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0
          }}
        >
          {title}
        </h3>
      </div>

      {/* Preview Container */}
      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid #364153",
          borderRadius: "16px",
          padding: "12px",
          minHeight: "266px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Toggle Controls - Top Right */}
        <div 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 10
          }}
        >
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #364153",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5"/>
              </svg>
            )}
          </button>

          {/* Preview/Code Toggle */}
          <div 
            style={{
              border: "1px solid #364153",
              borderRadius: "8px",
              display: "flex",
              overflow: "hidden"
            }}
          >
            <button
              onClick={() => setActiveTab("preview")}
              style={{
                background: activeTab === "preview" ? "#242424" : "transparent",
                border: activeTab === "preview" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "preview" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              style={{
                background: activeTab === "code" ? "#242424" : "transparent",
                border: activeTab === "code" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "code" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "preview" ? (
          <div style={{ zIndex: 1, width: "100%" }}>
            {preview}
          </div>
        ) : (
          <div 
            style={{
              width: "100%",
              padding: "40px 12px 12px 12px",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "16px",
                background: "#1a1a1a",
                borderRadius: "8px",
                height: "100%",
                overflow: "auto",
                fontFamily: "'Cascadia Code', 'Fira Code', monospace",
                fontSize: "13px",
                lineHeight: 1.5,
                color: "#e0e0e0",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
              className="hide-scrollbar"
            >
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrawerPreview;
