import React from 'react'

interface ArcChartProps {
	percent: number | number[];
	background: number;
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

const ARC_DISTANCE = 1.08;

export const ArcChart = ({
	percent,
	background,
}: ArcChartProps) => {
	const percentArray = Array.isArray(percent) ? percent : [percent];
	const strokeWidth = 60 * 0.5 / percentArray.length
	const outerRadius = 60 - (ARC_DISTANCE * strokeWidth)
	const props = percentArray.reduce((acc, curr) => {
		const radius = outerRadius - strokeWidth * ARC_DISTANCE * acc.length;
		if (radius <= 0) {
			throw new Error("input paramets does match");
		}
		const circumference = 2 * Math.PI * radius;
		const offset = (1 - curr) * circumference;
		return [
			...acc,
			{ radius, circumference, offset, color: colorPalette[acc.length] },
		];
	}, [] as Array<{ color: string; radius: number; circumference: number; offset: number }>);

	const backgroundWidth =
		strokeWidth * percentArray.length * ARC_DISTANCE * 1.25;
	const backgroundRadius =
		outerRadius - ((percentArray.length - 1) * strokeWidth * ARC_DISTANCE) / 2;
	const circumference = 2 * Math.PI * backgroundRadius;
	const backgroundProps = {
		radius: backgroundRadius,
		circumference,
		offset: (1 - background) * circumference,
		color: backgroundColor,
	};

	return (
		<svg viewBox="0 0 120 120">
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
			/>
			{props.map(({ circumference, offset, radius, color }) => (
				<circle
					key={offset}
					cx="60"
					cy="60"
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="none"
					fillOpacity="1"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="butt"
					transform="rotate(-270 60 60)"
				/>
			))}
		</svg>
	);
};
