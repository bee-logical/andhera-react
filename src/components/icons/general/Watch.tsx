import React from 'react';
import { IconProps } from '../types';

export const Watch: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="9" r="4"/>
    <path d="M6.5 3h3M6.5 15h3"/>
    <path d="M9 7v2l1.5 1.5"/>
  </svg>
);