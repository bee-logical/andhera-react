import React from 'react';
import { IconProps } from '../types';

export const Trash: React.FC<IconProps> = ({ 
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
    <polyline points="3,6 5,6 16,6"/>
    <path d="m8 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m3 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6h14"/>
    <line x1="8" y1="9" x2="8" y2="13"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
  </svg>
);