import React from 'react';
import { IconProps } from '../types';

export const Info: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="9" r="8"/>
    <line x1="9" y1="6" x2="9" y2="10"/>
    <line x1="9" y1="13" x2="9.01" y2="13"/>
  </svg>
);