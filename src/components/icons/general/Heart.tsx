import React from 'react';
import { IconProps } from '../types';

export const Heart: React.FC<IconProps> = ({ 
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
    <path d="M15.91 4.16c-2-2-5.24-2-7.33 0l-.58.58-.58-.58c-2-2-5.24-2-7.33 0-2.08 2.08-2.08 5.49 0 7.58l7.91 7.91 7.91-7.91c2.08-2.08 2.08-5.49 0-7.58z"/>
  </svg>
);