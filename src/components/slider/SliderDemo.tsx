'use client';

import React, { useState } from 'react';
import Slider from './Slider';

const SliderDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState(50);
  const [volumeValue, setVolumeValue] = useState(75);
  const [priceRange, setPriceRange] = useState({ start: 25, end: 75 });
  const [verticalValue, setVerticalValue] = useState(60);
  const [temperatureValue, setTemperatureValue] = useState(22);

  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-12 bg-white dark:bg-gray-900">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Slider Component Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A fully customizable, accessible slider component with multiple variants, sizes, and features.
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Basic Usage</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Basic Slider"
            value={basicValue}
            onChange={setBasicValue}
            description="Drag the handle or click on the track to change the value"
          />
          
          <Slider
            label="With Tooltip"
            defaultValue={30}
            showTooltip
            description="Tooltip shows current value while dragging"
          />
          
          <Slider
            label="With Steps & Value Labels"
            defaultValue={50}
            showSteps
            showValueLabels
            step={10}
            description="Visual step markers and min/max/current labels"
          />
        </div>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Color Variants</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Default"
            variant="default"
            defaultValue={40}
            showTooltip
          />
          
          <Slider
            label="Primary"
            variant="primary"
            defaultValue={50}
            showTooltip
          />
          
          <Slider
            label="Secondary"
            variant="secondary"
            defaultValue={60}
            showTooltip
          />
          
          <Slider
            label="Success"
            variant="success"
            defaultValue={70}
            showTooltip
          />
          
          <Slider
            label="Warning"
            variant="warning"
            defaultValue={80}
            showTooltip
          />
          
          <Slider
            label="Danger"
            variant="danger"
            defaultValue={30}
            showTooltip
          />
          
          <Slider
            label="Info"
            variant="info"
            defaultValue={65}
            showTooltip
          />
          
          <Slider
            label="Dark"
            variant="dark"
            defaultValue={55}
            showTooltip
          />
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Sizes</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Small (sm)"
            size="sm"
            variant="primary"
            defaultValue={30}
            showTooltip
          />
          
          <Slider
            label="Medium (md) - Default"
            size="md"
            variant="success"
            defaultValue={50}
            showTooltip
          />
          
          <Slider
            label="Large (lg)"
            size="lg"
            variant="danger"
            defaultValue={70}
            showTooltip
          />
        </div>
      </section>

      {/* Range Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Range Slider</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Price Range"
            range
            min={0}
            max={1000}
            step={10}
            valueStart={priceRange.start}
            valueEnd={priceRange.end}
            onRangeChange={(start, end) => setPriceRange({ start, end })}
            showTooltip
            tooltipFormat={(val) => `$${val}`}
            showValueLabels
            variant="success"
            size="md"
            description={`Selected range: $${priceRange.start} - $${priceRange.end}`}
          />
          
          <Slider
            label="Age Range"
            range
            min={18}
            max={100}
            step={1}
            defaultValue={50}
            showTooltip
            showSteps={false}
            showValueLabels
            variant="info"
          />
          
          <Slider
            label="Time Range (Hours)"
            range
            min={0}
            max={24}
            step={1}
            defaultValue={12}
            showTooltip
            tooltipFormat={(val) => `${val}:00`}
            variant="primary"
            size="lg"
          />
        </div>
      </section>

      {/* Tooltip Positions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tooltip Positions</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Tooltip Top (default)"
            tooltipPosition="top"
            showTooltip
            defaultValue={40}
            variant="primary"
          />
          
          <Slider
            label="Tooltip Bottom"
            tooltipPosition="bottom"
            showTooltip
            defaultValue={60}
            variant="success"
          />
        </div>
      </section>

      {/* Custom Formatting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Custom Tooltip Formatting</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Volume Control"
            value={volumeValue}
            onChange={setVolumeValue}
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            variant="info"
            description={`Current volume: ${volumeValue}%`}
          />
          
          <Slider
            label="Temperature Control"
            min={-10}
            max={50}
            value={temperatureValue}
            onChange={setTemperatureValue}
            showTooltip
            tooltipFormat={(val) => `${val}°C`}
            variant="warning"
            showValueLabels
            description={`Current temperature: ${temperatureValue}°C`}
          />
          
          <Slider
            label="File Size"
            min={0}
            max={100}
            defaultValue={45}
            showTooltip
            tooltipFormat={(val) => `${val} MB`}
            variant="primary"
          />
        </div>
      </section>

      {/* Vertical Orientation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Vertical Orientation</h2>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex gap-8 justify-center items-start">
            <Slider
              label="Volume"
              orientation="vertical"
              value={verticalValue}
              onChange={setVerticalValue}
              showTooltip
              tooltipPosition="right"
              tooltipFormat={(val) => `${val}%`}
              variant="primary"
              size="sm"
            />
            
            <Slider
              label="Bass"
              orientation="vertical"
              defaultValue={50}
              showTooltip
              tooltipPosition="right"
              variant="success"
              size="md"
            />
            
            <Slider
              label="Treble"
              orientation="vertical"
              defaultValue={60}
              showTooltip
              tooltipPosition="left"
              variant="info"
              size="lg"
              showSteps
              step={10}
            />
            
            <Slider
              label="Balance"
              orientation="vertical"
              range
              min={-50}
              max={50}
              defaultValue={0}
              showTooltip
              tooltipPosition="right"
              variant="warning"
              size="md"
              showValueLabels
            />
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">States</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Normal State"
            defaultValue={50}
            variant="primary"
            showTooltip
          />
          
          <Slider
            label="Disabled State"
            defaultValue={50}
            variant="danger"
            disabled
            showTooltip
            description="This slider is disabled and cannot be interacted with"
          />
        </div>
      </section>

      {/* Advanced Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Advanced Examples</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="CPU Usage Monitor"
            min={0}
            max={100}
            defaultValue={45}
            step={1}
            showTooltip
            tooltipFormat={(val) => `${val}% CPU`}
            variant="warning"
            size="lg"
            showValueLabels
            showSteps={false}
            description="Real-time CPU usage simulation"
          />
          
          <Slider
            label="Brightness Control"
            min={0}
            max={100}
            defaultValue={80}
            step={5}
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            variant="primary"
            showSteps
            description="Adjust screen brightness"
          />
          
          <Slider
            label="Zoom Level"
            min={25}
            max={200}
            defaultValue={100}
            step={25}
            showTooltip
            tooltipFormat={(val) => `${val}%`}
            variant="info"
            showSteps
            showValueLabels
            description="Page zoom level"
          />
        </div>
      </section>

      {/* Custom Styling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Custom Styling</h2>
        <div className="space-y-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Slider
            label="Custom Track Color"
            defaultValue={50}
            variant="primary"
            trackClassName="bg-purple-100 dark:bg-purple-900"
            fillClassName="bg-gradient-to-r from-purple-500 to-pink-500"
            thumbClassName="border-purple-500 shadow-lg shadow-purple-500/50"
            showTooltip
          />
          
          <Slider
            label="Custom Label & Tooltip"
            defaultValue={70}
            variant="success"
            labelClassName="text-lg font-bold text-green-700 dark:text-green-400"
            tooltipClassName="bg-green-700 text-white font-semibold"
            showTooltip
            description="Customized styling with className props"
          />
        </div>
      </section>

      {/* Keyboard Navigation Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Accessibility & Keyboard Navigation</h2>
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              All sliders are fully accessible and support keyboard navigation:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> - Focus on slider thumb</li>
              <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Arrow Right/Up</kbd> - Increase value</li>
              <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Arrow Left/Down</kbd> - Decrease value</li>
              <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Home</kbd> - Jump to minimum value</li>
              <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">End</kbd> - Jump to maximum value</li>
            </ul>
            <Slider
              label="Try keyboard navigation on this slider"
              defaultValue={50}
              variant="info"
              showTooltip
              showValueLabels
              description="Click to focus, then use arrow keys to adjust"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SliderDemo;
