import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";

type SizeKey = "sm" | "md" | "lg" | number;

export interface RatingIconProps {
  size: number;
  percent: number;
  color: string;
  emptyColor: string;
  index: number;
  active: boolean;
  disabled: boolean;
  highlighted: boolean;
}

export interface RatingStarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number | null;
  defaultValue?: number | null;
  max?: number;
  precision?: number;
  onChange?:
    | ((event: React.SyntheticEvent | null, value: number | null) => void)
    | ((value: number) => void);
  onHoverChange?: (event: React.SyntheticEvent | null, value: number | null) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
  allowClear?: boolean;
  size?: SizeKey;
  color?: string;
  emptyColor?: string;
  hoverColor?: string;
  showValue?: boolean;
  valueFormatter?: (value: number | null, max: number) => string;
  label?: string;
  description?: string;
  animation?: "scale" | "pulse" | "none";
  tooltipTexts?: string[];
  className?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  highlightSelectedOnly?: boolean;
  icon?: React.ComponentType<RatingIconProps>;
  emptyIcon?: React.ComponentType<RatingIconProps>;
  getLabelText?: (value: number, max: number) => string;
  iconSpacing?: number | string;
  id?: string;
}

const sizeMap: Record<"sm" | "md" | "lg", number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const roundValueToPrecision = (value: number, precision: number) => {
  if (precision <= 0) return value;
  const multiplier = Math.round(1 / precision);
  return Math.round(value * multiplier) / multiplier;
};

const getDecimalPrecision = (value: number) => {
  if (!isFinite(value)) return 0;
  let string = value.toString();
  if (string.indexOf("e-") > -1) {
    const [base, trail] = string.split("e-");
    const precision = parseInt(trail, 10);
    string = base.replace(".", "");
    return string.length + precision - 1;
  }
  const dot = string.indexOf(".");
  return dot === -1 ? 0 : string.length - dot - 1;
};

