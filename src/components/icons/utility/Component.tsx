import React from 'react';
import { IconProps } from '../types';

export const Component: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2, 
  className,
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="5.5" y="5.5" width="6" height="6" rx="1"/>
    <rect x="12.5" y="5.5" width="6" height="6" rx="1"/>
    <rect x="5.5" y="12.5" width="6" height="6" rx="1"/>
    <rect x="12.5" y="12.5" width="6" height="6" rx="1"/>
  </svg>
);