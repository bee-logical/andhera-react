import type { SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "width" | "height"> {
  size?: number;
}

const resolveSize = (size?: number) => size ?? 20;

const baseProps = (size?: number) => ({
  width: resolveSize(size),
  height: resolveSize(size),
  viewBox: "0 0 20 20",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const PlusIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M10 4v12M4 10h12" />
  </svg>
);

export const MinusIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4 10h12" />
  </svg>
);

export const CheckCircleIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M9 12l2 2 4-4" />
    <circle cx={10} cy={10} r={7} />
  </svg>
);

export const AlertTriangleIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M9.5 5l-6 10h12l-6-10z" />
    <path d="M9.5 8v3" />
    <path d="M9.5 13h.01" />
  </svg>
);

export const InfoIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx={10} cy={10} r={7} />
    <path d="M10 9v4" />
    <path d="M10 6h.01" />
  </svg>
);

export const XCircleIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx={10} cy={10} r={7} />
    <path d="M7.5 7.5l5 5M12.5 7.5l-5 5" />
  </svg>
);

export const XIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M6 6l8 8M14 6l-8 8" />
  </svg>
);

export const ChevronDownIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M5 8l5 5 5-5" />
  </svg>
);

export const ChevronRightIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M7 5l6 5-6 5" />
  </svg>
);

export const ChevronLeftIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M13 5l-6 5 6 5" />
  </svg>
);

export const CalendarIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <rect x={4} y={5} width={12} height={11} rx={2} />
    <path d="M7 3v4" />
    <path d="M13 3v4" />
    <path d="M4 9h12" />
  </svg>
);

export const CheckIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M5.5 10.5l2.5 2.5 6-6" />
  </svg>
);

export const TrendingUpIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4 12l4-4 3 3 5-5" />
    <path d="M14 6h4v4" />
  </svg>
);

export const TrendingDownIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <path d="M4 8l4 4 3-3 5 5" />
    <path d="M14 14h4v-4" />
  </svg>
);

export const UsersIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx={7} cy={8} r={3} />
    <circle cx={13} cy={10} r={3} />
    <path d="M4 15c0-2 2.5-3 4-3" />
    <path d="M10 15c0-2 2.5-3 4-3" />
  </svg>
);

export const ShoppingCartIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx={7} cy={15} r={1.5} />
    <circle cx={13} cy={15} r={1.5} />
    <path d="M4 5h2l1.5 7h6l1.5-5H6" />
  </svg>
);

export const TargetIcon = ({ size, ...props }: IconProps) => (
  <svg {...baseProps(size)} {...props}>
    <circle cx={10} cy={10} r={7} />
    <circle cx={10} cy={10} r={4} />
    <circle cx={10} cy={10} r={1.5} fill="currentColor" />
  </svg>
);
