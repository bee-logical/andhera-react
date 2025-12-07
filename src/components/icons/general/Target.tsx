import React from 'react';
import { IconProps } from '../types';

export const Target: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="9" r="5"/>
    <circle cx="9" cy="9" r="2"/>
  </svg>
);