import React from 'react';
import { IconProps } from '../types';

export const Volume: React.FC<IconProps> = ({ 
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
    <polygon points="8,6 5,8 2,8 2,10 5,10 8,12"/>
    <path d="m13 5.5a5 5 0 0 1 0 7"/>
    <path d="m10.5 7.5a2.5 2.5 0 0 1 0 3"/>
  </svg>
);