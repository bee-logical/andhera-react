import React from 'react';
import { IconProps } from '../types';

export const BookUp: React.FC<IconProps> = ({
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
        x="3"
        y="3.75"
        width="9"
        height="11.25"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.75V15H12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 6.75V11.25M9 6.75L7.5 8.25M9 6.75L10.5 8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BookUp2: React.FC<IconProps> = ({
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
        x="3"
        y="3.75"
        width="9"
        height="11.25"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.75V15H12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.5 8.25L9 6.75L10.5 8.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 11.25L9 9.75L10.5 11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BookType: React.FC<IconProps> = ({
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
        x="3"
        y="3.75"
        width="9"
        height="11.25"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.75V15H12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <text
        x="7.5"
        y="10"
        fontSize="4"
        textAnchor="middle"
        fill={color}
      >
        T
      </text>
      <path
        d="M5.25 7.5H10.5"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      <path
        d="M5.25 12H9"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BookText: React.FC<IconProps> = ({
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
        x="3"
        y="3.75"
        width="9"
        height="11.25"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.75V15H12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M5.25 6.75H10.5"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      <path
        d="M5.25 8.25H9.75"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      <path
        d="M5.25 9.75H10.5"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      <path
        d="M5.25 11.25H8.25"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BookUser: React.FC<IconProps> = ({
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
        x="3"
        y="3.75"
        width="9"
        height="11.25"
        rx="0.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.75V15H12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle
        cx="7.5"
        cy="7.125"
        r="1.125"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M5.25 11.25C5.25 10.5 6 9.75 7.5 9.75C9 9.75 9.75 10.5 9.75 11.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};