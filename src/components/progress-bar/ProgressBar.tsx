"use client";

import React, { useEffect } from 'react';

interface ProgressBarProps {
  /** Progress value (0–100) */
  value: number;

  /** Optional label shown above or inside bar */
  label?: string;

  /** Color variants for the bar */
  color?: string;

  /** Size of the bar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Rounded corners */
  rounded?: boolean;

  /** Striped pattern */
  striped?: boolean;

  /** Animated stripes */
  animated?: boolean;

  /** Show percentage text */
  showPercentage?: boolean;

  /** Place percentage text */
  percentagePosition?: 'inside' | 'outside';

  /** Optional gradient background */
  gradient?:
    | 'blueToGreen'
    | 'redToYellow'
    | 'purpleToPink'
    | 'tealToBlue'
    | 'custom';

  /** Optional label position (top or inside bar) */
  labelPosition?: 'top' | 'inside';

  /** Optional animation for bar fill (smooth grow effect) */
  animatedFill?: boolean;

  /** Optional shadow effect under bar */
  shadow?: boolean;

  /** Optional custom className */
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  color,
  size = 'md',
  rounded = true,
  striped = false,
  animated = false,
  showPercentage = true,
  percentagePosition = 'inside',
  gradient,
  labelPosition = 'top',
  animatedFill = true,
  shadow = false,
  className = '',
}) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  // Inject striped animation styles on client-side only
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.querySelector('#progress-bar-styles')) {
      const style = document.createElement('style');
      style.id = 'progress-bar-styles';
      style.textContent = `
        @keyframes stripe {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 0;
          }
        }
        
        .animate-stripe {
          animation: stripe 1s linear infinite;
          background-size: 40px 40px;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Size mappings
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5',
  };

  // Color mappings
  // const colorClasses = {
  //   blue: 'bg-blue-500',
  //   green: 'bg-green-500',
  //   red: 'bg-red-500',
  //   yellow: 'bg-yellow-500',
  //   purple: 'bg-purple-500',
  //   orange: 'bg-orange-500',
  //   teal: 'bg-teal-500',
  //   pink: 'bg-pink-500',
  //   gray: 'bg-gray-500',
  // };

  // Gradient mappings
  const gradientClasses = {
    blueToGreen: 'bg-gradient-to-r from-blue-500 to-green-500',
    redToYellow: 'bg-gradient-to-r from-red-500 to-yellow-500',
    purpleToPink: 'bg-gradient-to-r from-purple-500 to-pink-500',
    tealToBlue: 'bg-gradient-to-r from-teal-500 to-blue-500',
    custom: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
  };

  // Determine background class
  const bgClass = gradient ? gradientClasses[gradient] : color || "bg-[var(--navbar-bg)]";

  // Build bar classes
  const barClasses = [
    sizeClasses[size],
    bgClass,
    rounded ? 'rounded-full' : 'rounded-none',
    animatedFill ? 'transition-all duration-500 ease-in-out' : '',
    'relative',
    'overflow-hidden',
  ].join(' ');

  // Container classes
  const containerClasses = [
    'w-full',
    'bg-gray-200',
    rounded ? 'rounded-full' : 'rounded-none',
    shadow ? 'shadow-md' : '',
    'relative',
    'border border-gray-200',
  ].join(' ');

  // Striped pattern styles
  const stripedStyle = striped
    ? {
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
      }
    : {};

  // Animation for stripes
  const animatedStripeClass = animated && striped ? 'animate-stripe' : '';

  return (
    <div className={`w-full ${className}`}>
      {/* Label at top */}
      {label && labelPosition === 'top' && (
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
          {showPercentage && percentagePosition === 'outside' && (
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar container */}
      <div
        className={containerClasses}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Progress bar fill */}
        <div
          className={`${barClasses} ${animatedStripeClass} flex items-center justify-center`}
          style={{
            width: `${clampedValue}%`,
            ...stripedStyle,
          }}
        >
          {/* Label inside bar */}
          {label && labelPosition === 'inside' && clampedValue > 20 && (
            <span className="text-xs font-semibold text-white px-2 truncate">
              {label}
            </span>
          )}

          {/* Percentage inside bar */}
          {showPercentage &&
            percentagePosition === 'inside' &&
            clampedValue > 10 && (
              <span className="text-xs font-bold text-white px-1">
                {clampedValue}%
              </span>
            )}
        </div>
      </div>

      {/* Percentage outside (below bar) - alternative position */}
      {!label &&
        showPercentage &&
        percentagePosition === 'outside' &&
        labelPosition !== 'top' && (
          <div className="mt-1 text-right">
            <span className="text-sm font-semibold text-gray-700">
              {clampedValue}%
            </span>
          </div>
        )}
    </div>
  );
};

export default ProgressBar;

/* ✅ USAGE EXAMPLES:

// 1. Default
<ProgressBar value={50} label="Loading data..." />

// 2. Solid Green (Success)
<ProgressBar value={100} color="green" label="Upload Complete" />

// 3. Red Error Bar (20%)
<ProgressBar value={20} color="red" label="Failed" showPercentage />

// 4. Striped Blue
<ProgressBar value={70} color="blue" striped label="Processing..." />

// 5. Animated Striped Yellow
<ProgressBar value={40} color="yellow" striped animated label="Installing..." />

// 6. Large Rounded Purple Gradient
<ProgressBar value={90} gradient="purpleToPink" size="lg" rounded label="Almost Done" />

// 7. Thin Gray Static Bar (no animation)
<ProgressBar value={15} color="gray" size="xs" label="Queued..." animatedFill={false} />

// 8. With Shadow and Outside Percentage
<ProgressBar value={80} color="orange" shadow percentagePosition="outside" label="Storage Used" />

// 9. Label Inside
<ProgressBar value={65} color="teal" label="Uploading Files" labelPosition="inside" />

// 10. Custom Gradient Blue → Green
<ProgressBar value={55} gradient="blueToGreen" label="Rendering..." />

// 11. Extra Large with Shadow and Animation
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

// 12. Minimal (No label, no percentage)
<ProgressBar value={33} color="pink" showPercentage={false} />

// 13. Full width with custom class
<ProgressBar 
  value={88} 
  gradient="tealToBlue" 
  label="Download Progress" 
  className="my-4"
/>

// 14. Inside label with percentage
<ProgressBar 
  value={92} 
  color="green" 
  label="Syncing" 
  labelPosition="inside" 
  showPercentage={true}
  percentagePosition="inside"
/>

// 15. Multi-color gradient custom
<ProgressBar 
  value={45} 
  gradient="custom" 
  size="lg" 
  rounded 
  label="AI Processing"
  shadow
/>

*/
