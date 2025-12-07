import React from 'react';
import { IconProps } from '../types';

export const ChartLine: React.FC<IconProps> = ({
  size = 18,
  color = 'currentColor',
  strokeWidth = 2,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2.25 12.75L6 9L9.75 11.25L15.75 5.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="2.25"
        cy="12.75"
        r="1"
        fill={color}
      />
      <circle
        cx="6"
        cy="9"
        r="1"
        fill={color}
      />
      <circle
        cx="9.75"
        cy="11.25"
        r="1"
        fill={color}
      />
      <circle
        cx="15.75"
        cy="5.25"
        r="1"
        fill={color}
      />
    </svg>
  );
};

export default ChartLine;