import React from 'react';
import { IconProps } from '../types';

export const X: React.FC<IconProps> = ({ 
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
    <line x1="14" y1="4" x2="4" y2="14"/>
    <line x1="4" y1="4" x2="14" y2="14"/>
  </svg>
);