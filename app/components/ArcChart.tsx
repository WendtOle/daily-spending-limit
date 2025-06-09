import React from 'react';

interface Value {
	id: string,
	value: number,
	title: string
}

interface ArcChartProps {
	values: Value[];
	reference: number,
	referenceTitle: string,
	onReferenceClick?: () => void,
	onValueClick?: (id: string) => void,
	highlighted?: string,
	innerTitle?: string,
}

const backgroundColor = "#fef9c2";

const ARC_DISTANCE = 1.2;

export const ArcChart = ({
	values,
	reference,
	onReferenceClick,
	onValueClick,
	highlighted,
	innerTitle,
	referenceTitle
}: ArcChartProps) => {
	const strokeWidth = Math.min(55 / 2 / (values.length * ARC_DISTANCE), 20)
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
			{ radius, circumference, offset, color, id: curr.id, opacity, title: curr.title },
		];
	}, [] as Array<{ color: string; radius: number; circumference: number; offset: number, id: string, opacity: number, title: string }>);

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
	const budgetTitle = highlightedBudgetProps?.title ?? ""

	return (
		<svg viewBox="0 0 120 130">
			<defs>
				<filter id="stroke-shadow" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="2" dy="-2" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
				</filter>
				<filter id="stroke-shadow-normal" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
				</filter>
			</defs>
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
			<rect x="70" y="0" width="40" height="10" fill={backgroundColor} />
			<text x="90" y="6" textAnchor="middle" alignmentBaseline="middle" fontSize="6" fill="black">
				{referenceTitle}
			</text>
			<rect x="10" y="0" width="40" height="10" fill={budgetLegendColor}
				filter='url(#stroke-shadow-normal)'
			/>
			<text x="30" y="6" textAnchor="middle" alignmentBaseline="middle" fontSize="6" fill="black">
				{budgetTitle}
			</text>
			<text x="60" y="65" textAnchor="middle" alignmentBaseline="middle" fontSize="8" fontWeight="bold" fill="black">{innerTitle}</text>
		</svg>
	);
};
