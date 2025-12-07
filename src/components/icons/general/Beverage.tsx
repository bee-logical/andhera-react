import React from 'react';
import { IconProps } from '../types';

export const Beer: React.FC<IconProps> = ({
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
        x="3.75"
        y="4.5"
        width="6.75"
        height="10.5"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M10.5 8.25H12C13.2426 8.25 14.25 9.25736 14.25 10.5V11.25C14.25 12.4926 13.2426 13.5 12 13.5H10.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M7.125 4.5V3.375C7.125 2.75368 7.62868 2.25 8.25 2.25C8.87132 2.25 9.375 2.75368 9.375 3.375V4.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6 7.5H8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M6 9.75H8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BeerOff: React.FC<IconProps> = ({
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
        x="3.75"
        y="4.5"
        width="6.75"
        height="10.5"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M10.5 8.25H12C13.2426 8.25 14.25 9.25736 14.25 10.5V11.25C14.25 12.4926 13.2426 13.5 12 13.5H10.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M7.125 4.5V3.375C7.125 2.75368 7.62868 2.25 8.25 2.25C8.87132 2.25 9.375 2.75368 9.375 3.375V4.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M2.25 2.25L15.75 15.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ALargeSmall: React.FC<IconProps> = ({
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
      <text
        x="3"
        y="12"
        fontSize="8"
        fontWeight="bold"
        fill={color}
      >
        A
      </text>
      <text
        x="10"
        y="9"
        fontSize="5"
        fill={color}
      >
        a
      </text>
      <path
        d="M7 6L12 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Accessibility: React.FC<IconProps> = ({
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
      <circle cx="9" cy="9" r="6.75" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="9" cy="5.25" r="1.125" fill={color} />
      <path
        d="M7.5 7.5H10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 8.25V12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.5 11.25L8.25 12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.5 11.25L9.75 12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Activity: React.FC<IconProps> = ({
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
        d="M16.125 9H13.5L11.25 15.75L6.75 2.25L4.5 9H1.875"
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
        cy="6.75"
        r="3.375"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.75 8.25C6.75 7.62868 7.25368 7.125 7.875 7.125C8.49632 7.125 9 7.62868 9 8.25"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="7.125"
        cy="5.25"
        r="0.375"
        fill={color}
      />
      <circle
        cx="10.875"
        cy="5.25"
        r="0.375"
        fill={color}
      />
      <path
        d="M5.625 13.5C6.375 11.625 7.875 10.125 9 10.125C10.125 10.125 11.625 11.625 12.375 13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};