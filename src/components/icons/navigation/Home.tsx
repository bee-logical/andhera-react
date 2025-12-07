import React from 'react';
import { IconProps } from '../types';

export const Home: React.FC<IconProps> = ({ 
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
    <path d="M3 9l6-6 6 6v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="8,17 8,11 10,11 10,17"/>
  </svg>
);