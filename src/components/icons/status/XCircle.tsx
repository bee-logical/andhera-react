import React from 'react';
import { IconProps } from '../types';

export const XCircle: React.FC<IconProps> = ({ 
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
    <line x1="12" y1="6" x2="6" y2="12"/>
    <line x1="6" y1="6" x2="12" y2="12"/>
  </svg>
);