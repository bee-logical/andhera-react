import React from 'react';
import { IconProps } from '../types';

export const Wifi: React.FC<IconProps> = ({ 
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
    <path d="m1 8.5 6.32-6.32a10.18 10.18 0 0 1 14.36 0L28 8.5"/>
    <path d="m5 12.5 4.24-4.24a6 6 0 0 1 8.48 0L22 12.5"/>
    <path d="m9 16.5 2.12-2.12a2 2 0 0 1 2.83 0L16 16.5"/>
    <line x1="12" y1="20.5" x2="12.01" y2="20.5"/>
  </svg>
);