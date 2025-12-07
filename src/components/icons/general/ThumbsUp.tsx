import React from 'react';
import { IconProps } from '../types';

export const ThumbsUp: React.FC<IconProps> = ({ 
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
    <path d="M7 10v6"/>
    <path d="M21 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h.4l4.9-6.3a1 1 0 0 1 1.6.1l2.5 4.3"/>
    <path d="m7 10 4.79-6.26A1 1 0 0 1 13 4a1 1 0 0 1 1 1v6"/>
  </svg>
);