import React from 'react';
import { IconProps } from '../types';

export const Star: React.FC<IconProps> = ({ 
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
    <polygon points="9,2 11.09,6.26 16,7 12,10.74 13.18,15.74 9,13.5 4.82,15.74 6,10.74 2,7 6.91,6.26"/>
  </svg>
);