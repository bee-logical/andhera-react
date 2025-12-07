import React from 'react';
import { IconProps } from '../types';

export const Monitor: React.FC<IconProps> = ({ 
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
    <rect x="1" y="3" width="16" height="10" rx="2" ry="2"/>
    <line x1="6" y1="17" x2="12" y2="17"/>
    <line x1="9" y1="13" x2="9" y2="17"/>
  </svg>
);