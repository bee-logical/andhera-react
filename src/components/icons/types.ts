export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export interface IconComponent extends React.FC<IconProps> {}