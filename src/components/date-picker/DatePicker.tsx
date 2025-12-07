import React, { useEffect, useRef, useState } from "react";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "@/utils/icons";

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

const formatDate = (date: Date) => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

const isStrictValidDate = (value: string) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false;
  }

  const [dayStr, monthStr, yearStr] = value.split("/");
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (month < 1 || month > 12 || day < 1 || year < 1000 || year > 9999) {
    return false;
  }

  const reference = new Date(year, month - 1, day);
  return reference.getFullYear() === year && reference.getMonth() === month - 1 && reference.getDate() === day;
};

const parseDate = (value: string): Date | null => {
  if (!isStrictValidDate(value)) {
    return null;
  }

  const [dayStr, monthStr, yearStr] = value.split("/");
  const parsed = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
  parsed.setHours(0, 0, 0, 0);
  return parsed;
};

interface DatePickerProps {
  mode?: "single" | "range";
  value?: Date | [Date, Date] | null;
  onChange?: (date: Date | [Date, Date] | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  validateRange?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
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
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<[Date | null, Date | null]>(
    Array.isArray(value) ? [value[0] ?? null, value[1] ?? null] : [null, null]
  );
  const [singleDate, setSingleDate] = useState<Date | null>(
    !Array.isArray(value) && value instanceof Date ? value : null
  );
  const [manualInput, setManualInput] = useState(() => {
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (start && end) {
        return `${formatDate(start)} - ${formatDate(end)}`;
      }
      if (start) {
        return formatDate(start);
      }
      return "";
    }
    return value instanceof Date ? formatDate(value) : "";
  });
  const [internalError, setInternalError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isRange = mode === "range";
  const today = startOfDay(new Date());
  const effectiveMin = minDate || (disablePastDates ? today : undefined);

  useEffect(() => {
    if (!open || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setPosition(spaceBelow < 320 ? "top" : "bottom");
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
          setManualInput(`${formatDate(startVal)} - ${formatDate(endVal)}`);
          setCurrentMonth(startVal);
        } else if (startVal) {
          setManualInput(formatDate(startVal));
          setCurrentMonth(startVal);
        } else {
          setManualInput("");
        }
      } else if (value instanceof Date) {
        setRange([value, null]);
        setManualInput(formatDate(value));
        setCurrentMonth(value);
      } else {
        setRange([null, null]);
        setManualInput("");
      }
    } else {
      if (value instanceof Date) {
        setSingleDate(value);
        setManualInput(formatDate(value));
        setCurrentMonth(value);
      } else {
        setSingleDate(null);
        setManualInput("");
      }
    }
  }, [value, isRange]);

  const isDisabled = (day: Date) => {
    if (effectiveMin && isBefore(day, effectiveMin)) return true;
    if (maxDate && isAfter(day, maxDate)) return true;
    return false;
  };

  const handleDayClick = (day: Date) => {
    if (isDisabled(day)) return;

    if (isRange) {
      const [start, end] = range;
      if (!start || (start && end)) {
        setRange([day, null]);
        setManualInput(formatDate(day));
        setInternalError(null);
      } else if (start && !end) {
        if (isBefore(day, start) && validateRange) {
          setInternalError("Start date cannot be after end date");
          return;
        }

        const newRange: [Date, Date] = [startOfDay(start), endOfDay(day)];
        setRange(newRange);
        setManualInput(`${formatDate(newRange[0])} - ${formatDate(newRange[1])}`);
        setInternalError(null);
        onChange?.(newRange);
        setOpen(false);
      }
    } else {
      setSingleDate(day);
      setManualInput(formatDate(day));
      setInternalError(null);
      onChange?.(day);
      setOpen(false);
    }
  };

  const handleManualInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value.replace(/[^\d/-]/g, "").replace(/-{2,}|\/{2,}/g, "/");

    if (/^\d{2}$/.test(val)) val += "/";
    else if (/^\d{2}\/\d{2}$/.test(val)) val += "/";

    if (manualInput.length > val.length) {
      if (/^\d{2}\/$/.test(val)) val = val.slice(0, 2);
      else if (/^\d{2}\/\d{2}\/$/.test(val)) val = val.slice(0, 5);
    }

    setManualInput(val);

    if (val.trim() === "") {
      setInternalError(null);
      setSingleDate(null);
      setRange([null, null]);
      onChange?.(null);
      return;
    }

    if (isRange && val.includes("-")) {
      const [startStr, endStr] = val.split("-").map((segment) => segment.trim());
      const startParsed = parseDate(startStr);
      const endParsed = parseDate(endStr);

      if (!isStrictValidDate(startStr) || !isStrictValidDate(endStr) || !startParsed || !endParsed) {
        if (startStr.length === 10 && endStr.length === 10) {
          setInternalError("Invalid date entered");
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

      const newRange: [Date, Date] = [startOfDay(startParsed), endOfDay(endParsed)];
      setInternalError(null);
      setRange(newRange);
      setCurrentMonth(startParsed);
      onChange?.(newRange);
      return;
    }

    const parsed = parseDate(val);

    if (val.length === 10) {
      if (!parsed) {
        setInternalError("Invalid date entered");
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
      ? `${formatDate(range[0])} - ${formatDate(range[1])}`
      : manualInput
    : manualInput || (singleDate ? formatDate(singleDate) : "");

  const showClearButton = !!formattedValue && !disabled;

  const renderDays = () => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const days: React.ReactNode[] = [];
    const startDay = start.getDay();

    for (let index = 0; index < startDay; index += 1) {
      days.push(
        <div
          key={`empty-${index}`}
          style={{
            width: 40,
            height: 40,
          }}
        />,
      );
    }

    for (let dayIndex = 1; dayIndex <= end.getDate(); dayIndex += 1) {
      const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayIndex);
      const [startDate, endDate] = range;
      const selectedSingle = !isRange && singleDate && isSameDay(singleDate, day);
      const inRange =
        isRange && startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
      const rangeStart = isRange && startDate && isSameDay(startDate, day);
      const rangeEnd = isRange && endDate && isSameDay(endDate, day);
      const disabledDay = isDisabled(day);

      const buttonStyle: React.CSSProperties = {
        width: 40,
        height: 40,
        borderRadius: "999px",
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

      if (disabledDay) {
        buttonStyle.cursor = "not-allowed";
        buttonStyle.color = "#475569";
      }

      if (inRange && !selectedSingle && !rangeStart && !rangeEnd) {
        buttonStyle.background = "rgba(37, 99, 235, 0.22)";
        buttonStyle.color = "#f8fafc";
      }

      if (rangeStart || rangeEnd || selectedSingle) {
        buttonStyle.background = "#2563eb";
        buttonStyle.color = "#ffffff";
        buttonStyle.boxShadow = "0 8px 24px -12px rgba(37, 99, 235, 0.65)";
      }

      days.push(
        <button
          key={dayIndex}
          type="button"
          disabled={disabledDay}
          onClick={() => handleDayClick(day)}
          style={buttonStyle}
        >
          {dayIndex}
        </button>
      );
    }

    return days;
  };

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

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: "24rem",
  };

  const inputWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    border: "1px solid rgba(30, 41, 59, 0.65)",
    padding: "0.55rem 0.75rem",
    background: disabled ? "rgba(15, 23, 42, 0.55)" : "rgba(4, 6, 12, 0.85)",
    color: disabled ? "#64748b" : "#e2e8f0",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
    backdropFilter: "blur(10px)",
  };

  if (combinedError) {
    inputWrapperStyle.border = "1px solid #E53935";
  } else if (!disabled && open) {
    inputWrapperStyle.border = "1px solid #2563eb";
    inputWrapperStyle.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.18)";
  }

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: "transparent",
    fontSize: "0.95rem",
    color: disabled ? "#94a3b8" : "#f8fafc",
    border: "none",
    outline: "none",
    minWidth: 0,
  };

  const iconStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    color: disabled ? "#475569" : "#cbd5f5",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "opacity 0.2s ease",
  };

  const popupStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "24rem",
    zIndex: 20,
    borderRadius: 16,
    border: "1px solid rgba(30, 41, 59, 0.68)",
    background: "rgba(5, 8, 15, 0.96)",
    padding: "1.35rem 1.5rem",
    boxShadow: "0 28px 80px -30px rgba(2, 6, 23, 0.85)",
    backdropFilter: "blur(18px)",
  };

  if (position === "top") {
    popupStyle.bottom = "100%";
    popupStyle.marginBottom = "0.5rem";
  } else {
    popupStyle.marginTop = "0.5rem";
  }

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

  return (
    <div ref={wrapperRef} style={containerStyle}>
      <div style={inputWrapperStyle}>
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={formattedValue}
          onChange={handleManualInput}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={placeholder}
          style={inputStyle}
        />
        <span>
          {showClearButton ? (
            <XIcon
              style={iconStyle}
              onClick={disabled ? undefined : handleClear}
            />
          ) : (
            <CalendarIcon
              style={iconStyle}
              onClick={() => !disabled && setOpen((previous) => !previous)}
            />
          )}
        </span>
      </div>

      {combinedError && (
        <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", color: "#E53935" }}>{combinedError}</p>
      )}

      {open && (
        <div style={popupStyle}>
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
            >
              <ChevronLeftIcon style={{ width: 18, height: 18 }} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <select
                value={currentMonth.getMonth()}
                onChange={handleMonthChange}
                style={selectStyle}
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
            >
              <ChevronRightIcon style={{ width: 18, height: 18 }} />
            </button>
          </div>

          <div style={weekdayRowStyle}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div style={gridStyle}>{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
