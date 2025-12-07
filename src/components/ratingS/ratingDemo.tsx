import React, { useState } from 'react';
import RatingStar from './ratingS';

// ratingDemo.tsx
// Demo component showcasing all variants and preview styles of RatingStar

const RatingDemo: React.FC = () => {
  const [controlledValue, setControlledValue] = useState(3.5);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">⭐ RatingStar Component Demo</h1>

      {/* --- Basic Variants Section --- */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Basic Default */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Default</h2>
          <RatingStar label="Default Rating" description="Interactive basic example" />
        </div>

        {/* Controlled Mode */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Controlled Mode</h2>
          <RatingStar
            label="Controlled Rating"
            value={controlledValue}
            onChange={(val: number) => setControlledValue(val)}
            showValue
            allowHalf
          />
          <p className="mt-2 text-sm text-gray-500">Current value: {controlledValue}</p>
        </div>

        {/* Readonly Mode */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Readonly</h2>
          <RatingStar label="Readonly Example" value={4.5} readOnly showValue />
        </div>

        {/* Disabled */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Disabled</h2>
          <RatingStar label="Disabled Example" defaultValue={3} disabled />
        </div>

        {/* Half Star Allowed */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Half-Star Mode</h2>
          <RatingStar label="Half-Star Example" allowHalf showValue />
        </div>

        {/* Custom Colors */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Custom Colors</h2>
          <RatingStar
            label="Colorful Rating"
            color="#ef4444"
            hoverColor="#f87171"
            emptyColor="#d1d5db"
            allowHalf
            showValue
          />
        </div>

        {/* Different Sizes */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Sizes</h2>
          <div className="space-y-2">
            <RatingStar label="Small" size="sm" defaultValue={3} />
            <RatingStar label="Medium" size="md" defaultValue={3.5} />
            <RatingStar label="Large" size="lg" defaultValue={4} />
          </div>
        </div>

        {/* Custom Tooltip */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Custom Tooltips</h2>
          <RatingStar
            label="Tooltip Example"
            tooltipTexts={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
            allowHalf
            showValue
          />
        </div>

        {/* Animation Variants */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Animations</h2>
          <div className="space-y-3">
            <RatingStar label="Scale" animation="scale" defaultValue={3} />
            <RatingStar label="Pulse" animation="pulse" defaultValue={3} />
            <RatingStar label="None" animation="none" defaultValue={3} />
          </div>
        </div>
      </section>

      {/* --- Preview Cards Section --- */}
      <section className="mt-12 grid md:grid-cols-2 gap-8">
        {/* Light Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <img
              src="https://m.media-amazon.com/images/I/81Ni+3vY7zL._AC_SL1500_.jpg"
              alt="Good Will Hunting"
              className="w-16 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg">Good Will Hunting</h3>
              <p className="text-xs text-gray-500 mb-2">1997 · Plot / Love</p>
              <RatingStar value={4.5} readOnly allowHalf />
              <p className="mt-2 text-sm text-gray-700">
                Towering performance by Matt Damon as a troubled working class who needs to address his creative genius.
              </p>
              <div className="text-xs text-gray-400 mt-2">— Nguyen Shane · Oct 13, 2017</div>
            </div>
          </div>
        </div>

        {/* Dark Preview */}
        <div className="bg-gray-900 text-gray-100 p-6 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <img
              src="https://m.media-amazon.com/images/I/81Ni+3vY7zL._AC_SL1500_.jpg"
              alt="Good Will Hunting"
              className="w-16 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg">Good Will Hunting</h3>
              <p className="text-xs text-gray-400 mb-2">1997 · Plot / Love</p>
              <RatingStar value={4.5} readOnly allowHalf color="#facc15" emptyColor="#374151" hoverColor="#fbbf24" />
              <p className="mt-2 text-sm text-gray-300">
                Towering performance by Matt Damon as a troubled working class who needs to address his creative genius.
              </p>
              <div className="text-xs text-gray-500 mt-2">— Nguyen Shane · Oct 13, 2017</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RatingDemo;