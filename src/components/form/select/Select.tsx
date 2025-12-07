"use client";
import React from "react";
import { classNames } from "@/utils/classNames";
import type { SelectProps, SelectSize, SelectOption, SelectGroupProps } from "./Select.types";

const sizeStyles: Record<SelectSize, string> = {
	sm: "text-sm px-3 py-2 h-9",
	md: "text-base px-3.5 py-2.5 h-11",
	lg: "text-base px-4 py-3 h-12",
};

const baseStyles =
	"block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-200";

const helperTextStyles = "mt-1 text-sm";

const renderOption = (option: SelectOption) => (
	<option key={option.value} value={option.value} disabled={option.disabled}>
		{option.label}
	</option>
);

export const BeeSelect: React.FC<SelectProps> = ({
	options,
	children,
	size = "md",
	helperText,
	error = false,
	className,
	placeholder,
	disabled,
	required,
	...rest
}) => {
	const shouldShowPlaceholder = Boolean(
		placeholder && (rest.value === undefined || rest.value === "" || rest.value === null)
	);

	return (
		<div className={classNames("flex flex-col", disabled ? "opacity-60" : undefined, className)}>
			<select
				{...rest}
				required={required}
				disabled={disabled}
				className={classNames(baseStyles, sizeStyles[size], error ? errorStyles : undefined)}
				aria-invalid={error}
			>
				{placeholder && shouldShowPlaceholder && (
					<option value="" disabled={required} hidden={required}>
						{placeholder}
					</option>
				)}
				{children}
				{!children && options?.map(renderOption)}
			</select>
			{helperText && (
				<span className={classNames(helperTextStyles, error ? "text-red-600" : "text-gray-500")}>
					{helperText}
				</span>
			)}
		</div>
	);
};

export const BeeSelectGroup: React.FC<SelectGroupProps> = ({
	groups,
	className,
	...rest
}) => (
	<BeeSelect {...rest} className={className}>
		{groups.map((group) => (
			<optgroup key={group.label} label={group.label}>
				{group.options.map(renderOption)}
			</optgroup>
		))}
	</BeeSelect>
);

export default BeeSelect;
