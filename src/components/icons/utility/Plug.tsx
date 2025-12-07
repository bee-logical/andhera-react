import React from 'react';
import { IconProps } from '../types';

export const Plug: React.FC<IconProps> = ({ 
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
    <path d="M12 1v6"/>
    <path d="M6 1v6"/>
    <path d="M6 7h6a4 4 0 0 1 0 8 2 2 0 0 1-2 2H8a2 2 0 0 1-2-2 4 4 0 0 1 0-8z"/>
  </svg>
);