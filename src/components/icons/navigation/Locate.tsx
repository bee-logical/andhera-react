import React from 'react';
import { IconProps } from '../types';

export const Locate: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="9" r="3"/>
    <path d="M9 1v2"/>
    <path d="M9 15v2"/>
    <path d="M17 9h-2"/>
    <path d="M3 9H1"/>
    <path d="m15.36 15.36-1.41-1.41"/>
    <path d="m4.05 4.05-1.41-1.41"/>
    <path d="m15.36 2.64-1.41 1.41"/>
    <path d="m4.05 13.95-1.41 1.41"/>
  </svg>
);