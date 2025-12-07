import React from 'react';
import { IconProps } from '../types';

export const Activity: React.FC<IconProps> = ({
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
        d="M16.5 9H13.5L11.25 12.75L6.75 5.25L4.5 9H1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Axis3D: React.FC<IconProps> = ({
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
        d="M3 15L9 9L15 15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3L9 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3L9 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Baby: React.FC<IconProps> = ({
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
      <circle
        cx="9"
        cy="6"
        r="3"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d="M6 13.5C6 12.12 7.12 11 8.5 11H9.5C10.88 11 12 12.12 12 13.5V15H6V13.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle cx="7.5" cy="6" r="0.5" fill={color} />
      <circle cx="10.5" cy="6" r="0.5" fill={color} />
    </svg>
  );
};

export default { Activity, Axis3D, Baby };