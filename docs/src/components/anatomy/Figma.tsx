import React from 'react';

export const Figma = () => {
  return (
    <div className="docs-main__content">
      <div className="docs-card docs-card--hero">
        <div className="docs-hero__meta">
          <span className="docs-hero__subtitle">Anatomy</span>
          <div className="docs-status-chip docs-status-chip--beta">
            <span>Coming Soon</span>
          </div>
        </div>
        <h1 className="docs-hero__title">Figma Resources</h1>
        <p className="docs-hero__description">
          Design system resources, component libraries, and collaborative tools for designers using Andhera UI.
        </p>
      </div>

      <div className="docs-card">
        <h2 className="text-2xl font-bold mb-6 text-white">Design System Kit</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Component Library</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              A comprehensive Figma library containing all Andhera UI components with proper variants, 
              states, and properties for seamless design-to-development workflow.
            </p>
            <div className="p-6 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#FFCB00] rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.5a.5.5 0 00-.5-.5h-2a.5.5 0 000 1h2a.5.5 0 00.5-.5zM9 8a.5.5 0 000 1h6a.5.5 0 000-1H9zm0 3a.5.5 0 000 1h6a.5.5 0 000-1H9z"/>
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Figma Library - Coming Soon</h4>
                <p className="text-gray-400 mb-4">Full component library with design tokens and documentation</p>
                <button className="px-6 py-2 bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed">
                  Available Soon
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Design Tokens</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Synchronized design tokens for colors, typography, spacing, and other design properties 
              to ensure consistency between design and development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Color Tokens</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#FFCB00] rounded"></div>
                    <span className="text-sm text-gray-300">brand-yellow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-black rounded border border-gray-600"></div>
                    <span className="text-sm text-gray-300">background-primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-800 rounded border border-gray-600"></div>
                    <span className="text-sm text-gray-300">background-secondary</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Typography Tokens</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-300">font-family: Manrope</div>
                  <div className="text-sm text-gray-300">font-size: 16px (base)</div>
                  <div className="text-sm text-gray-300">line-height: 1.5</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Design Guidelines</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Best practices and guidelines for using Andhera UI components in your designs.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-[#FFCB00]">
                <h5 className="font-medium text-white mb-2">Spacing & Layout</h5>
                <p className="text-sm text-gray-300">
                  Use consistent 8px grid system for all spacing and layout decisions.
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-[#FFCB00]">
                <h5 className="font-medium text-white mb-2">Color Usage</h5>
                <p className="text-sm text-gray-300">
                  Primary yellow should be used sparingly for key actions and focus states.
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-[#FFCB00]">
                <h5 className="font-medium text-white mb-2">Component States</h5>
                <p className="text-sm text-gray-300">
                  Always design for all interactive states: default, hover, focus, active, and disabled.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Collaboration Tools</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Resources to help designers and developers work together more effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="font-medium text-white mb-2">Handoff Specs</h5>
                <p className="text-sm text-gray-300 mb-3">
                  Detailed specifications for developers including spacing, colors, and interactions.
                </p>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Coming Soon</span>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="font-medium text-white mb-2">Code Snippets</h5>
                <p className="text-sm text-gray-300 mb-3">
                  Ready-to-use code snippets that match your Figma designs exactly.
                </p>
                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};