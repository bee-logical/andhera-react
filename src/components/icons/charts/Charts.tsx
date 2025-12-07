import React from 'react';
import { IconProps } from '../types';

export const BarChart: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  className,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 14.25V11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M6.75 14.25V8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.5 14.25V3.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M14.25 14.25V6.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const LineChart: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  className,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 12L6.375 8.625L9.75 11.25L15 5.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="3" cy="12" r="1" fill={color} />
      <circle cx="6.375" cy="8.625" r="1" fill={color} />
      <circle cx="9.75" cy="11.25" r="1" fill={color} />
      <circle cx="15" cy="5.25" r="1" fill={color} />
    </svg>
  );
};

export const PieChart: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  className,
  strokeWidth = 2,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="9"
        cy="9"
        r="6.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M9 2.25V9L13.5 6.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};