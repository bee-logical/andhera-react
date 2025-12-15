import React, { forwardRef, useEffect, useRef, useState, useId, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight, X } from "@/components/icons";

const pad = (value: number) => value.toString().padStart(2, "0");

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const endOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
};

const isBefore = (candidate: Date, compare: Date) => candidate.getTime() < compare.getTime();

const isAfter = (candidate: Date, compare: Date) => candidate.getTime() > compare.getTime();

const isSameDay = (first: Date, second: Date) => startOfDay(first).getTime() === startOfDay(second).getTime();

const isWithinInterval = (day: Date, range: { start: Date; end: Date }) => {
  const time = day.getTime();
  return time >= range.start.getTime() && time <= range.end.getTime();
};

/** Month name arrays for formatting */
const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/** 
 * Supported date format tokens:
 * - DD: Day with leading zero (01-31)
 * - D: Day without leading zero (1-31)
 * - MM: Month with leading zero (01-12)
 * - M: Month without leading zero (1-12)
 * - MMM: Short month name (Jan, Feb, etc.)
 * - MMMM: Full month name (January, February, etc.)
 * - YYYY: Full year (2025)
 * - YY: Short year (25)
 */
type DateFormat = string;

/** Format a date according to a format string */
const formatDateWithPattern = (date: Date, format: string): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  return format
    .replace(/MMMM/g, MONTH_NAMES_FULL[month])
    .replace(/MMM/g, MONTH_NAMES_SHORT[month])
    .replace(/MM/g, pad(month + 1))
    .replace(/M(?![a-zA-Z])/g, String(month + 1))
    .replace(/DD/g, pad(day))
    .replace(/D(?![a-zA-Z])/g, String(day))
    .replace(/YYYY/g, String(year))
    .replace(/YY/g, String(year).slice(-2));
};

/** Parse a date string according to a format pattern */
const parseDateWithPattern = (value: string, format: string): Date | null => {
  try {
    // Build a regex pattern from the format
    let regexPattern = format
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special regex chars first
      .replace(/MMMM/g, '(?<monthName>[A-Za-z]+)')
      .replace(/MMM/g, '(?<monthShort>[A-Za-z]{3})')
      .replace(/MM/g, '(?<month>\\d{2})')
      .replace(/M(?![a-zA-Z<])/g, '(?<monthSingle>\\d{1,2})')
      .replace(/DD/g, '(?<day>\\d{2})')
      .replace(/D(?![a-zA-Z<])/g, '(?<daySingle>\\d{1,2})')
      .replace(/YYYY/g, '(?<year>\\d{4})')
      .replace(/YY/g, '(?<yearShort>\\d{2})');
    
    const regex = new RegExp(`^${regexPattern}$`, 'i');
    const match = value.match(regex);
    
    if (!match || !match.groups) return null;
    
    const groups = match.groups;
    
    // Extract day
    let day = 0;
    if (groups.day) day = parseInt(groups.day, 10);
    else if (groups.daySingle) day = parseInt(groups.daySingle, 10);
    
    // Extract month (0-indexed)
    let month = -1;
    if (groups.month) month = parseInt(groups.month, 10) - 1;
    else if (groups.monthSingle) month = parseInt(groups.monthSingle, 10) - 1;
    else if (groups.monthShort) {
      const idx = MONTH_NAMES_SHORT.findIndex(
        m => m.toLowerCase() === groups.monthShort.toLowerCase()
      );
      if (idx !== -1) month = idx;
    }
    else if (groups.monthName) {
      const idx = MONTH_NAMES_FULL.findIndex(
        m => m.toLowerCase() === groups.monthName.toLowerCase()
      );
      if (idx !== -1) month = idx;
    }
    
    // Extract year
    let year = 0;
    if (groups.year) year = parseInt(groups.year, 10);
    else if (groups.yearShort) {
      const shortYear = parseInt(groups.yearShort, 10);
      // Assume 2000s for years 00-99
      year = shortYear >= 0 && shortYear <= 99 ? 2000 + shortYear : shortYear;
    }
    
    // Validate
    if (day < 1 || day > 31 || month < 0 || month > 11 || year < 1000 || year > 9999) {
      return null;
    }
    
    const parsed = new Date(year, month, day);
    
    // Verify the date is valid (e.g., Feb 30 would roll over)
    if (parsed.getDate() !== day || parsed.getMonth() !== month || parsed.getFullYear() !== year) {
      return null;
    }
    
    parsed.setHours(0, 0, 0, 0);
    return parsed;
  } catch {
    return null;
  }
};

/** Get the separator used in a format string */
const getFormatSeparator = (format: string): string => {
  // Find the separator between date parts
  const match = format.match(/[^DMY]+/i);
  return match ? match[0] : "/";
};

/** Get input mask/placeholder from format */
const getFormatPlaceholder = (format: string): string => {
  return format
    .replace(/MMMM/g, 'MMMM')
    .replace(/MMM/g, 'MMM')
    .replace(/MM/g, 'MM')
    .replace(/M(?![a-zA-Z])/g, 'M')
    .replace(/DD/g, 'DD')
    .replace(/D(?![a-zA-Z])/g, 'D')
    .replace(/YYYY/g, 'YYYY')
    .replace(/YY/g, 'YY');
};

// Legacy functions for backward compatibility (default DD/MM/YYYY format)
const formatDate = (date: Date) => formatDateWithPattern(date, "DD/MM/YYYY");

const isStrictValidDate = (value: string, format: string = "DD/MM/YYYY") => {
  return parseDateWithPattern(value, format) !== null;
};

const parseDate = (value: string, format: string = "DD/MM/YYYY"): Date | null => {
  return parseDateWithPattern(value, format);
};

/** DatePicker mode - single date or date range selection */
type DatePickerMode = "single" | "range";

/** DatePicker size variants */
type DatePickerSize = "small" | "medium" | "large";

