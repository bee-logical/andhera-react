import React from 'react';
import { IconProps } from '../types';

export const AudioWaveform: React.FC<IconProps> = ({
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
        d="M3 9V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M6 6V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 3V15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M12 6V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15 9V12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Award: React.FC<IconProps> = ({
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
        cy="7.5"
        r="4.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6 11.25L5.25 16.5L9 14.25L12.75 16.5L12 11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Axe: React.FC<IconProps> = ({
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
        d="M10.5 7.5L15.75 2.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M2.25 15.75L7.5 10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.5 7.5C12.1569 7.5 13.5 6.15685 13.5 4.5C13.5 2.84315 12.1569 1.5 10.5 1.5C8.84315 1.5 7.5 2.84315 7.5 4.5C7.5 6.15685 8.84315 7.5 10.5 7.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const Armchair: React.FC<IconProps> = ({
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
        d="M3 12V15.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15 12V15.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M3 12H15V9C15 6.51472 12.9853 4.5 10.5 4.5H7.5C5.01472 4.5 3 6.51472 3 9V12Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M3 7.5V6C3 4.34315 4.34315 3 6 3H12C13.6569 3 15 4.34315 15 6V7.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const Camera: React.FC<IconProps> = ({
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
        x="1.5"
        y="6"
        width="15"
        height="10.5"
        rx="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6 6L7.5 3H10.5L12 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="11.25"
        r="2.25"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const CameraOff: React.FC<IconProps> = ({
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
        d="M2.25 2.25L15.75 15.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M6.75 6H3C2.17157 6 1.5 6.67157 1.5 7.5V15C1.5 15.8284 2.17157 16.5 3 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M16.5 9V7.5C16.5 6.67157 15.8284 6 15 6H12L10.5 3H7.5L6.75 4.125"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.125 10.125C7.125 10.6983 7.40156 11.2375 7.875 11.625"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.875 11.25C10.875 12.4926 9.86756 13.5 8.625 13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};