import React from 'react';
import { IconProps } from '../types';

export const Upload: React.FC<IconProps> = ({ 
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
    <path d="M9 6v10"/>
    <path d="m13 10-4-4-4 4"/>
    <path d="M2 2h14"/>
  </svg>
);