import React from 'react';

export const Installation = () => {
  return (
    <div className="docs-main__content">
      <div className="docs-card docs-card--hero">
        <div className="docs-hero__meta">
          <span className="docs-hero__subtitle">Anatomy</span>
          <div className="docs-status-chip docs-status-chip--stable">
            <span>Guide</span>
          </div>
        </div>
        <h1 className="docs-hero__title">Installation</h1>
        <p className="docs-hero__description">
          Get started with Andhera UI in your React project with our simple installation process.
        </p>
      </div>

      <div className="docs-card">
        <h2 className="text-2xl font-bold mb-6 text-white">Quick Start</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">1. Install the Package</h3>
            <div className="docs-code-block">
              <pre><code>{`npm install andhera-ui
# or
yarn add andhera-ui
# or
pnpm add andhera-ui`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">2. Install Dependencies</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Andhera UI requires React and Tailwind CSS for styling:
            </p>
            <div className="docs-code-block">
              <pre><code>{`npm install react react-dom tailwindcss
# Configure Tailwind CSS in your project`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">3. Setup Tailwind Configuration</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Add Andhera UI to your Tailwind CSS configuration:
            </p>
            <div className="docs-code-block">
              <pre><code>{`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/andhera-ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFCB00',
        }
      }
    },
  },
  plugins: [],
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">4. Import and Use Components</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Start using Andhera UI components in your React application:
            </p>
            <div className="docs-code-block">
              <pre><code>{`import { Button, Alert, Badge } from 'andhera-ui';

function App() {
  return (
    <div>
      <Alert variant="success">
        Welcome to Andhera UI!
      </Alert>
      <Button variant="primary">
        Get Started
      </Button>
      <Badge count={5} variant="primary">
        Notifications
      </Badge>
    </div>
  );
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FFCB00]">5. Setup Theme Provider (Optional)</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              For advanced theming capabilities, wrap your app with ThemeProvider:
            </p>
            <div className="docs-code-block">
              <pre><code>{`import { ThemeProvider } from 'andhera-ui';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};