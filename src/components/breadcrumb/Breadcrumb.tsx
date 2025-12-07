"use client";
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'default' | 'with-icons' | 'with-steps' | 'pills' | 'arrows';
  separator?: 'chevron' | 'slash' | 'arrow' | 'none';
  size?: 'medium' | 'large';
  showHome?: boolean;
  className?: string;
  label?: string; // Optional visible and aria label
  stepLineWidth?: number; // px, for with-steps variant
}

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12H15V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  variant = 'default',
  separator = 'chevron',
  size = 'medium',
  showHome = true,
  className = '',
  label,
  stepLineWidth,
}) => {
  const renderSeparator = () => {
    if (
      separator === 'none' ||
      variant === 'arrows' ||
      variant === 'pills' ||
      variant === 'with-steps'
    ) return null;
    switch (separator) {
      case 'arrow':
        return <span className="breadcrumb-separator"><ArrowRight /></span>;
      case 'slash':
        return <span className="breadcrumb-separator breadcrumb-separator--slash">/</span>;
      case 'chevron':
      default:
        return <span className="breadcrumb-separator"><ChevronRight /></span>;
    }
  };

  const renderStepIndicator = (index: number, isActive: boolean, isCompleted: boolean) => {
    if (variant !== 'with-steps') return null;
    
    return (
      <span className={`breadcrumb-step-indicator ${isCompleted ? 'breadcrumb-step-indicator--completed' : ''}`}>
        {isCompleted ? <CheckIcon /> : index + 1}
      </span>
    );
  };

  const classNames = [
    'breadcrumb',
    `breadcrumb--${variant}`,
    `breadcrumb--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // For with-steps, set a CSS variable for the line width (default 40px)
  const navStyle: React.CSSProperties | undefined =
    variant === 'with-steps' && stepLineWidth
      ? { ['--breadcrumb-step-line-width']: `${stepLineWidth}px` } as React.CSSProperties
      : undefined;

  return (
    <nav className={classNames} aria-label={label || 'Breadcrumb'} style={navStyle}>
      {label && <div className="breadcrumb-heading" style={{fontWeight:600,marginBottom:8}}>{label}</div>}
      <ol className="breadcrumb-list">
        {showHome && variant !== 'with-steps' && (
          <>
            <li className="breadcrumb-item breadcrumb-item--home">
              <a href="/" className="breadcrumb-link">
                <HomeIcon />
              </a>
            </li>
            {items.length > 0 && renderSeparator()}
          </>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.isActive || isLast;
          const isCompleted = variant === 'with-steps' && index < items.length - 1;
          return (
            <React.Fragment key={index}>
              <li className={`breadcrumb-item ${isActive ? 'breadcrumb-item--active' : ''} ${isCompleted ? 'breadcrumb-item--completed' : ''}`}>
                {item.href && !isActive ? (
                  <a href={item.href} className="breadcrumb-link">
                    {renderStepIndicator(index, isActive, isCompleted)}
                    {item.icon && variant === 'with-icons' && (
                      <span className="breadcrumb-icon">{item.icon}</span>
                    )}
                    <span className="breadcrumb-label">{item.label}</span>
                  </a>
                ) : (
                  <span className="breadcrumb-current">
                    {renderStepIndicator(index, isActive, isCompleted)}
                    {item.icon && variant === 'with-icons' && (
                      <span className="breadcrumb-icon">{item.icon}</span>
                    )}
                    <span className="breadcrumb-label">{item.label}</span>
                  </span>
                )}
              </li>
              {!isLast && renderSeparator()}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;