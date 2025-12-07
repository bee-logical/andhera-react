import React from 'react';
import { IconProps } from '../types';

export const Rocket: React.FC<IconProps> = ({ 
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
    <path d="M4.5 16.5c-1.5 1.5-4 .5-4 .5s-1-2.5.5-4L3.5 10.5 7.5 14.5 4.5 16.5z"/>
    <path d="m13.5 3.5-2.42 2.42"/>
    <path d="M4.5 13.5 10 8c1-1 2.5-1.5 4-1.5s3 .5 4 1.5-1.5 3-1.5 4-0.5 3-1.5 4L10 13.5"/>
    <path d="M5.5 12.5 2 16"/>
    <circle cx="12" cy="6" r="1"/>
  </svg>
);