const DefaultStarIcon: React.FC<RatingIconProps> = ({
  size,
  percent,
  color,
  emptyColor,
}) => {
  const viewBoxSize = 24;
  const fillRatio = clamp(percent, 0, 100) / 100;
  const clipId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={fillRatio * viewBoxSize} height={viewBoxSize} />
        </clipPath>
      </defs>

      <path
        d="M12 2.5l2.9 5.88 6.49.94-4.69 4.57 1.11 6.47L12 17.77 6.19 20.4l1.11-6.47L2.61 9.36l6.49-.94L12 2.5z"
        fill={emptyColor}
      />

      <g clipPath={`url(#${clipId})`}>
        <path
          d="M12 2.5l2.9 5.88 6.49.94-4.69 4.57 1.11 6.47L12 17.77 6.19 20.4l1.11-6.47L2.61 9.36l6.49-.94L12 2.5z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export const RatingStar = forwardRef<HTMLDivElement, RatingStarProps>((props, forwardedRef) => {
  const {
    value,
    defaultValue = null,
    max = 5,
    precision: precisionProp,
    onChange,
    onHoverChange,
    readOnly = false,
    allowHalf = false,
    allowClear = false,
    size = "md",
    color = "#facc15",
    emptyColor = "#e5e7eb",
    hoverColor = "#fbbf24",
    showValue = false,
    valueFormatter,
    label,
    description,
    animation = "scale",
    tooltipTexts,
    className = "",
    disabled = false,
    name,
    required = false,
    highlightSelectedOnly = false,
    icon: IconComponent,
    emptyIcon: EmptyIconComponent,
    getLabelText,
    iconSpacing = 0.25,
    id,
    style,
    ...rest
  } = props;

  const basePrecision = useMemo(() => {
    if (precisionProp && precisionProp > 0) {
      return Math.min(1, precisionProp);
    }
    return allowHalf ? 0.5 : 1;
  }, [precisionProp, allowHalf]);

  const decimalPrecision = useMemo(() => getDecimalPrecision(basePrecision), [basePrecision]);
  const minSelectableValue = allowClear ? 0 : basePrecision;
  const isControlled = value !== undefined;

  const sanitizedDefault = useMemo(() => {
    if (defaultValue === null || defaultValue === undefined) return allowClear ? null : minSelectableValue;
    return clamp(roundValueToPrecision(defaultValue, basePrecision), minSelectableValue, max);
  }, [defaultValue, basePrecision, max, minSelectableValue, allowClear]);

  const [internalValue, setInternalValue] = useState<number | null>(
    isControlled ? null : sanitizedDefault,
  );
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [pendingDisplayValue, setPendingDisplayValue] = useState<number | null>(null);
  const pointerDownRef = useRef(false);

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(sanitizedDefault);
    }
  }, [sanitizedDefault, isControlled]);

  useEffect(() => {
    if (isControlled) {
      setHoverValue(null);
    }
  }, [value, isControlled]);

  const effectiveLabelText = useCallback(
    (itemValue: number) => {
      if (tooltipTexts && tooltipTexts.length >= itemValue) {
        return tooltipTexts[itemValue - 1];
      }
      if (getLabelText) {
        return getLabelText(itemValue, max);
      }
      return `${itemValue} out of ${max}`;
    },
    [tooltipTexts, getLabelText, max],
  );

  const emitChange = useCallback(
    (event: React.SyntheticEvent | null, newValue: number | null) => {
      if (!onChange) return;
      const handler = onChange as any;
      if (typeof handler === "function") {
        if (handler.length >= 2) {
          handler(event, newValue);
        } else {
          handler(newValue ?? 0);
        }
      }
    },
    [onChange],
  );

  const emitHover = useCallback(
    (event: React.SyntheticEvent | null, newValue: number | null) => {
      onHoverChange?.(event, newValue);
    },
    [onHoverChange],
  );

  const numericSize = typeof size === "number" ? size : sizeMap[size];
  const IconToRender = IconComponent ?? DefaultStarIcon;
  const EmptyIconToRender = EmptyIconComponent ?? IconToRender;

  const currentBaseValue = isControlled ? (value ?? null) : internalValue;
  const displayedValue = hoverValue ?? pendingDisplayValue ?? currentBaseValue;
  const resolvedDisplayValue = displayedValue ?? 0;

  useEffect(() => {
    if (pendingDisplayValue === null) return;
    if (currentBaseValue === null) {
      setPendingDisplayValue(null);
      return;
    }
    if (Math.abs(currentBaseValue - pendingDisplayValue) <= basePrecision / 2) {
      setPendingDisplayValue(null);
    }
  }, [currentBaseValue, pendingDisplayValue, basePrecision]);

  const formatValue = useCallback(
    (val: number | null) => {
      if (valueFormatter) return valueFormatter(val, max);
      if (val === null) return `0 / ${max}`;
      return `${val.toFixed(Math.max(decimalPrecision, 0))} / ${max}`;
    },
    [valueFormatter, max, decimalPrecision],
  );

  const animationClass = useMemo(() => {
    switch (animation) {
      case "scale":
        return "transform transition-transform duration-150 ease-out hover:scale-105";
      case "pulse":
        return "transform transition duration-150 ease-out hover:scale-105 hover:shadow";
      default:
        return "";
    }
  }, [animation]);

  const clipValue = useCallback(
    (candidate: number | null) => {
      if (candidate === null) return allowClear ? null : minSelectableValue;
      const rounded = roundValueToPrecision(candidate, basePrecision);
      return clamp(rounded, minSelectableValue, max);
    },
    [basePrecision, minSelectableValue, max, allowClear],
  );

  const handleCommitValue = useCallback(
    (event: React.SyntheticEvent | null, candidate: number | null) => {
      if (disabled || readOnly) return;
      const nextValue = clipValue(candidate);
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      emitChange(event, nextValue);
    },
    [clipValue, disabled, emitChange, isControlled, readOnly],
  );

  const getValueFromMouse = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const percent = rect.width ? (event.clientX - rect.left) / rect.width : 0;
      const percentClamped = clamp(percent, 0, 1);
      const rawValue = index + percentClamped;
      const adjusted = roundValueToPrecision(rawValue + basePrecision / 2, basePrecision);
      return clamp(adjusted, allowClear ? 0 : basePrecision, max);
    },
    [basePrecision, max, allowClear],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;
      const previous = currentBaseValue ?? (allowClear ? 0 : minSelectableValue);
      const step = basePrecision;
      let next: number | null = previous;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          event.preventDefault();
          next = clipValue(previous + step);
          handleCommitValue(event, next);
          setHoverValue(next);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          event.preventDefault();
          next = clipValue(previous - step);
          handleCommitValue(event, next);
          setHoverValue(next);
          break;
        case "Home":
          event.preventDefault();
          handleCommitValue(event, allowClear ? null : minSelectableValue);
          setHoverValue(allowClear ? null : minSelectableValue);
          break;
        case "End":
          event.preventDefault();
          handleCommitValue(event, max);
          setHoverValue(max);
          break;
        case "Delete":
        case "Backspace":
          if (allowClear) {
            event.preventDefault();
            handleCommitValue(event, null);
            setHoverValue(null);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          handleCommitValue(event, hoverValue ?? previous);
          break;
        default:
          break;
      }
    },
    [
      allowClear,
      basePrecision,
      currentBaseValue,
      disabled,
      handleCommitValue,
      hoverValue,
      max,
      minSelectableValue,
      readOnly,
    ],
  );

  const gapStyle = useMemo(() => {
    if (iconSpacing === undefined || iconSpacing === null) return undefined;
    if (typeof iconSpacing === "number") {
      return { gap: `${iconSpacing}rem` };
    }
    return { gap: iconSpacing };
  }, [iconSpacing]);

  const autoId = useId();
  const stableAutoId = autoId.replace(/[:]/g, "");
  const componentId = id ?? `rating-${stableAutoId}`;
  const labelId = label ? `${componentId}-label` : undefined;
  const descriptionId = description ? `${componentId}-description` : undefined;

  const handleRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [forwardedRef],
  );

  const renderIcon = useCallback(
    (index: number, percent: number, highlighted: boolean) => {
      const sharedProps = {
        size: numericSize,
        percent,
        color: hoverValue !== null ? hoverColor : color,
        emptyColor,
        index,
        active: percent > 0,
        disabled,
        highlighted,
      } satisfies RatingIconProps;

      if (percent <= 0 && EmptyIconComponent) {
        return <EmptyIconComponent {...sharedProps} />;
      }

      return <IconToRender {...sharedProps} />;
    },
    [EmptyIconComponent, IconToRender, color, disabled, emptyColor, hoverColor, hoverValue, numericSize],
  );

  const computeFillPercent = useCallback(
    (index: number, valueToDisplay: number | null) => {
      if (valueToDisplay === null) return 0;
      const diff = valueToDisplay - index;
      if (highlightSelectedOnly) {
        if (Math.ceil(valueToDisplay) !== index + 1) return 0;
        return clamp(diff * 100, 0, 100);
      }
      if (diff >= 1) return 100;
      if (diff <= 0) return 0;
      return clamp(diff * 100, 0, 100);
    },
    [highlightSelectedOnly],
  );

  return (
    <div
      ref={handleRootRef}
      className={["rating-star-wrapper", "w-max", "select-none", className].filter(Boolean).join(" ")}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
  data-rating-value={resolvedDisplayValue}
      style={style}
      {...rest}
    >
      {label && (
        <div id={labelId} className="text-sm font-medium mb-1">
          {label}
        </div>
      )}

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        tabIndex={disabled || readOnly ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={(event) => {
          if (disabled || readOnly) return;
          setHoverValue(null);
          emitHover(event, null);
        }}
        className={`inline-flex items-center ${disabled ? "opacity-50 pointer-events-none" : ""}`}
        style={gapStyle}
      >
        <div className="inline-flex items-center" style={gapStyle}>
          {Array.from({ length: max }).map((_, index) => {
            const itemValue = index + 1;
            const percent = computeFillPercent(index, displayedValue);
            const ariaChecked = displayedValue !== null ? Math.ceil(displayedValue) === itemValue : false;
            const titleText = effectiveLabelText(itemValue);

            return (
              <button
                key={itemValue}
                type="button"
                role="radio"
                aria-checked={ariaChecked}
                aria-label={titleText}
                aria-posinset={itemValue}
                aria-setsize={max}
                title={titleText}
                disabled={disabled || readOnly}
                tabIndex={disabled || readOnly ? -1 : 0}
                className={[
                  "p-1",
                  "rounded-md",
                  "cursor-pointer",
                  "focus:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-amber-400",
                  animationClass,
                  disabled || readOnly ? "cursor-default" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseMove={(event) => {
                  if (disabled || readOnly) return;
                  const newValue = getValueFromMouse(event, index);
                  setHoverValue((prev) => {
                    if (prev === newValue) return prev;
                    emitHover(event, newValue);
                    return newValue;
                  });
                }}
                onMouseDown={() => {
                  if (disabled || readOnly) return;
                  pointerDownRef.current = true;
                }}
                onClick={(event) => {
                  if (disabled || readOnly) return;
                  const target = event.currentTarget;
                  const rect = target.getBoundingClientRect();
                  const x = event.clientX - rect.left;
                  const percentClick = rect.width ? clamp(x / rect.width, 0, 1) : 0;

                  let clickedValue: number;
                  if (basePrecision >= 1) {
                    clickedValue = itemValue;
                  } else if (basePrecision === 0.5) {
                    clickedValue = index + (percentClick <= 0.5 ? 0.5 : 1);
                  } else {
                    const rawValue = index + percentClick;
                    clickedValue = roundValueToPrecision(rawValue, basePrecision);
                  }

                  clickedValue = clamp(clickedValue, allowClear ? 0 : basePrecision, max);

                  const previous = currentBaseValue ?? null;

                  if (
                    allowClear &&
                    previous !== null &&
                    Math.abs(previous - clickedValue) < basePrecision / 2
                  ) {
                    handleCommitValue(event, null);
                    setHoverValue(null);
                    setPendingDisplayValue(null);
                  } else {
                    setPendingDisplayValue(clickedValue);
                    handleCommitValue(event, clickedValue);
                  }

                  pointerDownRef.current = false;
                }}
                onFocus={() => {
                  if (disabled || readOnly) return;
                  if (pointerDownRef.current) return;
                  setHoverValue(currentBaseValue ?? null);
                }}
                onBlur={() => {
                  if (disabled || readOnly) return;
                  setHoverValue(null);
                  emitHover(null, null);
                  pointerDownRef.current = false;
                }}
              >
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: numericSize, height: numericSize }}
                >
                  {renderIcon(index, percent, ariaChecked)}
                </div>
              </button>
            );
          })}
        </div>

        {showValue && (
          <div className="ml-3 text-sm font-medium tabular-nums">
            {formatValue(displayedValue)}
          </div>
        )}
      </div>

      {description && (
        <div id={descriptionId} className="text-xs text-gray-500 mt-1">
          {description}
        </div>
      )}

      {name && !disabled && (
        <input type="hidden" name={name} value={currentBaseValue ?? ""} required={required} />
      )}
    </div>
  );
});

RatingStar.displayName = "RatingStar";

export default RatingStar;
export { DefaultStarIcon };
