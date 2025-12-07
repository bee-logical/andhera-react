import React from 'react';
import { IconProps } from '../types';

export const AArrowDown: React.FC<IconProps> = ({
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
        d="M9 2.25V15.75M9 15.75L3.375 10.125M9 15.75L14.625 10.125"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AArrowUp: React.FC<IconProps> = ({
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
        d="M9 15.75V2.25M9 2.25L3.375 7.875M9 2.25L14.625 7.875"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowBigDown: React.FC<IconProps> = ({
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
        d="M6.75 2.25H11.25V9H15.75L9 15.75L2.25 9H6.75V2.25Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.1"
      />
    </svg>
  );
};

export const ArrowBigDownDash: React.FC<IconProps> = ({
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
        d="M6.75 2.25H11.25V9H15.75L9 15.75L2.25 9H6.75V2.25Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeDasharray="3 3"
      />
    </svg>
  );
};