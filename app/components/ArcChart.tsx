import React from 'react';

interface Value {
	id: string,
	value: number,
}

interface ArcChartProps {
	values: Value[];
	reference: number;
	onReferenceClick?: () => void,
	onValueClick?: (id: string) => void,
	highlighted?: string,
}

const backgroundColor = "#ffe478";

const colorPalette = [
	"#3B82F6",
	"#10B981",
	"#FB923C",
	"#EF4444",
	"#EC4899",
	"#8B5CF6",
	"#6366F1",
	"#14B8A6",
	"#6B7280",
];

const ARC_DISTANCE = 1.18;

export const ArcChart = ({
	values,
	reference,
	onReferenceClick,
	onValueClick,
	highlighted
}: ArcChartProps) => {
	const strokeWidth = 55 * 0.5 / values.length
	const outerRadius = 55 - (ARC_DISTANCE * strokeWidth)
	const props = values.reduce((acc, curr) => {
		const radius = outerRadius - strokeWidth * ARC_DISTANCE * acc.length;
		if (radius <= 0) {
			throw new Error("input paramets does match");
		}
		const circumference = 2 * Math.PI * radius;
		const offset = (1 - curr.value) * circumference;
		const color = colorPalette[acc.length]
		const opacity = highlighted === curr.id ? 1 : 0.4;
		return [
			...acc,
			{ radius, circumference, offset, color, id: curr.id, opacity },
		];
	}, [] as Array<{ color: string; radius: number; circumference: number; offset: number, id: string, opacity: number }>);

	const backgroundWidth =
		strokeWidth * values.length * ARC_DISTANCE * 1.25;
	const backgroundRadius =
		outerRadius - ((values.length - 1) * strokeWidth * ARC_DISTANCE) / 2;
	const circumference = 2 * Math.PI * backgroundRadius;
	const backgroundProps = {
		radius: backgroundRadius,
		circumference,
		offset: (1 - reference) * circumference,
		color: backgroundColor,
	};

	return (
		<svg viewBox="0 0 120 120">
			<defs>
				<filter id="stroke-shadow" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="2" dy="-2" stdDeviation="2" flood-color="black" flood-opacity="0.5" />
				</filter>
			</defs>
			<circle
				key={backgroundProps.circumference}
				cx="60"
				cy="60"
				r={backgroundProps.radius}
				stroke={backgroundProps.color}
				strokeWidth={backgroundWidth}
				fill="none"
				fillOpacity="1"
				strokeDasharray={backgroundProps.circumference}
				strokeDashoffset={backgroundProps.offset}
				strokeLinecap="butt"
				transform="rotate(-270 60 60)"
				onClick={onReferenceClick}
			/>
			{props.map(({ circumference, offset, radius, color, id, opacity }) => (
				<circle
					key={id}
					cx="60"
					cy="60"
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="none"
					strokeOpacity={opacity}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="butt"
					transform="rotate(-270 60 60)"
					onClick={() => onValueClick?.(id)}
					filter={highlighted === id ? 'url(#stroke-shadow)' : ''}
				/>
			))}
		</svg>
	);
};
