"use client";
import React from "react";
import { classNames } from "@/utils/classNames";

type CardVariant = "basic" | "elevated" | "outlined" | "gradient" | "interactive";

type HeaderConfig = {
  title: string;
  subheader?: string;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
};

type MediaConfig = {
  image: string;
  component?: "img" | "div";
  height?: number;
  title?: string;
  props?: React.HTMLAttributes<HTMLDivElement> & React.ImgHTMLAttributes<HTMLImageElement>;
};

type ContentConfig = {
  node: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
};

type ActionConfig = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "primary" | "secondary" | "neutral";
  size?: "sm" | "md" | "lg";
};

type CollapseConfig = {
  node: React.ReactNode;
  expanded: boolean;
  props?: React.HTMLAttributes<HTMLDivElement>;
};

export interface CustomCardProps {
  header?: HeaderConfig;
  media?: MediaConfig | null;
  content?: ContentConfig;
  actions?: ActionConfig[];
  collapse?: CollapseConfig;
  actionArea?: boolean;
  paperProps?: React.HTMLAttributes<HTMLDivElement>;
  cardProps?: React.HTMLAttributes<HTMLDivElement>;
  variant?: CardVariant;
  sx?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const variantClasses: Record<CardVariant, string> = {
  basic: "bg-white border border-gray-200 shadow-sm",
  elevated: "bg-white shadow-lg border border-transparent",
  outlined: "bg-white border border-gray-300",
  gradient: "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white",
  interactive:
    "bg-white border border-gray-200 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg",
};

const sizeClasses: Record<NonNullable<ActionConfig["size"]>, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const colorClasses: Record<NonNullable<ActionConfig["color"]>, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50",
  neutral: "bg-gray-100 text-gray-700 hover:bg-gray-200",
};

const CustomCard: React.FC<CustomCardProps> = ({
  header,
  media,
  content,
  actions,
  collapse,
  actionArea = false,
  paperProps,
  cardProps,
  variant = "basic",
  sx,
  className,
  onClick,
}) => {
  const { className: paperClassName, ...restPaperProps } = paperProps ?? {};
  const {
    className: cardClassName,
    onClick: cardOnClick,
    onKeyDown: cardOnKeyDown,
    role: cardRole,
    tabIndex: cardTabIndex,
    ...restCardProps
  } = cardProps ?? {};

  const isInteractive = actionArea || variant === "interactive" || Boolean(onClick);

  const handleCardClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    cardOnClick?.(event);
    onClick?.(event);
  };

  const handleCardKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    cardOnKeyDown?.(event);
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  const wrapperClasses = classNames("rounded-2xl overflow-hidden", paperClassName);

  const cardClasses = classNames(
    "flex flex-col gap-4 p-6 h-full transition-colors duration-200",
    variantClasses[variant],
    isInteractive ? "cursor-pointer" : undefined,
    className,
    cardClassName
  );

  const renderMedia = () => {
    if (!media) return null;

    const { component = "img", image, height = 180, title, props } = media;

    if (component === "img") {
      const { className: mediaClassName, ...restMediaProps } = props ?? {};
      return (
        <img
          src={image}
          alt={title ?? "Card media"}
          style={{ height }}
          className={classNames("w-full object-cover rounded-xl", mediaClassName)}
          {...restMediaProps}
        />
      );
    }

    const { className: mediaClassName, ...restMediaProps } = props ?? {};
    return (
      <div
        style={{ height, backgroundImage: `url(${image})` }}
        className={classNames("w-full bg-cover bg-center rounded-xl", mediaClassName)}
        {...restMediaProps}
      />
    );
  };

  const renderHeader = () => {
    if (!header) return null;

    const { title, subheader, avatar, action, props } = header;
    const { className: headerClassName, ...restHeaderProps } = props ?? {};

    return (
      <div
        className={classNames("flex items-start justify-between gap-4", headerClassName)}
        {...restHeaderProps}
      >
        <div className="flex items-start gap-3">
          {avatar && <div className="mt-1">{avatar}</div>}
          <div>
            <h3 className="text-lg font-semibold leading-tight">{title}</h3>
            {subheader && <p className="text-sm text-gray-500 mt-0.5">{subheader}</p>}
          </div>
        </div>
        {action && <div>{action}</div>}
      </div>
    );
  };

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {actions.map(({ label, onClick: actionClick, color = "primary", size = "md" }, index) => (
          <button
            key={`${label}-${index}`}
            type="button"
            onClick={actionClick}
            className={classNames(
              "rounded-lg font-medium transition-colors",
              sizeClasses[size],
              colorClasses[color]
            )}
          >
            {label}
          </button>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (!content?.node) return null;

    const { className: contentClassName, ...restContentProps } = content.props ?? {};
    return (
      <div
        className={classNames("text-sm text-gray-700", contentClassName)}
        {...restContentProps}
      >
        {content.node}
      </div>
    );
  };

  const renderCollapse = () => {
    if (!collapse?.expanded) return null;

    const { className: collapseClassName, ...restCollapseProps } = collapse.props ?? {};
    return (
      <div
        className={classNames("rounded-xl bg-gray-50 p-4 text-sm text-gray-700", collapseClassName)}
        {...restCollapseProps}
      >
        {collapse.node}
      </div>
    );
  };

  return (
    <div {...restPaperProps} className={wrapperClasses}>
      <div
        {...restCardProps}
        role={isInteractive ? "button" : cardRole}
        tabIndex={isInteractive ? 0 : cardTabIndex}
        onClick={isInteractive ? handleCardClick : cardOnClick}
        onKeyDown={isInteractive ? handleCardKeyDown : cardOnKeyDown}
        className={cardClasses}
        style={sx}
      >
        {renderHeader()}
        {renderMedia()}
        {renderContent()}
        {renderActions()}
        {renderCollapse()}
      </div>
    </div>
  );
};

export default CustomCard;
