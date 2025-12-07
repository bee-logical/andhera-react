import React from 'react';
import { IconProps } from '../types';

export const ZoomOut: React.FC<IconProps> = ({ 
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
    <circle cx="8" cy="8" r="6"/>
    <path d="m15 15-4.35-4.35"/>
    <line x1="6" y1="8" x2="10" y2="8"/>
  </svg>
);