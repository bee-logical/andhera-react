import React from 'react';
import { IconProps } from '../types';

export const Shield: React.FC<IconProps> = ({ 
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
    <path d="M9 2l5.4 2.16a1 1 0 0 1 .6.9v6.84a4 4 0 0 1-1.8 3.34L9 17 4.8 15.24A4 4 0 0 1 3 11.9V5.06a1 1 0 0 1 .6-.9L9 2z"/>
  </svg>
);