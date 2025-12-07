import React from 'react';
import { IconProps } from '../types';

export const Users: React.FC<IconProps> = ({ 
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
    <path d="M14 17v-2a4 4 0 0 0-3-3.87"/>
    <path d="m13 5.13a4 4 0 0 1 0 7.75"/>
    <circle cx="6" cy="5" r="4"/>
    <path d="M10 17v-2a4 4 0 0 0-4-4H2a4 4 0 0 0-4 4v2"/>
  </svg>
);