import React, { CSSProperties, HTMLAttributes, ReactNode, ForwardedRef } from 'react';


type BoxProps = {
	sx?: CSSProperties | string;
	children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Boxes = React.forwardRef<HTMLDivElement, BoxProps>(
	({ sx = {}, children, style, ...rest }, ref: ForwardedRef<HTMLDivElement>) => {
		let mergedStyle: CSSProperties = {};
		if (typeof sx === 'object') {
			mergedStyle = { ...style, ...sx };
		} else if (typeof sx === 'string') {
			mergedStyle = { ...style };
			// Optionally, parse string styles if needed
		}
		return (
			<div ref={ref} style={mergedStyle} {...rest}>
				{children}
			</div>
		 ); 
	}
);

Boxes.displayName = 'Boxes';
export default Boxes;
