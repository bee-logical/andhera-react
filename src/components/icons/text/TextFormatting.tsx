import React from 'react';
import { IconProps } from '../types';

export const Bold: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
  </svg>
);

export const Italic: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="19" y1="4" x2="10" y2="4"/>
    <line x1="14" y1="20" x2="5" y2="20"/>
    <line x1="15" y1="4" x2="9" y2="20"/>
  </svg>
);

export const Underline: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M6 4v6a6 6 0 0 0 12 0V4"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  </svg>
);

export const AlignLeft: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="15" y1="12" x2="3" y2="12"/>
    <line x1="17" y1="18" x2="3" y2="18"/>
  </svg>
);

export const AlignCenter: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="17" y1="12" x2="7" y2="12"/>
    <line x1="19" y1="18" x2="5" y2="18"/>
  </svg>
);

export const AlignRight: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
    <line x1="21" y1="18" x2="7" y2="18"/>
  </svg>
);

export const AlignJustify: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '',
  ...props 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="21" y1="6" x2="3" y2="6"/>
    <line x1="21" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="18" x2="3" y2="18"/>
  </svg>
);
