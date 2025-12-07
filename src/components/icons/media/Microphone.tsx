import React from 'react';
import { IconProps } from '../types';

export const Microphone: React.FC<IconProps> = ({ 
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
    <path d="M9 2a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
    <path d="M4.5 10a4.5 4.5 0 0 0 9 0"/>
    <line x1="9" y1="14" x2="9" y2="17"/>
    <line x1="6" y1="17" x2="12" y2="17"/>
  </svg>
);