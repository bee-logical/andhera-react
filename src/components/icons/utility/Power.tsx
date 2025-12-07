import React from 'react';
import { IconProps } from '../types';

export const Power: React.FC<IconProps> = ({ 
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
    <path d="M9 2v10"/>
    <path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>
  </svg>
);