/** Custom styles for selected dates */
type SelectedDateStyles = {
  /** Background color for selected date */
  backgroundColor?: string;
  /** Text color for selected date */
  color?: string;
  /** Border radius for selected date */
  borderRadius?: string | number;
  /** Box shadow for selected date */
  boxShadow?: string;
  /** Font weight for selected date */
  fontWeight?: number | string;
};

/** Custom styles for date range highlight */
type RangeHighlightStyles = {
  /** Background color for dates in range */
  backgroundColor?: string;
  /** Text color for dates in range */
  color?: string;
};

/** Custom styles for today indicator */
type TodayIndicatorStyles = {
  /** Border color for today */
  borderColor?: string;
  /** Border width for today */
  borderWidth?: string | number;
  /** Border style for today */
  borderStyle?: string;
};

/** Action button configuration */
type ActionButton = {
  /** Button label text */
  label: string;
  /** Click handler */
  onClick: (selectedDate: Date | [Date, Date] | null) => void;
  /** Button variant style */
  variant?: "primary" | "secondary" | "ghost";
};

/** DatePicker props for customizing behavior and appearance */
type DatePickerProps = {
  /** Selection mode - 'single' for single date, 'range' for date range */
  mode?: DatePickerMode;
  /** Controlled value - Date for single mode, [Date, Date] for range mode */
  value?: Date | [Date, Date] | null;
  /** Callback fired when date selection changes */
  onChange?: (date: Date | [Date, Date] | null) => void;
  /** Input placeholder text */
  placeholder?: string;
  /** Disable the date picker */
  disabled?: boolean;
  /** Error message to display below input */
  error?: string;
  /** Disable selection of past dates */
  disablePastDates?: boolean;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Validate that range start is before end */
  validateRange?: boolean;
  /** Size variant of the date picker */
  size?: DatePickerSize;
  /** Input name attribute for form submission */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Additional className for the container */
  className?: string;
  /** Additional className for the input wrapper */
  inputClassName?: string;
  /** Additional className for the calendar popup */
  calendarClassName?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** ID of element that describes the input */
  'aria-describedby'?: string;
  /** Custom date format function for display */
  formatDisplayDate?: (date: Date) => string;
  /** Callback fired when the calendar opens */
  onOpen?: () => void;
  /** Callback fired when the calendar closes */
  onClose?: () => void;
  /** Week starts on (0 = Sunday, 1 = Monday, etc.) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Show today button in calendar */
  showTodayButton?: boolean;
  /** Today button text */
  todayButtonText?: string;
  /** Clear button aria-label */
  clearButtonLabel?: string;
  /** Calendar icon aria-label */
  calendarIconLabel?: string;
  /** Read-only mode */
  readOnly?: boolean;
  /** Auto-focus input on mount */
  autoFocus?: boolean;
  /** Custom styles for selected date(s) */
  selectedDateStyles?: SelectedDateStyles;
  /** Custom styles for dates within range */
  rangeHighlightStyles?: RangeHighlightStyles;
  /** Custom styles for today's date indicator */
  todayIndicatorStyles?: TodayIndicatorStyles;
  /** Custom action buttons in calendar footer */
  actionButtons?: ActionButton[];
  /** Show OK/Apply button to confirm selection */
  showConfirmButton?: boolean;
  /** Confirm button text */
  confirmButtonText?: string;
  /** Show Cancel button to close without selecting */
  showCancelButton?: boolean;
  /** Cancel button text */
  cancelButtonText?: string;
  /** Callback when confirm button is clicked */
  onConfirm?: (date: Date | [Date, Date] | null) => void;
  /** Callback when cancel button is clicked */
  onCancel?: () => void;
  /** Primary color for interactive elements */
  primaryColor?: string;
  /** Hover color for day buttons */
  hoverColor?: string;
  /** Whether to close the calendar immediately after selecting a date */
  closeOnSelect?: boolean;
  /** 
   * Date format pattern for display and input parsing.
   * Supported tokens: DD, D, MM, M, MMM, MMMM, YYYY, YY
   * Examples: "DD/MM/YYYY", "MM-DD-YYYY", "D MMM YYYY", "MMMM D, YYYY"
   * @default "DD/MM/YYYY"
   */
  dateFormat?: DateFormat;
  /** Separator for date range display (between start and end dates) */
  rangeSeparator?: string;
  /** 
   * Display two calendars side by side for range selection.
   * Only works when mode="range". Left calendar shows start date month,
   * right calendar shows end date month (or next month).
   * @default false
   */
  dualCalendar?: boolean;
  /**
   * Label for the start date input (only shown when dualCalendar is true with separateInputs)
   * @default "Start Date"
   */
  startDateLabel?: string;
  /**
   * Label for the end date input (only shown when dualCalendar is true with separateInputs)
   * @default "End Date"
   */
  endDateLabel?: string;
  /**
   * Show separate input fields for start and end dates in dual calendar mode.
   * @default false
   */
  separateInputs?: boolean;
  /**
   * Array of specific dates to disable.
   * These dates will be unselectable in the calendar.
   */
  disabledDates?: Date[];
  /**
   * Array of date ranges to disable.
   * Each range is a tuple of [startDate, endDate] - all dates within each range will be disabled.
   */
  disabledDateRanges?: [Date, Date][];
  /**
   * Whether to allow selecting a date range that contains disabled dates.
   * When false, selecting a range with disabled dates inside will show an error.
   * @default false
   */
  allowDisabledInRange?: boolean;
  /**
   * Custom error message shown when a selected range contains disabled dates.
   * Only applies when allowDisabledInRange is false.
   * @default "Selected range contains unavailable dates"
   */
  disabledInRangeError?: string;
  /**
   * Custom function to determine if a date should be disabled.
   * Receives a Date and should return true if the date should be disabled.
   * This is in addition to other disable logic (minDate, maxDate, disabledDates, etc.)
   */
  shouldDisableDate?: (date: Date) => boolean;
};

