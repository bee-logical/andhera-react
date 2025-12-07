import React from 'react';
import { IconProps } from '../types';

export const Ticket: React.FC<IconProps> = ({ 
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
    <path d="M2 9a3 3 0 0 1 0-6h14a3 3 0 0 1 0 6"/>
    <path d="M2 9a3 3 0 0 0 0 6h14a3 3 0 0 0 0-6"/>
    <path d="M9 3v18"/>
  </svg>
);