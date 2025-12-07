import React from 'react';
import { IconProps } from '../types';

export const Trophy: React.FC<IconProps> = ({ 
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M12 9h1.5a2.5 2.5 0 0 0 0-5H12"/>
    <path d="M6 4v6a6 6 0 0 0 6 0V4"/>
    <line x1="5" y1="17" x2="13" y2="17"/>
    <line x1="9" y1="13" x2="9" y2="17"/>
  </svg>
);