/** Get size-based styles */
const getSizeStyles = (size: DatePickerSize) => {
  const sizes = {
    small: {
      padding: "0.4rem 0.6rem",
      fontSize: "0.85rem",
      iconSize: 16,
      daySize: 32,
    },
    medium: {
      padding: "0.55rem 0.75rem",
      fontSize: "0.95rem",
      iconSize: 18,
      daySize: 40,
    },
    large: {
      padding: "0.7rem 0.9rem",
      fontSize: "1.05rem",
      iconSize: 20,
      daySize: 44,
    },
  };
  return sizes[size];
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  mode = "single",
  value = null,
  onChange,
  placeholder = "Select date",
  disabled = false,
  error,
  disablePastDates = false,
  minDate,
  maxDate,
  validateRange = true,
  size = "medium",
  name,
  id,
  className = "",
  inputClassName = "",
  calendarClassName = "",
  required = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  formatDisplayDate,
  onOpen,
  onClose,
  weekStartsOn = 0,
  showTodayButton = false,
  todayButtonText = "Today",
  clearButtonLabel = "Clear date",
  calendarIconLabel = "Open calendar",
  readOnly = false,
  autoFocus = false,
  selectedDateStyles,
  rangeHighlightStyles,
  todayIndicatorStyles,
  actionButtons,
  showConfirmButton = false,
  confirmButtonText = "OK",
  showCancelButton = false,
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
  primaryColor = "#FFCB00",
  hoverColor,
  closeOnSelect,
  dateFormat = "DD/MM/YYYY",
  rangeSeparator = " - ",
  dualCalendar = false,
  startDateLabel = "Start Date",
  endDateLabel = "End Date",
  separateInputs = false,
  disabledDates = [],
  disabledDateRanges = [],
  allowDisabledInRange = false,
  disabledInRangeError = "Selected range contains unavailable dates",
  shouldDisableDate,
}, ref) => {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const [popupPosition, setPopupPosition] = useState<{ top?: number; bottom?: number; left?: number; right?: number }>({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // For dual calendar, maintain a separate month for the right calendar
  const [rightMonth, setRightMonth] = useState(() => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    return next;
  });
  // Track which calendar is being interacted with in dual mode
  const [activeCalendar, setActiveCalendar] = useState<"left" | "right">("left");
  const [range, setRange] = useState<[Date | null, Date | null]>(
    Array.isArray(value) ? [value[0] ?? null, value[1] ?? null] : [null, null]
  );
  const [singleDate, setSingleDate] = useState<Date | null>(
    !Array.isArray(value) && value instanceof Date ? value : null
  );
  
  // Memoized format functions based on dateFormat prop
  const formatWithPattern = useMemo(() => {
    return (date: Date) => formatDateWithPattern(date, dateFormat);
  }, [dateFormat]);
  
  const parseWithPattern = useMemo(() => {
    return (value: string) => parseDateWithPattern(value, dateFormat);
  }, [dateFormat]);

  // Helper to format dates with current pattern
  const formatDateValue = (date: Date) => formatDateWithPattern(date, dateFormat);
  
  const [manualInput, setManualInput] = useState(() => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        return `${formatDateWithPattern(start, dateFormat)}${rangeSeparator}${formatDateWithPattern(end, dateFormat)}`;
      }
      if (start) {
        return formatDateWithPattern(start, dateFormat);
      }
      return "";
    }
    return value instanceof Date ? formatDateWithPattern(value, dateFormat) : "";
  });
  const [internalError, setInternalError] = useState<string | null>(null);
  const [pendingDate, setPendingDate] = useState<Date | [Date, Date] | null>(null);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [portalPosition, setPortalPosition] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isRange = mode === "range";
  const isDualCalendarMode = isRange && dualCalendar;
  const today = startOfDay(new Date());
  const effectiveMin = minDate || (disablePastDates ? today : undefined);
  const hasConfirmCancel = showConfirmButton || showCancelButton;
  
  // Compute effective hover color
  const effectiveHoverColor = hoverColor || `${primaryColor}33`;

  // Calculate portal position when opening
  const updatePortalPosition = useCallback(() => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const popupWidth = isDualCalendarMode ? Math.min(800, window.innerWidth - 32) : Math.min(384, window.innerWidth - 32);
      
      // Calculate left position - center the popup under the input
      let left = rect.left + (rect.width / 2) - (popupWidth / 2);
      
      // Ensure popup doesn't go off-screen
      if (left < 16) left = 16;
      if (left + popupWidth > window.innerWidth - 16) {
        left = window.innerWidth - popupWidth - 16;
      }
      
      setPortalPosition({
        top: rect.bottom + window.scrollY + 8,
        left: left + window.scrollX,
        width: popupWidth,
      });
    }
  }, [isDualCalendarMode]);

  useEffect(() => {
    if (!open || !wrapperRef.current) return;
    
    updatePortalPosition();
    
    const rect = wrapperRef.current.getBoundingClientRect();
    const popupHeight = isDualCalendarMode ? 500 : 400;
    const spaceBelow = window.innerHeight - rect.bottom;
    const isMobile = window.innerWidth < 768;
    
    // If there's not enough space below, scroll to make room
    // On mobile, use 'start' to bring input to top; on desktop use 'center'
    if (spaceBelow < popupHeight + 20 && wrapperRef.current) {
      setTimeout(() => {
        wrapperRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: isMobile ? 'start' : 'center',
          inline: 'nearest'
        });
        // Update position after scroll
        setTimeout(updatePortalPosition, 100);
      }, 50);
    }
    
    setPosition("bottom");
  }, [open, updatePortalPosition, isDualCalendarMode]);

  // Update position on window resize/scroll when open
  useEffect(() => {
    if (!open) return;
    
    const handlePositionUpdate = () => updatePortalPosition();
    
    window.addEventListener('resize', handlePositionUpdate);
    window.addEventListener('scroll', handlePositionUpdate, true);
    
    return () => {
      window.removeEventListener('resize', handlePositionUpdate);
      window.removeEventListener('scroll', handlePositionUpdate, true);
    };
  }, [open, updatePortalPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideWrapper = wrapperRef.current && wrapperRef.current.contains(target);
      const isInsidePopup = popupRef.current && popupRef.current.contains(target);
      
      if (!isInsideWrapper && !isInsidePopup) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isRange) {
      if (Array.isArray(value)) {
        const [startVal, endVal] = value;
        setRange([startVal ?? null, endVal ?? null]);
        if (startVal && endVal) {
          setManualInput(`${formatDateValue(startVal)}${rangeSeparator}${formatDateValue(endVal)}`);
          setCurrentMonth(startVal);
          // For dual calendar, set right month to end date's month
          if (isDualCalendarMode) {
            setRightMonth(endVal);
          }
        } else if (startVal) {
          setManualInput(formatDateValue(startVal));
          setCurrentMonth(startVal);
          // For dual calendar, set right month to next month from start
          if (isDualCalendarMode) {
            const nextMonth = new Date(startVal);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            setRightMonth(nextMonth);
          }
        } else {
          setManualInput("");
        }
      } else if (value instanceof Date) {
        setRange([value, null]);
        setManualInput(formatDateValue(value));
        setCurrentMonth(value);
        // For dual calendar, set right month to next month
        if (isDualCalendarMode) {
          const nextMonth = new Date(value);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          setRightMonth(nextMonth);
        }
      } else {
        setRange([null, null]);
        setManualInput("");
      }
    } else {
      if (value instanceof Date) {
        setSingleDate(value);
        setManualInput(formatDateValue(value));
        setCurrentMonth(value);
      } else {
        setSingleDate(null);
        setManualInput("");
      }
    }
  }, [value, isRange, dateFormat, rangeSeparator]);

  // Check if a specific date is in the disabledDates array
  const isInDisabledDates = useCallback((day: Date) => {
    const dayStart = startOfDay(day);
    return disabledDates.some(disabledDate => 
      startOfDay(disabledDate).getTime() === dayStart.getTime()
    );
  }, [disabledDates]);

  // Check if a specific date falls within any disabled date range
  const isInDisabledRange = useCallback((day: Date) => {
    const dayTime = startOfDay(day).getTime();
    return disabledDateRanges.some(([rangeStart, rangeEnd]) => {
      const start = startOfDay(rangeStart).getTime();
      const end = endOfDay(rangeEnd).getTime();
      return dayTime >= start && dayTime <= end;
    });
  }, [disabledDateRanges]);

  // Main disabled check function
  const isDisabled = useCallback((day: Date) => {
    // Check min/max bounds
    if (effectiveMin && isBefore(day, effectiveMin)) return true;
    if (maxDate && isAfter(day, maxDate)) return true;
    
    // Check specific disabled dates
    if (isInDisabledDates(day)) return true;
    
    // Check disabled date ranges
    if (isInDisabledRange(day)) return true;
    
    // Check custom shouldDisableDate function
    if (shouldDisableDate && shouldDisableDate(day)) return true;
    
    return false;
  }, [effectiveMin, maxDate, isInDisabledDates, isInDisabledRange, shouldDisableDate]);

  // Check if a range contains any disabled dates
  const rangeContainsDisabledDates = useCallback((start: Date, end: Date): boolean => {
    const startTime = startOfDay(start).getTime();
    const endTime = startOfDay(end).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    
    for (let time = startTime; time <= endTime; time += oneDay) {
      const currentDate = new Date(time);
      if (isDisabled(currentDate)) {
        return true;
      }
    }
    return false;
  }, [isDisabled]);

  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;

    // Determine if we should close on select
    // Default: stay open (false) unless explicitly set to true
    const shouldCloseOnSelect = closeOnSelect ?? false;

    if (isRange) {
      const [start, end] = range;
      if (!start || (start && end)) {
        setRange([day, null]);
        setManualInput(formatDateValue(day));
        setInternalError(null);
      } else if (start && !end) {
        if (isBefore(day, start) && validateRange) {
          setInternalError("Start date cannot be after end date");
          return;
        }

        const newRange: [Date, Date] = [startOfDay(start), endOfDay(day)];
        
        // Check if range contains disabled dates
        if (!allowDisabledInRange && rangeContainsDisabledDates(start, day)) {
          setInternalError(disabledInRangeError);
          return;
        }
        
        setRange(newRange);
        setManualInput(`${formatDateValue(newRange[0])}${rangeSeparator}${formatDateValue(newRange[1])}`);
        setInternalError(null);
        onChange?.(newRange);
        if (shouldCloseOnSelect) {
          setOpen(false);
          onClose?.();
        }
      }
    } else {
      setSingleDate(day);
      setManualInput(formatDateValue(day));
      setInternalError(null);
      onChange?.(day);
      if (shouldCloseOnSelect) {
        setOpen(false);
        onClose?.();
      }
    }
  };

  // Get separator from format for auto-insert during typing
  const formatSeparator = useMemo(() => getFormatSeparator(dateFormat), [dateFormat]);
  const expectedLength = useMemo(() => {
    // Calculate expected length based on format
    return dateFormat.length;
  }, [dateFormat]);

  const handleManualInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    
    // For numeric-only formats, apply auto-separator logic
    const isNumericFormat = /^[DMY\/\-\.]+$/i.test(dateFormat);
    
    if (isNumericFormat) {
      // Allow only digits and the separator
      const allowedChars = new RegExp(`[^\\d${formatSeparator === '-' ? '\\-' : formatSeparator}]`, 'g');
      val = val.replace(allowedChars, "");
      
      // Auto-insert separator based on format pattern
      const formatParts = dateFormat.split(/[\/\-\.]/);
      const firstPartLen = formatParts[0]?.length || 2;
      const secondPartLen = formatParts[1]?.length || 2;
      
      const digits = val.replace(/[^\d]/g, "");
      if (digits.length === firstPartLen && !val.includes(formatSeparator)) {
        val = digits + formatSeparator;
      } else if (digits.length === firstPartLen + secondPartLen && val.split(formatSeparator).length === 2) {
        const parts = val.split(formatSeparator);
        if (parts[1] && !parts[1].includes(formatSeparator)) {
          val = parts[0] + formatSeparator + parts[1] + formatSeparator;
        }
      }
    }

    setManualInput(val);

    if (val.trim() === "") {
      setInternalError(null);
      setSingleDate(null);
      setRange([null, null]);
      onChange?.(null);
      return;
    }

    // Handle range input
    if (isRange && val.includes(rangeSeparator.trim())) {
      const parts = val.split(rangeSeparator.trim()).map((segment) => segment.trim());
      if (parts.length === 2) {
        const [startStr, endStr] = parts;
        const startParsed = parseDateWithPattern(startStr, dateFormat);
        const endParsed = parseDateWithPattern(endStr, dateFormat);

        if (!startParsed || !endParsed) {
          // Only show error if both parts look complete
          if (startStr.length >= expectedLength && endStr.length >= expectedLength) {
            setInternalError("Invalid date format");
          }
          return;
        }

        if (isBefore(endParsed, startParsed) && validateRange) {
          setInternalError("Start date cannot be after end date");
          return;
        }

        if (isDisabled(startParsed) || isDisabled(endParsed)) {
          setInternalError("Selected dates are out of allowed range");
          return;
        }

        // Check if range contains disabled dates
        if (!allowDisabledInRange && rangeContainsDisabledDates(startParsed, endParsed)) {
          setInternalError(disabledInRangeError);
          return;
        }

        const newRange: [Date, Date] = [startOfDay(startParsed), endOfDay(endParsed)];
        setInternalError(null);
        setRange(newRange);
        setCurrentMonth(startParsed);
        onChange?.(newRange);
        return;
      }
    }

    // Handle single date input
    const parsed = parseDateWithPattern(val, dateFormat);

    if (val.length >= expectedLength) {
      if (!parsed) {
        setInternalError("Invalid date format");
        return;
      }

      if (isDisabled(parsed)) {
        setInternalError("Selected date is out of allowed range");
        return;
      }

      setInternalError(null);
      if (isRange) {
        setRange([parsed, null]);
      } else {
        setSingleDate(parsed);
      }
      setCurrentMonth(parsed);
      onChange?.(parsed);
    } else {
      setInternalError(null);
    }
  };

  const handleClear = () => {
    setManualInput("");
    setSingleDate(null);
    setRange([null, null]);
    setInternalError(null);
    onChange?.(null);
  };

  const formattedValue = isRange
    ? range[0] && range[1]
      ? `${formatDateValue(range[0])}${rangeSeparator}${formatDateValue(range[1])}`
      : manualInput
    : manualInput || (singleDate ? formatDateValue(singleDate) : "");

  const showClearButton = !!formattedValue && !disabled;

  // Parametrized function to render days for any given month
  const renderDaysForMonth = (monthDate: Date, calendarKey: string = "") => {
    const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const days: React.ReactNode[] = [];
    const startDay = start.getDay();

    for (let index = 0; index < startDay; index += 1) {
      days.push(
        <div
          key={`${calendarKey}empty-${index}`}
          style={{
            width: 40,
            height: 40,
          }}
        />,
      );
    }

    for (let dayIndex = 1; dayIndex <= end.getDate(); dayIndex += 1) {
      const day = new Date(monthDate.getFullYear(), monthDate.getMonth(), dayIndex);
      const [startDate, endDate] = range;
      const selectedSingle = !isRange && singleDate && isSameDay(singleDate, day);
      const inRange =
        isRange && startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
      const rangeStart = isRange && startDate && isSameDay(startDate, day);
      const rangeEnd = isRange && endDate && isSameDay(endDate, day);
      const disabledDay = isDisabled(day);
      const isToday = isSameDay(day, today);
      const isHovered = hoveredDay && isSameDay(day, hoveredDay);

      const buttonStyle: React.CSSProperties = {
        width: 40,
        height: 40,
        borderRadius: selectedDateStyles?.borderRadius ?? "999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.85rem",
        border: "none",
        background: "transparent",
        color: "#e2e8f0",
        cursor: "pointer",
        transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
      };

      // Today indicator
      if (isToday && !selectedSingle && !rangeStart && !rangeEnd) {
        buttonStyle.border = `${todayIndicatorStyles?.borderWidth ?? "2px"} ${todayIndicatorStyles?.borderStyle ?? "solid"} ${todayIndicatorStyles?.borderColor ?? primaryColor}`;
      }

      if (disabledDay) {
        buttonStyle.cursor = "not-allowed";
        buttonStyle.color = "#475569";
      }

      // Hover state (non-disabled)
      if (isHovered && !disabledDay && !selectedSingle && !rangeStart && !rangeEnd) {
        buttonStyle.background = effectiveHoverColor;
      }

      // Range highlight
      if (inRange && !selectedSingle && !rangeStart && !rangeEnd) {
        buttonStyle.background = rangeHighlightStyles?.backgroundColor ?? `${primaryColor}33`;
        buttonStyle.color = rangeHighlightStyles?.color ?? "#f8fafc";
      }

      // Selected state
      if (rangeStart || rangeEnd || selectedSingle) {
        buttonStyle.background = selectedDateStyles?.backgroundColor ?? primaryColor;
        buttonStyle.color = selectedDateStyles?.color ?? "#000000";
        buttonStyle.fontWeight = selectedDateStyles?.fontWeight ?? 600;
        buttonStyle.boxShadow = selectedDateStyles?.boxShadow ?? `0 8px 24px -12px ${primaryColor}A6`;
        if (selectedDateStyles?.borderRadius) {
          buttonStyle.borderRadius = selectedDateStyles.borderRadius;
        }
      }

      days.push(
        <button
          key={`${calendarKey}day-${dayIndex}`}
          type="button"
          disabled={disabledDay}
          onClick={() => handleDayClick(day)}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
          style={buttonStyle}
        >
          {dayIndex}
        </button>
      );
    }

    return days;
  };

  // Wrapper for backward compatibility - renders current month
  const renderDays = () => renderDaysForMonth(currentMonth, "main-");

  const combinedError = internalError || error;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 200 }, (_, index) => today.getFullYear() - 100 + index);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth(), 1));
  };

  const sizeStyles = getSizeStyles(size);
  const inputId = id || `datepicker-${generatedId}`;
  const errorId = `${inputId}-error`;

  // Handle open/close callbacks
  const handleOpen = () => {
    if (!disabled && !readOnly) {
      setOpen(true);
      onOpen?.();
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  // Handle today button click
  const handleTodayClick = () => {
    const todayDate = startOfDay(new Date());
    if (!isDisabled(todayDate)) {
      handleDayClick(todayDate);
    }
  };

  // Separate inputs mode - show two input boxes
  const showSeparateInputs = isDualCalendarMode && separateInputs;

  // Get formatted start and end dates for separate inputs
  const startDateValue = range[0] ? formatDateValue(range[0]) : "";
  const endDateValue = range[1] ? formatDateValue(range[1]) : "";

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: isDualCalendarMode ? "52rem" : (isRange ? "28rem" : "24rem"),
    zIndex: open ? 9999 : "auto",
  };

  const inputWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    border: "1px solid rgba(30, 41, 59, 0.65)",
    padding: sizeStyles.padding,
    background: disabled ? "rgba(15, 23, 42, 0.55)" : "rgba(4, 6, 12, 0.85)",
    color: disabled ? "#64748b" : "#e2e8f0",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    backdropFilter: "blur(10px)",
  };

  if (combinedError) {
    inputWrapperStyle.border = "1px solid #E53935";
  } else if (!disabled && open) {
    inputWrapperStyle.border = `1px solid ${primaryColor}`;
    inputWrapperStyle.boxShadow = `0 0 0 3px ${primaryColor}2E`;
  }

  const inputStyleObj: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    fontSize: sizeStyles.fontSize,
    color: disabled ? "#94a3b8" : "#f8fafc",
    border: "none",
    outline: "none",
    minWidth: 0,
    cursor: readOnly ? "default" : "text",
  };

  const iconStyle: React.CSSProperties = {
    width: sizeStyles.iconSize,
    height: sizeStyles.iconSize,
    color: disabled ? "#475569" : "#cbd5f5",
    cursor: disabled || readOnly ? "not-allowed" : "pointer",
    transition: "opacity 0.2s ease",
  };

  // Use fixed positioning for portal-based popup
  const popupStyle: React.CSSProperties = {
    position: "fixed",
    width: portalPosition.width || (isDualCalendarMode ? "min(50rem, calc(100vw - 2rem))" : "min(24rem, calc(100vw - 2rem))"),
    maxWidth: isDualCalendarMode ? "50rem" : "24rem",
    zIndex: 99999,
    borderRadius: 16,
    border: "1px solid rgba(30, 41, 59, 0.68)",
    background: "rgba(5, 8, 15, 0.98)",
    padding: "1.35rem 1.5rem",
    boxShadow: "0 28px 80px -30px rgba(2, 6, 23, 0.95)",
    backdropFilter: "blur(18px)",
    top: portalPosition.top,
    left: portalPosition.left,
  };

  const navButtonStyle: React.CSSProperties = {
    border: "1px solid transparent",
    borderRadius: 8,
    padding: 4,
    background: "transparent",
    color: "#cbd5f5",
    cursor: "pointer",
    transition: "border-color 0.2s ease, color 0.2s ease",
  };

  const selectStyle: React.CSSProperties = {
    borderRadius: 8,
    border: "1px solid rgba(30, 41, 59, 0.85)",
    background: "rgba(15, 23, 42, 0.78)",
    color: "#e2e8f0",
    fontSize: "0.85rem",
    padding: "0.35rem 0.65rem",
    outline: "none",
    appearance: "none",
  };

  const weekdayRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.25rem",
    textAlign: "center",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#94a3b8",
    marginBottom: "0.35rem",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.25rem",
  };

  // Get weekday labels based on weekStartsOn
  const getWeekdayLabels = () => {
    const baseLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return [...baseLabels.slice(weekStartsOn), ...baseLabels.slice(0, weekStartsOn)];
  };

  return (
    <div ref={wrapperRef} style={containerStyle} className={className}>
      {showSeparateInputs ? (
        /* Dual Input Layout - Two separate input boxes */
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          {/* Start Date Input */}
          <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
            <label 
              htmlFor={`${inputId}-start`}
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontSize: "0.75rem", 
                fontWeight: 600, 
                color: primaryColor,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              {startDateLabel}
            </label>
            <div style={inputWrapperStyle} className={inputClassName}>
              <input
                ref={ref || inputRef}
                type="text"
                id={`${inputId}-start`}
                name={name ? `${name}_start` : undefined}
                disabled={disabled}
                readOnly={true}
                required={required}
                autoFocus={autoFocus}
                value={startDateValue}
                onFocus={handleOpen}
                placeholder="Select date"
                style={inputStyleObj}
                aria-label={`${startDateLabel}`}
                aria-describedby={combinedError ? errorId : ariaDescribedBy}
                aria-invalid={!!combinedError}
                aria-required={required}
                aria-expanded={open}
                aria-haspopup="dialog"
              />
              <Calendar
                style={iconStyle}
                onClick={() => !disabled && !readOnly && setOpen((previous) => !previous)}
                aria-label={calendarIconLabel}
                role="button"
                tabIndex={disabled || readOnly ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen((previous) => !previous);
                  }
                }}
              />
            </div>
          </div>

          {/* Arrow/Separator */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            padding: "0 0.5rem",
            paddingBottom: "0.75rem",
            color: "#94a3b8"
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>

          {/* End Date Input */}
          <div style={{ flex: "1 1 200px", minWidth: "180px" }}>
            <label 
              htmlFor={`${inputId}-end`}
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                fontSize: "0.75rem", 
                fontWeight: 600, 
                color: primaryColor,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              {endDateLabel}
            </label>
            <div style={inputWrapperStyle} className={inputClassName}>
              <input
                type="text"
                id={`${inputId}-end`}
                name={name ? `${name}_end` : undefined}
                disabled={disabled}
                readOnly={true}
                required={required}
                value={endDateValue}
                onFocus={handleOpen}
                placeholder="Select date"
                style={inputStyleObj}
                aria-label={`${endDateLabel}`}
                aria-describedby={combinedError ? errorId : ariaDescribedBy}
                aria-invalid={!!combinedError}
                aria-required={required}
                aria-expanded={open}
                aria-haspopup="dialog"
              />
              <Calendar
                style={iconStyle}
                onClick={() => !disabled && !readOnly && setOpen((previous) => !previous)}
                aria-label={calendarIconLabel}
                role="button"
                tabIndex={disabled || readOnly ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen((previous) => !previous);
                  }
                }}
              />
            </div>
          </div>

          {/* Clear button for both */}
          {(startDateValue || endDateValue) && !disabled && !readOnly && (
            <div style={{ paddingBottom: "0.75rem" }}>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(30, 41, 59, 0.65)",
                  borderRadius: 8,
                  padding: "0.5rem",
                  cursor: "pointer",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                aria-label={clearButtonLabel}
              >
                <X style={{ width: 16, height: 16 }} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Single Input Layout (original) */
      <div style={inputWrapperStyle} className={inputClassName}>
        <input
          ref={ref || inputRef}
          type="text"
          id={inputId}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoFocus={autoFocus}
          value={formatDisplayDate && singleDate ? formatDisplayDate(singleDate) : formattedValue}
          onChange={readOnly ? undefined : handleManualInput}
          onFocus={handleOpen}
          placeholder={placeholder}
          style={inputStyleObj}
          aria-label={ariaLabel}
          aria-describedby={combinedError ? errorId : ariaDescribedBy}
          aria-invalid={!!combinedError}
          aria-required={required}
          aria-expanded={open}
          aria-haspopup="dialog"
        />
        <span>
          {showClearButton && !readOnly ? (
            <X
              style={iconStyle}
              onClick={disabled || readOnly ? undefined : handleClear}
              aria-label={clearButtonLabel}
              role="button"
              tabIndex={disabled || readOnly ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClear();
                }
              }}
            />
          ) : (
            <Calendar
              style={iconStyle}
              onClick={() => !disabled && !readOnly && setOpen((previous) => !previous)}
              aria-label={calendarIconLabel}
              role="button"
              tabIndex={disabled || readOnly ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((previous) => !previous);
                }
              }}
            />
          )}
        </span>
      </div>
      )}

      {combinedError && (
        <p id={errorId} style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#E53935" }} role="alert">
          {combinedError}
        </p>
      )}

      {open && createPortal(
        <div ref={popupRef} style={popupStyle} className={calendarClassName} role="dialog" aria-modal="true" aria-label="Choose date">
          {isDualCalendarMode ? (
            /* Dual Calendar Layout */
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {/* Left Calendar - Start Date */}
              <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "0.75rem", 
                  fontSize: "0.75rem", 
                  fontWeight: 600, 
                  color: primaryColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}>
                  {startDateLabel}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    type="button"
                    style={navButtonStyle}
                    onClick={() => {
                      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
                      setCurrentMonth(newMonth);
                      // Keep right month at least one month ahead
                      if (newMonth.getFullYear() === rightMonth.getFullYear() && newMonth.getMonth() >= rightMonth.getMonth()) {
                        setRightMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
                      }
                    }}
                    aria-label="Previous month (start)"
                  >
                    <ChevronLeft style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <select
                      value={currentMonth.getMonth()}
                      onChange={(e) => {
                        const newMonth = new Date(currentMonth.getFullYear(), parseInt(e.target.value, 10), 1);
                        setCurrentMonth(newMonth);
                        // Ensure right month is always after left month
                        if (newMonth >= rightMonth) {
                          setRightMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
                        }
                      }}
                      style={{...selectStyle, fontSize: "0.8rem", padding: "0.25rem 0.5rem"}}
                      aria-label="Select start month"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      value={currentMonth.getFullYear()}
                      onChange={(e) => {
                        const newYear = parseInt(e.target.value, 10);
                        const newMonth = new Date(newYear, currentMonth.getMonth(), 1);
                        setCurrentMonth(newMonth);
                        if (newMonth >= rightMonth) {
                          setRightMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
                        }
                      }}
                      style={{...selectStyle, fontSize: "0.8rem", padding: "0.25rem 0.5rem"}}
                      aria-label="Select start year"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    style={navButtonStyle}
                    onClick={() => {
                      const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                      setCurrentMonth(newMonth);
                      // Keep right month at least one month ahead
                      if (newMonth.getFullYear() === rightMonth.getFullYear() && newMonth.getMonth() >= rightMonth.getMonth()) {
                        setRightMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
                      }
                    }}
                    aria-label="Next month (start)"
                  >
                    <ChevronRight style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
                  </button>
                </div>

                <div style={weekdayRowStyle} role="row">
                  {getWeekdayLabels().map((day) => (
                    <div key={`left-${day}`} role="columnheader">{day}</div>
                  ))}
                </div>

                <div style={gridStyle} role="grid">{renderDaysForMonth(currentMonth, "left-")}</div>
              </div>

              {/* Divider */}
              <div style={{ 
                width: "1px", 
                background: "rgba(30, 41, 59, 0.65)", 
                alignSelf: "stretch",
                margin: "0 0.25rem"
              }} />

              {/* Right Calendar - End Date */}
              <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "0.75rem", 
                  fontSize: "0.75rem", 
                  fontWeight: 600, 
                  color: primaryColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}>
                  {endDateLabel}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    type="button"
                    style={navButtonStyle}
                    onClick={() => {
                      const newMonth = new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1, 1);
                      // Prevent right month from going before or equal to left month
                      if (newMonth > currentMonth) {
                        setRightMonth(newMonth);
                      }
                    }}
                    aria-label="Previous month (end)"
                  >
                    <ChevronLeft style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <select
                      value={rightMonth.getMonth()}
                      onChange={(e) => {
                        const newMonth = new Date(rightMonth.getFullYear(), parseInt(e.target.value, 10), 1);
                        // Ensure right month is always after left month
                        if (newMonth > currentMonth) {
                          setRightMonth(newMonth);
                        }
                      }}
                      style={{...selectStyle, fontSize: "0.8rem", padding: "0.25rem 0.5rem"}}
                      aria-label="Select end month"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      value={rightMonth.getFullYear()}
                      onChange={(e) => {
                        const newYear = parseInt(e.target.value, 10);
                        const newMonth = new Date(newYear, rightMonth.getMonth(), 1);
                        if (newMonth > currentMonth) {
                          setRightMonth(newMonth);
                        }
                      }}
                      style={{...selectStyle, fontSize: "0.8rem", padding: "0.25rem 0.5rem"}}
                      aria-label="Select end year"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    style={navButtonStyle}
                    onClick={() =>
                      setRightMonth(new Date(rightMonth.getFullYear(), rightMonth.getMonth() + 1, 1))
                    }
                    aria-label="Next month (end)"
                  >
                    <ChevronRight style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
                  </button>
                </div>

                <div style={weekdayRowStyle} role="row">
                  {getWeekdayLabels().map((day) => (
                    <div key={`right-${day}`} role="columnheader">{day}</div>
                  ))}
                </div>

                <div style={gridStyle} role="grid">{renderDaysForMonth(rightMonth, "right-")}</div>
              </div>
            </div>
          ) : (
            /* Single Calendar Layout (original) */
            <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              style={navButtonStyle}
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
              }
              aria-label="Previous month"
            >
              <ChevronLeft style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <select
                value={currentMonth.getMonth()}
                onChange={handleMonthChange}
                style={selectStyle}
                aria-label="Select month"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={currentMonth.getFullYear()}
                onChange={handleYearChange}
                style={selectStyle}
                aria-label="Select year"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              style={navButtonStyle}
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
              }
              aria-label="Next month"
            >
              <ChevronRight style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }} />
            </button>
          </div>

          <div style={weekdayRowStyle} role="row">
            {getWeekdayLabels().map((day) => (
              <div key={day} role="columnheader">{day}</div>
            ))}
          </div>

          <div style={gridStyle} role="grid">{renderDays()}</div>
            </>
          )}

          {/* Today Button */}
          {showTodayButton && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <button
                type="button"
                onClick={handleTodayClick}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  border: `1px solid ${primaryColor}`,
                  background: primaryColor,
                  color: "#000000",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                }}
              >
                {todayButtonText}
              </button>
            </div>
          )}

          {/* Action Buttons Section */}
          {(hasConfirmCancel || (actionButtons && actionButtons.length > 0)) && (
            <div style={{ 
              marginTop: "1rem", 
              paddingTop: "1rem", 
              borderTop: "1px solid rgba(30, 41, 59, 0.65)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
              flexWrap: "wrap"
            }}>
              {/* Custom Action Buttons */}
              {actionButtons?.map((btn, index) => {
                const btnStyle: React.CSSProperties = {
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                };
                
                if (btn.variant === "primary") {
                  btnStyle.background = primaryColor;
                  btnStyle.color = "#000000";
                  btnStyle.border = `1px solid ${primaryColor}`;
                } else if (btn.variant === "ghost") {
                  btnStyle.background = "transparent";
                  btnStyle.color = "#e2e8f0";
                  btnStyle.border = "1px solid transparent";
                } else {
                  // secondary (default)
                  btnStyle.background = "rgba(15, 23, 42, 0.78)";
                  btnStyle.color = "#e2e8f0";
                  btnStyle.border = "1px solid rgba(30, 41, 59, 0.65)";
                }
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => btn.onClick(isRange ? (range[0] && range[1] ? [range[0], range[1]] : null) : singleDate)}
                    style={btnStyle}
                  >
                    {btn.label}
                  </button>
                );
              })}
              
              {/* Cancel Button */}
              {showCancelButton && (
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onClose?.();
                    onCancel?.();
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    border: "1px solid rgba(30, 41, 59, 0.65)",
                    background: "rgba(15, 23, 42, 0.78)",
                    color: "#e2e8f0",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                >
                  {cancelButtonText}
                </button>
              )}
              
              {/* Confirm Button */}
              {showConfirmButton && (
                <button
                  type="button"
                  onClick={() => {
                    const currentValue = isRange 
                      ? (range[0] && range[1] ? [range[0], range[1]] as [Date, Date] : null) 
                      : singleDate;
                    onConfirm?.(currentValue);
                    setOpen(false);
                    onClose?.();
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: 8,
                    border: `1px solid ${primaryColor}`,
                    background: primaryColor,
                    color: "#000000",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  {confirmButtonText}
                </button>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
export type { 
  DatePickerProps, 
  DatePickerMode, 
  DatePickerSize,
  DateFormat,
  SelectedDateStyles,
  RangeHighlightStyles,
  TodayIndicatorStyles,
  ActionButton
};
