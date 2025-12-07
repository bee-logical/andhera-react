import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronUpIcon, 
  ChevronDownIcon
} from "./Icons";
import andheraLogo from "../data/Vector.svg";

export type ComponentCategory = {
  id: string;
  label: string;
};

export type ComponentDoc = {
  id: string;
  title: string;
  caption: string;
  category: ComponentCategory["id"];
};

export interface SidebarProps {
  items: ComponentDoc[];
  categories: ComponentCategory[];
  activeId: string;
  overviewActive: boolean;
  onSelect: (id: string) => void;
  onSelectOverview: () => void;
  onCollapsedChange?: (collapsed: boolean) => void;
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export const Sidebar = ({ 
  items, 
  categories, 
  activeId, 
  overviewActive, 
  onSelect, 
  onSelectOverview, 
  onCollapsedChange,
  isMobile = false,
  mobileMenuOpen = false,
  onMobileMenuToggle
}: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    baseComponents: true,
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCollapsed = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapsedChange?.(newCollapsedState);
  };

  const groupedItems = useMemo(
    () =>
      categories.map((category) => ({
        category,
        entries: items.filter((item) => item.category === category.id),
      })),
    [categories, items],
  );

  // Mobile: Hidden by default, shown as overlay when mobileMenuOpen
  // Desktop: Always visible, can be collapsed
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onMobileMenuToggle}
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside 
          className={`fixed top-0 left-0 h-screen w-80 bg-black flex flex-col z-50 transform transition-transform duration-300 ease-in-out border-r border-[#a1a1a1] ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo Section */}
          <div className="h-[86px] px-6 flex items-center gap-4 flex-shrink-0 relative">
            <button 
              onClick={() => {
                navigate('/');
                onMobileMenuToggle?.();
              }}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <img 
                src={andheraLogo} 
                alt="Andhera UI Logo" 
                className="w-8 h-8"
              />
              <div>
                <div className="font-bold text-[18px] leading-[22.5px] tracking-[-0.27px] text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  ANDHERA UI
                </div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div 
            className="flex-1 overflow-y-auto px-4 py-4 space-y-1 sidebar-scroll" 
            style={{ 
              scrollbarWidth: 'thin', 
              scrollbarColor: '#4a5565 #1a1a1a',
              maxHeight: 'calc(100vh - 86px)'
            }}
          >
            {/* Base Components Section */}
            <div className="space-y-0.5">
              <button
                onClick={() => toggleSection('baseComponents')}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-bold text-sm text-[#f5f5f5] hover:bg-white hover:bg-opacity-10 border-0 outline-0 focus:outline-0"
              >
                Base Component
                {expandedSections.baseComponents ? (
                  <ChevronUpIcon className="w-[18px] h-[18px] text-[#6a7282]" />
                ) : (
                  <ChevronDownIcon className="w-[18px] h-[18px] text-[#6a7282]" />
                )}
              </button>
              
              {expandedSections.baseComponents && (
                <div className="space-y-0.5">
                  {items.map((entry) => {
                    const isActive = entry.id === activeId;
                    return (
                      <button
                        key={entry.id}
                        onClick={() => onSelect(entry.id)}
                        className={`w-full flex items-center px-2.5 py-2 rounded-lg font-medium text-sm transition-colors ${
                          isActive 
                            ? 'bg-[#FFCB00] bg-opacity-20 text-[#FFCB00] border border-[#FFCB00] border-opacity-30' 
                            : 'text-[#a1a1a1] hover:bg-white hover:bg-opacity-10'
                        }`}
                      >
                        {entry.title}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-80'} bg-black flex flex-col h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-50 hidden lg:flex border-r border-[#a1a1a1]`}>
      {/* Logo Section */}
      <div className="h-[86px] px-6 flex items-center gap-4 flex-shrink-0 relative">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img 
            src={andheraLogo} 
            alt="Andhera UI Logo" 
            className="w-8 h-8"
          />
          {!isCollapsed && (
            <div>
              <div className="font-bold text-[18px] leading-[22.5px] tracking-[-0.27px] text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                ANDHERA UI
              </div>
            </div>
          )}
        </button>
        <button
          onClick={toggleCollapsed}
          className="fixed w-6 h-6 right-2 top-[43px] transform -translate-y-1/2 p-1 rounded hover:bg-white hover:bg-opacity-10 transition-colors z-50 flex items-center justify-center"
          style={{ left: isCollapsed ? '48px' : '296px' }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronDownIcon className="w-4 h-4 text-white rotate-90" />
          ) : (
            <ChevronUpIcon className="w-4 h-4 text-white rotate-90" />
          )}
        </button>
      </div>

      {/* Navigation */}
      {!isCollapsed && (
        <div 
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1 sidebar-scroll" 
          style={{ 
            scrollbarWidth: 'thin', 
            scrollbarColor: '#4a5565 #1a1a1a',
            maxHeight: 'calc(100vh - 86px)'
          }}
        >


        {/* Base Components Section */}
        <div className="space-y-0.5">
          <button
            onClick={() => toggleSection('baseComponents')}
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg font-bold text-sm text-[#f5f5f5] hover:bg-white hover:bg-opacity-10 border-0 outline-0 focus:outline-0"
          >
            Base Component
            {expandedSections.baseComponents ? (
              <ChevronUpIcon className="w-[18px] h-[18px] text-[#6a7282]" />
            ) : (
              <ChevronDownIcon className="w-[18px] h-[18px] text-[#6a7282]" />
            )}
          </button>
          
          {expandedSections.baseComponents && (
            <div className="space-y-0.5">
              {items.map((entry) => {
                const isActive = entry.id === activeId;
                return (
                  <button
                    key={entry.id}
                    onClick={() => onSelect(entry.id)}
                    className={`w-full flex items-center px-2.5 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isActive 
                        ? 'bg-[#FFCB00] bg-opacity-20 text-[#FFCB00] border border-[#FFCB00] border-opacity-30' 
                        : 'text-[#a1a1a1] hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {entry.title}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        </div>
      )}
    </aside>
  );
};


// import { useMemo } from "react";

// export type ComponentCategory = {
//   id: string;
//   label: string;
// };

// export type ComponentDoc = {
//   id: string;
//   title: string;
//   caption: string;
//   category: ComponentCategory["id"];
// };

// export interface SidebarProps {
//   items: ComponentDoc[];
//   categories: ComponentCategory[];
//   activeId: string;
//   overviewActive: boolean;
//   onSelect: (id: string) => void;
//   onSelectOverview: () => void;
// }

// export const Sidebar = ({ items, categories, activeId, overviewActive, onSelect, onSelectOverview }: SidebarProps) => {
//   const groupedItems = useMemo(
//     () =>
//       categories.map((category) => ({
//         category,
//         entries: items.filter((item) => item.category === category.id),
//       })),
//     [categories, items],
//   );

//   return (
//     <aside className="docs-sidebar">
//       <div className="docs-sidebar__brand">
//         <span className="docs-sidebar__brand-eyebrow">Andhera</span>
//         <span className="docs-sidebar__brand-title">Component Index</span>
//       </div>

//       <div className="docs-sidebar__list">
//         <button
//           type="button"
//           onClick={onSelectOverview}
//           className={`docs-sidebar__item${overviewActive ? " docs-sidebar__item--active" : ""}`}
//         >
//           <div className="docs-sidebar__item-title">All components</div>
//           <div className="docs-sidebar__item-caption">Browse everything at a glance</div>
//         </button>

//         {groupedItems.map(({ category, entries }) =>
//           entries.length > 0 ? (
//             <div key={category.id} className="docs-sidebar__group">
//               <div className="docs-sidebar__section-title">{category.label}</div>
//               {entries.map((entry) => {
//                 const isActive = entry.id === activeId;
//                 return (
//                   <button
//                     key={entry.id}
//                     onClick={() => onSelect(entry.id)}
//                     className={`docs-sidebar__item${isActive ? " docs-sidebar__item--active" : ""}`}
//                     type="button"
//                   >
//                     <div className="docs-sidebar__item-title">{entry.title}</div>
//                     <div className="docs-sidebar__item-caption">{entry.caption}</div>
//                   </button>
//                 );
//               })}
//             </div>
//           ) : null,
//         )}
//       </div>
//     </aside>
//   );
// };
