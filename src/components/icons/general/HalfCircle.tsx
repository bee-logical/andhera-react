import React from 'react';
import { IconProps } from '../types';

export const HalfCircle: React.FC<IconProps> = ({ 
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
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#000000"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10V2z" fill={color}/>
  </svg>
);