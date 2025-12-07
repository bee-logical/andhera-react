import React from 'react';
import { IconProps } from '../types';

export const FileText: React.FC<IconProps> = ({ 
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
    <path d="M10.5 1.5H4.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6.5L10.5 1.5z"/>
    <polyline points="10.5,1.5 10.5,6.5 15.5,6.5"/>
    <line x1="6.5" y1="9.5" x2="11.5" y2="9.5"/>
    <line x1="6.5" y1="11.5" x2="11.5" y2="11.5"/>
    <line x1="6.5" y1="7.5" x2="8.5" y2="7.5"/>
  </svg>
);