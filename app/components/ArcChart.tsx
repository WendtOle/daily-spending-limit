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

const backgroundColor = "#fef9c2";

const ARC_DISTANCE = 1.2;

export const ArcChart = ({
	values,
	reference,
	onReferenceClick,
	onValueClick,
	highlighted
}: ArcChartProps) => {
	const strokeWidth = Math.min(55 * 0.5 / values.length, 18)
	const outerRadius = 55 - (ARC_DISTANCE * strokeWidth)
	const props = values.reduce((acc, curr) => {
		const radius = outerRadius - strokeWidth * ARC_DISTANCE * acc.length;
		if (radius <= 0) {
			throw new Error("input paramets does match");
		}
		const circumference = 2 * Math.PI * radius;
		const offset = (1 - curr.value) * circumference;
		const color = curr.value > reference ? "rgb(74 222 128)" : "rgb(248,113,113)"
		const opacity = highlighted === curr.id ? 1 : 0.4;
		return [
			...acc,
			{ radius, circumference, offset, color, id: curr.id, opacity },
		];
	}, [] as Array<{ color: string; radius: number; circumference: number; offset: number, id: string, opacity: number }>);

	const orderedProps = props.sort((left, right) => left.id === highlighted ? 1 : 0)
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

	const timeLegendLineEnd = reference >= 0.5 ? 65 - (backgroundRadius - backgroundWidth / 2) : 120

	const highlightedBudgetProps = props.find(prop => prop.id === highlighted)
	const budgetLegendColor = highlightedBudgetProps?.color
	const budgetLegendLineStart = 65 + (highlightedBudgetProps?.radius ?? 0) - strokeWidth / 2
	return (
		<svg viewBox="0 0 120 130">
			<defs>
				<filter id="stroke-shadow" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="2" dy="-2" stdDeviation="2" flood-color="black" flood-opacity="0.5" />
				</filter>
			</defs>
			<line x1="61" y1="0" x2="61" y2={timeLegendLineEnd} stroke={backgroundColor} stroke-width="2" />
			<circle
				key={backgroundProps.circumference}
				cx="65"
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
			{orderedProps.map(({ circumference, offset, radius, color, id, opacity }) => (
				<circle
					key={id}
					cx="65"
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
			<rect x="20" y="0" width="40" height="10" fill={backgroundColor} />
			<text x="40" y="6" text-anchor="middle" alignment-baseline="middle" font-size="6" fill="black">
				21 days left
			</text>
			<line x1="61" y1={budgetLegendLineStart} x2="61" y2="120" stroke={budgetLegendColor} stroke-width="2" />
			<rect x="60" y="120" width="40" height="10" fill={budgetLegendColor} />
			<text x="80" y="126" text-anchor="middle" alignment-baseline="middle" font-size="6" fill="black">
				First Budget
			</text>
		</svg>
	);
};
