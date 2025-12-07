import React from 'react';

export const Typography = () => {
  return (
    <div className="docs-main__content">
      <div className="docs-card docs-card--hero">
        <div className="docs-hero__meta">
          <span className="docs-hero__subtitle">Anatomy</span>
          <div className="docs-status-chip docs-status-chip--stable">
            <span>Guide</span>
          </div>
        </div>
        <h1 className="docs-hero__title">Typography</h1>
        <p className="docs-hero__description">
          Typography system and font guidelines for consistent text rendering across all components.
        </p>
      </div>

      <div className="docs-card">
        <h2 className="text-2xl font-bold mb-6 text-white">Font System</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Primary Font: Manrope</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Andhera UI uses Manrope as the primary typeface for all components. This modern, 
              geometric sans-serif provides excellent readability in dark interfaces.
            </p>
            <div className="docs-code-block">
              <pre><code>{`@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

:root {
  font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Type Scale</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our typography scale is designed for optimal readability and hierarchy:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Heading 1 - 36px</h1>
                <p className="text-gray-400 text-sm">Used for main page titles and primary headings</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Heading 2 - 30px</h2>
                <p className="text-gray-400 text-sm">Section headings and component titles</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Heading 3 - 24px</h3>
                <p className="text-gray-400 text-sm">Subsection headings</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-xl font-medium mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Heading 4 - 20px</h4>
                <p className="text-gray-400 text-sm">Component property headings</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-base mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Body Text - 16px</p>
                <p className="text-gray-400 text-sm">Main content, descriptions, and labels</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-sm mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Small Text - 14px</p>
                <p className="text-gray-400 text-sm">Helper text, captions, and secondary information</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Font Weights</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Manrope supports multiple weights for different use cases:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-light mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Light (300)</p>
                <p className="text-gray-400 text-sm">Subtle text elements</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-normal mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Regular (400)</p>
                <p className="text-gray-400 text-sm">Body text and descriptions</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-medium mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Medium (500)</p>
                <p className="text-gray-400 text-sm">Labels and form fields</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-semibold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Semibold (600)</p>
                <p className="text-gray-400 text-sm">Subheadings and emphasis</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Bold (700)</p>
                <p className="text-gray-400 text-sm">Headings and important text</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="font-extrabold mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Extra Bold (800)</p>
                <p className="text-gray-400 text-sm">Brand names and hero text</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">Color Guidelines</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Text colors are optimized for dark backgrounds with proper contrast ratios:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                <div className="w-6 h-6 bg-white rounded"></div>
                <span className="text-white">Primary text - #ffffff</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span className="text-gray-300">Secondary text - #d1d5db</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                <div className="w-6 h-6 bg-gray-500 rounded"></div>
                <span className="text-gray-500">Muted text - #6b7280</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg">
                <div className="w-6 h-6 bg-[#FFCB00] rounded"></div>
                <span className="text-[#FFCB00]">Accent text - #FFCB00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};