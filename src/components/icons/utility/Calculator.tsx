import React from 'react';
import { IconProps } from '../types';

export const Calculator: React.FC<IconProps> = ({ 
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
    <rect x="3" y="2" width="12" height="14" rx="2"/>
    <rect x="5" y="4" width="8" height="2" rx="1"/>
    <line x1="6" y1="9" x2="6" y2="9"/>
    <line x1="9" y1="9" x2="9" y2="9"/>
    <line x1="12" y1="9" x2="12" y2="9"/>
    <line x1="6" y1="11" x2="6" y2="11"/>
    <line x1="9" y1="11" x2="9" y2="11"/>
    <line x1="12" y1="11" x2="12" y2="11"/>
    <line x1="6" y1="13" x2="6" y2="13"/>
    <line x1="9" y1="13" x2="12" y2="13"/>
  </svg>
);