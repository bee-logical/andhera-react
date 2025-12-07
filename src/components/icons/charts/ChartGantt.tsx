import React from 'react';
import { IconProps } from '../types';

export const ChartGantt: React.FC<IconProps> = ({
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
        d="M2.25 3.75h13.5M2.25 6.75h9M2.25 9.75h6M2.25 12.75h10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="15"
        cy="3.75"
        r="0.75"
        fill={color}
      />
      <circle
        cx="12"
        cy="6.75"
        r="0.75"
        fill={color}
      />
      <circle
        cx="9"
        cy="9.75"
        r="0.75"
        fill={color}
      />
      <circle
        cx="13.5"
        cy="12.75"
        r="0.75"
        fill={color}
      />
    </svg>
  );
};

export default ChartGantt;