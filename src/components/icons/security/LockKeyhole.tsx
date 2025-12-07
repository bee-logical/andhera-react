import React from 'react';
import { IconProps } from '../types';

export const LockKeyhole: React.FC<IconProps> = ({ 
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
    <rect x="3" y="8" width="12" height="7" rx="2" ry="2"/>
    <path d="M7 8V5a2 2 0 0 1 4 0v3"/>
    <circle cx="9" cy="11" r="1"/>
    <path d="M9 12v2"/>
  </svg>
);