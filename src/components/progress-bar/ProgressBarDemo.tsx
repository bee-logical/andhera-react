'use client';

import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const ProgressBarDemo: React.FC = () => {
  const [dynamicValue, setDynamicValue] = useState(0);

  // Auto-increment demo
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicValue((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          ProgressBar Component Demo
        </h1>
        <p className="text-gray-600 mb-8">
          A fully custom, dynamic, and reusable ProgressBar component using
          Tailwind CSS
        </p>

        <div className="space-y-8">
          {/* Auto-incrementing Demo */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              🎬 Auto-Incrementing Demo
            </h2>
            <ProgressBar
              value={dynamicValue}
              label="Auto Progress"
              color="blue"
              striped
              animated
            />
          </section>

          {/* 1. Default */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣ Default
            </h2>
            <ProgressBar value={50} label="Loading data..." />
          </section>

          {/* 2. Solid Green (Success) */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              2️⃣ Solid Green (Success)
            </h2>
            <ProgressBar value={100} color="green" label="Upload Complete" />
          </section>

          {/* 3. Red Error Bar */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              3️⃣ Red Error Bar (20%)
            </h2>
            <ProgressBar value={20} color="red" label="Failed" showPercentage />
          </section>

          {/* 4. Striped Blue */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              4️⃣ Striped Blue
            </h2>
            <ProgressBar value={70} color="blue" striped label="Processing..." />
          </section>

          {/* 5. Animated Striped Yellow */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              5️⃣ Animated Striped Yellow
            </h2>
            <ProgressBar
              value={40}
              color="yellow"
              striped
              animated
              label="Installing..."
            />
          </section>

          {/* 6. Large Rounded Purple Gradient */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              6️⃣ Large Rounded Purple Gradient
            </h2>
            <ProgressBar
              value={90}
              gradient="purpleToPink"
              size="lg"
              rounded
              label="Almost Done"
            />
          </section>

          {/* 7. Thin Gray Static Bar */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              7️⃣ Thin Gray Static Bar (no animation)
            </h2>
            <ProgressBar
              value={15}
              color="gray"
              showPercentage={false}
              size="xs"
              label="Queued..."
              animatedFill={false}
            />
          </section>

          {/* 8. With Shadow and Outside Percentage */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              8️⃣ With Shadow and Outside Percentage
            </h2>
            <ProgressBar
              value={80}
              color="orange"
              shadow
              percentagePosition="outside"
              label="Storage Used"
            />
          </section>

          {/* 9. Label Inside */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              9️⃣ Label Inside
            </h2>
            <ProgressBar
              value={65}
              color="teal"
              label="Uploading Files"
              labelPosition="inside"
            />
          </section>

          {/* 10. Custom Gradient Blue → Green */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              🔟 Custom Gradient Blue → Green
            </h2>
            <ProgressBar
              value={55}
              gradient="blueToGreen"
              label="Rendering..."
            />
          </section>

          {/* 11. Extra Large with Shadow and Animation */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣1️⃣ Extra Large with Shadow and Animation
            </h2>
            <ProgressBar
              value={75}
              color="purple"
              size="xl"
              shadow
              striped
              animated
              label="Processing Video"
              percentagePosition="outside"
            />
          </section>

          {/* 12. Minimal */}
          {/* <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣2️⃣ Minimal (No label, no percentage)
            </h2>
            <ProgressBar value={33} color="pink" showPercentage={false} />
          </section> */}

          {/* 13. Full width with custom class */}
        <section className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
    1️⃣3️⃣ Full width with custom class
  </h2>
  <ProgressBar
    value={88}
    showPercentage={false}
    rounded={true}
     striped
     animated
    color='orange'
    label="Download Progress"
    className="my-4"
  />
</section>

          {/* 14. Inside label with percentage */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣4️⃣ Inside label with percentage
            </h2>
            <ProgressBar
              value={92}
              color="green"
              label="Syncing"
              labelPosition="inside"
              showPercentage={true}
              percentagePosition="inside"
            />
          </section>

          {/* 15. Multi-color gradient custom */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              1️⃣5️⃣ Multi-color gradient custom
            </h2>
            <ProgressBar
              value={45}
              gradient="custom"
              size="lg"
              rounded
              label="AI Processing"
              shadow
            />
          </section>

          {/* Size Comparison */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              📏 Size Comparison
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Extra Small (xs)</p>
                <ProgressBar value={60} color="blue" size="xs" showPercentage={false} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Small (sm)</p>
                <ProgressBar value={60} color="green" size="sm" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Medium (md)</p>
                <ProgressBar value={60} color="purple" size="md" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Large (lg)</p>
                <ProgressBar value={60} color="orange" size="lg" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Extra Large (xl)</p>
                <ProgressBar value={60} color="red" size="xl" />
              </div>
            </div>
          </section>

          {/* Color Variants */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              🎨 Color Variants
            </h2>
            <div className="space-y-4">
              <ProgressBar value={70} color="blue" label="Blue" />
              <ProgressBar value={70} color="green" label="Green" />
              <ProgressBar value={70} color="red" label="Red" />
              <ProgressBar value={70} color="yellow" label="Yellow" />
              <ProgressBar value={70} color="purple" label="Purple" />
              <ProgressBar value={70} color="orange" label="Orange" />
              <ProgressBar value={70} color="teal" label="Teal" />
              <ProgressBar value={70} color="pink" label="Pink" />
              <ProgressBar value={70} color="gray" label="Gray" />
            </div>
          </section>

          {/* Gradient Variants */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              🌈 Gradient Variants
            </h2>
            <div className="space-y-4">
              <ProgressBar
                value={85}
                gradient="blueToGreen"
                label="Blue to Green"
              />
              <ProgressBar
                value={85}
                gradient="redToYellow"
                label="Red to Yellow"
              />
              <ProgressBar
                value={85}
                gradient="purpleToPink"
                label="Purple to Pink"
              />
              <ProgressBar
                value={85}
                gradient="tealToBlue"
                label="Teal to Blue"
              />
              <ProgressBar
                value={85}
                gradient="custom"
                label="Custom Multi-color"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarDemo;
