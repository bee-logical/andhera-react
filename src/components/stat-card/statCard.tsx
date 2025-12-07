'use client';
import React from 'react';
import {
  TrendingUpIcon,
  UsersIcon,
  ShoppingCartIcon,
  TargetIcon,
  TrendingDownIcon,
  type IconProps,
} from '@/utils/icons';

type IconComponent = (props: IconProps) => JSX.Element;

const iconMap: Record<string, IconComponent> = {
  TrendingUp: TrendingUpIcon,
  Users: UsersIcon,
  ShoppingCart: ShoppingCartIcon,
  Target: TargetIcon,
  TrendingDown: TrendingDownIcon,
};

interface StatsCardProps {
  data: {
    title: string;
    value: string | number;
    change: string;
    changeType: 'positive' | 'negative';
    color: string;
    icon: keyof typeof iconMap;
  };
}

export default function StatsCard({ data }: StatsCardProps) {
  const IconComponent = iconMap[data.icon] || TrendingUpIcon;
  const isPositive = data.changeType === 'positive';

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <div>
            <p className="card-title">{data.title}</p>
            <h4 className="card-value">{data.value}</h4>
          </div>
          <div
            className="icon-wrapper"
            style={{
              backgroundColor: `${data.color}20`, // light background
              color: data.color, // icon color
            }}
          >
            <IconComponent size={24} />
          </div>
        </div>

        <span
          className={`chip ${isPositive ? 'chip-positive' : 'chip-negative'}`}
        >
          {isPositive ? <TrendingUpIcon size={14} /> : <TrendingDownIcon size={14} />}
          <span>{data.change}</span>
        </span>
      </div>
    </div>
  );
}
