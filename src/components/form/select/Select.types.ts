import type { SelectHTMLAttributes } from "react";

export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
	label: string;
	value: string | number;
	disabled?: boolean;
}

export interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
	options?: SelectOption[];
	size?: SelectSize;
	placeholder?: string;
	helperText?: string;
	error?: boolean;
}

export interface SelectGroupProps extends Omit<SelectProps, "options"> {
	groups: Array<{
		label: string;
		options: SelectOption[];
	}>;
}
