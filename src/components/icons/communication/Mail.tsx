import React from 'react';
import { IconProps } from '../types';

export const Mail: React.FC<IconProps> = ({ 
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
    <rect x="2" y="4" width="14" height="10" rx="2"/>
    <polyline points="16,6 9,10 2,6"/>
  </svg>
);