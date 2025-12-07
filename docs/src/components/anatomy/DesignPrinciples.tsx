import React from 'react';

export const DesignPrinciples = () => {
  return (
    <div className="docs-main__content">
      <div className="docs-card docs-card--hero">
        <div className="docs-hero__meta">
          <span className="docs-hero__subtitle">Anatomy</span>
          <div className="docs-status-chip docs-status-chip--stable">
            <span>Guide</span>
          </div>
        </div>
        <h1 className="docs-hero__title">Design Principles</h1>
        <p className="docs-hero__description">
          Core design principles that guide the development of Andhera UI components.
        </p>
      </div>

      <div className="docs-card">
        <h2 className="text-2xl font-bold mb-6 text-white">Our Design Philosophy</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">1. Accessibility First</h3>
            <p className="text-gray-300 leading-relaxed">
              Every component is built with accessibility in mind. We follow WCAG guidelines and ensure 
              proper keyboard navigation, screen reader support, and sufficient color contrast ratios.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">2. Dark Mode Native</h3>
            <p className="text-gray-300 leading-relaxed">
              Designed specifically for dark interfaces, our components provide optimal visibility and 
              reduce eye strain while maintaining brand consistency with our signature yellow accents.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">3. Consistency & Predictability</h3>
            <p className="text-gray-300 leading-relaxed">
              Uniform behavior patterns and visual language across all components ensure users can 
              predict how interactions will work throughout your application.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">4. Developer Experience</h3>
            <p className="text-gray-300 leading-relaxed">
              TypeScript-first approach with comprehensive props, clear documentation, and intuitive 
              API design to reduce development time and improve code quality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">5. Performance Optimized</h3>
            <p className="text-gray-300 leading-relaxed">
              Lightweight, tree-shakeable components with minimal runtime overhead and optimized 
              for modern React applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};