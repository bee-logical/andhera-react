import React from 'react';
import { IconProps } from '../types';

export const MessageCircle: React.FC<IconProps> = ({ 
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
    <path d="M9 15c3.866 0 7-2.688 7-6s-3.134-6-7-6-7 2.688-7 6c0 1.19.39 2.307 1.068 3.246L2 15l3.246-1.068C6.193 14.61 7.31 15 9 15z"/>
  </svg>
);