import React from 'react';
import { IconProps } from '../types';

export const ArrowBigLeft: React.FC<IconProps> = ({
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
        d="M9.75 3L5.25 9L9.75 15V12H15V6H9.75V3Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowBigRight: React.FC<IconProps> = ({
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
        d="M8.25 15L12.75 9L8.25 3V6H3V12H8.25V15Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowBigLeftDash: React.FC<IconProps> = ({
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
        d="M9.75 3L5.25 9L9.75 15V12H15V6H9.75V3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="2,2"
      />
    </svg>
  );
};

export const ArrowBigRightDash: React.FC<IconProps> = ({
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
        d="M8.25 15L12.75 9L8.25 3V6H3V12H8.25V15Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="2,2"
      />
    </svg>
  );
};

export const ArrowBigUp: React.FC<IconProps> = ({
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
        d="M3 8.25L9 3.75L15 8.25V8.25H12V15H6V8.25H3Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowBigUpDash: React.FC<IconProps> = ({
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
        d="M3 8.25L9 3.75L15 8.25V8.25H12V15H6V8.25H3Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="2,2"
      />
    </svg>
  );
};

export const ArrowDown10: React.FC<IconProps> = ({
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
        d="M3 15L6 12M6 12L9 15M6 12V3"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text 
        x="12.5" 
        y="8" 
        fontSize="8" 
        fill={color}
        textAnchor="middle"
      >
        1
      </text>
      <text 
        x="15.5" 
        y="13" 
        fontSize="8" 
        fill={color}
        textAnchor="middle"
      >
        0
      </text>
    </svg>
  );
};

export default { ArrowBigLeft, ArrowBigRight, ArrowBigLeftDash, ArrowBigRightDash, ArrowBigUp, ArrowBigUpDash, ArrowDown10 };