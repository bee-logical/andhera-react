import React from 'react';
import { IconProps } from '../types';

export const Edit: React.FC<IconProps> = ({ 
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
    <path d="M11 4H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/>
    <path d="m15.5 2.5-3 3L9 9l-1 4 4-1 3.5-3.5z"/>
    <path d="m13 4 1-1"/>
  </svg>
);