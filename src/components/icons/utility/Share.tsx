import React from 'react';
import { IconProps } from '../types';

export const Share: React.FC<IconProps> = ({ 
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
    <circle cx="15" cy="4" r="2"/>
    <circle cx="3" cy="9" r="2"/>
    <circle cx="15" cy="14" r="2"/>
    <line x1="5.26" y1="7.72" x2="12.74" y2="5.28"/>
    <line x1="5.26" y1="10.28" x2="12.74" y2="12.72"/>
  </svg>
);