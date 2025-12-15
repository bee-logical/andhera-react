import React from 'react';
import { IconProps } from '../types';

export const ClipboardLoading: React.FC<IconProps> = ({ 
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
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    <path
      className="opacity-75"
      fill={color}
      d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
    />
  </svg>
);
