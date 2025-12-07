import React from 'react';
import { IconProps } from '../types';

export const Database: React.FC<IconProps> = ({ 
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
    <ellipse cx="9" cy="4" rx="7" ry="2"/>
    <path d="M2 4v5c0 1.1 3.1 2 7 2s7-0.9 7-2V4"/>
    <path d="M2 9v5c0 1.1 3.1 2 7 2s7-0.9 7-2V9"/>
  </svg>
);