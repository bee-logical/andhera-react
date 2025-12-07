import React from 'react';
import { IconProps } from '../types';

export const HelpCircle: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="9" r="8"/>
    <path d="M6.5 6.5a2.5 2.5 0 0 1 5 0c0 1.25-2.5 2-2.5 2"/>
    <line x1="9" y1="13" x2="9.01" y2="13"/>
  </svg>
);