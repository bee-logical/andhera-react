import { useState, useEffect } from "react";
import { MoonIcon, GithubIcon, HamburgerIcon, CloseIcon } from "./Icons";

interface HeaderProps {
  sidebarCollapsed: boolean;
  isMobile?: boolean;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

export const Header = ({ 
  sidebarCollapsed, 
  isMobile = false, 
  mobileMenuOpen = false, 
  onMobileMenuToggle 
}: HeaderProps) => {

  const getLeftPosition = () => {
    if (isMobile) return '0px';
    return sidebarCollapsed ? '64px' : '320px';
  };

  return (
    <header 
      className="fixed top-0 right-0 z-40 py-6 h-[86px] flex items-center bg-black transition-all duration-300 border-b border-[#a1a1a1]"
      style={{ 
        left: getLeftPosition(), 
        paddingLeft: isMobile ? '1rem' : 'calc(0.25rem + 1.5rem)',
        paddingRight: isMobile ? '1rem' : '1.5rem'
      }}
    >
      <div className="flex items-center justify-between w-full">
        {/* Mobile Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-[20px] h-[20px] text-white" />
            ) : (
              <HamburgerIcon className="w-[20px] h-[20px] text-white" />
            )}
          </button>
        </div>

        {/* Left Navigation - Desktop */}
        <div className="hidden lg:flex items-center gap-12">
          <span className="text-white text-[15px] font-normal leading-[18px]" style={{ fontFamily: 'Manrope, sans-serif' }}>Components</span>
        </div>
        
        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 lg:p-2.5 rounded-lg bg-white bg-opacity-20 border-0 outline-0 focus:outline-0">
            <MoonIcon className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-white" />
          </button>
          <a 
            href="https://github.com/ADesai-07/andhera-react" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 lg:p-2.5 rounded-lg bg-white bg-opacity-20 border-0 outline-0 focus:outline-0"
          >
            <GithubIcon className="w-[16px] h-[16px] lg:w-[18px] lg:h-[18px] text-white" />
          </a>
        </div>
      </div>
    </header>
  );
};
