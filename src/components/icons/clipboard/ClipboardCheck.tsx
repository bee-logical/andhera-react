import React from 'react';
import { IconProps } from '../types';

export const ClipboardCheck: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  strokeWidth = 2, 
  className,
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
