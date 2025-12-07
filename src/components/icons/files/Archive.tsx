import React from 'react';
import { IconProps } from '../types';

export const ArchiveX: React.FC<IconProps> = ({
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
      <rect
        x="2.25"
        y="6.75"
        width="13.5"
        height="9"
        rx="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M2.25 6.75H15.75V4.125C15.75 3.50368 15.2463 3 14.625 3H3.375C2.75368 3 2.25 3.50368 2.25 4.125V6.75Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.75 10.125L11.25 10.125"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.125 7.875L12.375 10.125L10.125 12.375"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.875 7.875L5.625 10.125L7.875 12.375"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Archive: React.FC<IconProps> = ({
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
      <rect
        x="2.25"
        y="6.75"
        width="13.5"
        height="9"
        rx="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M2.25 6.75H15.75V4.125C15.75 3.50368 15.2463 3 14.625 3H3.375C2.75368 3 2.25 3.50368 2.25 4.125V6.75Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.75 10.125H11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};