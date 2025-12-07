import React from 'react';
import { IconProps } from '../types';

export const Phone: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2, 
  className,
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15.05 14.95c0 0.55-0.196 1.021-0.588 1.413S13.55 16.95 13 16.95c-1.15 0-2.458-0.267-3.925-0.8S6.55 14.55 5.55 13.55s-1.617-2.108-2.15-3.575S2.6 7.15 2.6 6c0-0.55 0.196-1.021 0.588-1.413S4.1 4.05 4.65 4.05h2.8c0.267 0 0.5 0.1 0.7 0.3s0.317 0.442 0.35 0.725l0.4 2c0.033 0.267-0.008 0.5-0.125 0.7s-0.292 0.35-0.525 0.45l-1.2 0.6c0.267 0.6 0.633 1.158 1.1 1.675s1.075 0.833 1.675 1.1l0.6-1.2c0.1-0.233 0.25-0.408 0.45-0.525s0.433-0.158 0.7-0.125l2 0.4c0.283 0.033 0.525 0.15 0.725 0.35s0.3 0.433 0.3 0.7v2.8z"/>
  </svg>
);