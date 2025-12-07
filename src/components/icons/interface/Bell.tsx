import React from 'react';
import { IconProps } from '../types';

export const BellDot: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.375"
        cy="5.625"
        r="1.125"
        fill={color}
      />
    </svg>
  );
};

export const BellElectric: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.125 5.625L9.375 6.75L10.125 7.875"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 6.375L12 7.5L11.25 8.625"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellMinus: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 5.625H13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BellOff: React.FC<IconProps> = ({
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
        d="M3.75 3.75L14.25 14.25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M11.0526 6.5V5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BellPlus: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.375 4.5V6.75M11.25 5.625H13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BellRing: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 6C1.5 6 2.25 4.5 4.5 4.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 6C16.5 6 15.75 4.5 13.5 4.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Bell: React.FC<IconProps> = ({
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
        d="M8.25 3C7.50736 3 6.79521 3.29508 6.26884 3.82145C5.74248 4.34782 5.4474 5.05998 5.4474 5.80262C5.4474 8.25 4.5 9 4.5 9H12C12 9 11.0526 8.25 11.0526 5.80262C11.0526 5.05998 10.7575 4.34782 10.2312 3.82145C9.70481 3.29508 8.99264 3 8.25 3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M6.75 12C6.9 12.75 7.575 13.5 8.25 13.5C8.925 13.5 9.6 12.75 9.75 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};