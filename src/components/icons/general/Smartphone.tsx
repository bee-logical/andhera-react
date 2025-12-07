import React from 'react';
import { IconProps } from '../types';

export const Smartphone: React.FC<IconProps> = ({ 
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
    <rect x="4" y="1" width="10" height="16" rx="2" ry="2"/>
    <line x1="9" y1="14" x2="9.01" y2="14"/>
  </svg>
);