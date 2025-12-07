import React from 'react';
import { IconProps } from '../types';

export const Move: React.FC<IconProps> = ({ 
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
    <polyline points="5,9 1,5 5,1"/>
    <polyline points="13,1 17,5 13,9"/>
    <polyline points="9,5 5,1 9,13"/>
    <polyline points="1,9 5,13 9,9"/>
    <line x1="1" y1="5" x2="17" y2="5"/>
    <line x1="9" y1="1" x2="9" y2="17"/>
  </svg>
);