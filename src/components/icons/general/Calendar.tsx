import React from 'react';
import { IconProps } from '../types';

export const Calendar: React.FC<IconProps> = ({ 
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
    <rect x="2" y="3" width="14" height="12" rx="2" ry="2"/>
    <line x1="16" y1="7" x2="2" y2="7"/>
    <line x1="5" y1="1" x2="5" y2="5"/>
    <line x1="13" y1="1" x2="13" y2="5"/>
  </svg>
);