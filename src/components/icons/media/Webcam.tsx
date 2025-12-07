import React from 'react';
import { IconProps } from '../types';

export const Webcam: React.FC<IconProps> = ({ 
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
    <circle cx="9" cy="7" r="5"/>
    <circle cx="9" cy="7" r="2"/>
    <path d="M4 15h10l-1-3H5z"/>
  </svg>
);