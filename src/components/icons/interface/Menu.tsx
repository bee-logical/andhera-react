import React from 'react';
import { IconProps } from '../types';

export const Menu: React.FC<IconProps> = ({ 
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
    <line x1="3" y1="5" x2="15" y2="5"/>
    <line x1="3" y1="9" x2="15" y2="9"/>
    <line x1="3" y1="13" x2="15" y2="13"/>
  </svg>
);