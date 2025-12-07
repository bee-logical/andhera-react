import React from 'react';
import { IconProps } from '../types';

export const ChartColumn: React.FC<IconProps> = ({
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
      <rect
        x="2.25"
        y="9"
        width="2.25"
        height="6.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="6.75"
        y="6"
        width="2.25"
        height="9.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="11.25"
        y="3"
        width="2.25"
        height="12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export const ChartColumnStacked: React.FC<IconProps> = ({
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
      <rect
        x="2.25"
        y="9"
        width="2.25"
        height="6.75"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="2.25"
        y="6.75"
        width="2.25"
        height="2.25"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="6.75"
        y="6"
        width="2.25"
        height="9.75"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="6.75"
        y="3.75"
        width="2.25"
        height="2.25"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="11.25"
        y="3"
        width="2.25"
        height="12.75"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="11.25"
        y="1.5"
        width="2.25"
        height="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export const ChartColumnIncreasing: React.FC<IconProps> = ({
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
      <rect
        x="1.5"
        y="12"
        width="2.25"
        height="4.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="5.25"
        y="9"
        width="2.25"
        height="7.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="9"
        y="6"
        width="2.25"
        height="10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="12.75"
        y="3"
        width="2.25"
        height="13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d="M13.125 2.625L15 4.5L16.5 3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChartNetwork: React.FC<IconProps> = ({
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
      <circle cx="4.5" cy="4.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="13.5" cy="4.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="4.5" cy="13.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="13.5" cy="13.5" r="1.5" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="9" cy="9" r="1.5" stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M5.625 5.625L7.875 7.875"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.125 7.875L12.375 5.625"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M7.875 10.125L5.625 12.375"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10.125 10.125L12.375 12.375"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ChartNoAxesColumnDecreasing: React.FC<IconProps> = ({
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
      <rect
        x="1.5"
        y="3"
        width="3"
        height="12"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="6"
        y="6"
        width="3"
        height="9"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="10.5"
        y="9"
        width="3"
        height="6"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="15"
        y="12"
        width="1.5"
        height="3"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export const ChartNoAxesColumnIncreasing: React.FC<IconProps> = ({
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
      <rect
        x="1.5"
        y="12"
        width="1.5"
        height="3"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="4.5"
        y="9"
        width="3"
        height="6"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="9"
        y="6"
        width="3"
        height="9"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="13.5"
        y="3"
        width="3"
        height="12"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export const ChartNoAxesCombined: React.FC<IconProps> = ({
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
      <rect
        x="1.5"
        y="9"
        width="2.25"
        height="6"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="5.25"
        y="6"
        width="2.25"
        height="9"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="9"
        y="3"
        width="2.25"
        height="12"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d="M13.5 4.5L15 3L16.5 4.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export const ChartNoAxesGantt: React.FC<IconProps> = ({
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
      <rect
        x="1.5"
        y="3"
        width="6"
        height="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="4.5"
        y="6"
        width="9"
        height="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="1.5"
        y="9"
        width="12"
        height="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <rect
        x="7.5"
        y="12"
        width="4.5"
        height="1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export const ChartPie: React.FC<IconProps> = ({
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
        cy="9"
        r="6.75"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M9 2.25V9L13.5 13.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ChartScatter: React.FC<IconProps> = ({
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
        d="M1.5 16.5L16.5 1.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M1.5 1.5V16.5H16.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4.5" cy="12" r="0.75" fill={color} />
      <circle cx="7.5" cy="9" r="0.75" fill={color} />
      <circle cx="10.5" cy="6" r="0.75" fill={color} />
      <circle cx="13.5" cy="3.75" r="0.75" fill={color} />
      <circle cx="6" cy="7.5" r="0.75" fill={color} />
      <circle cx="9" cy="4.5" r="0.75" fill={color} />
      <circle cx="12" cy="7.5" r="0.75" fill={color} />
    </svg>
  );
};

export const ChartSpline: React.FC<IconProps> = ({
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
        d="M1.5 1.5V16.5H16.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12C4.5 12 4.5 6 6 6C7.5 6 7.5 9 9 9C10.5 9 10.5 3 12 3C13.5 3 13.5 12 15 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default ChartColumn;