export default function RiskGauge({ score, size = 220 }) {
  const clampedScore = Math.max(0, Math.min(1, score));
  const percentage = clampedScore * 100;

  // Gauge arc calculations (semicircle, 180 degrees)
  const radius = (size - 30) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const startAngle = Math.PI;
  const endAngle = 0;
  const needleAngle = Math.PI - clampedScore * Math.PI;

  // Arc path
  const arcPath = (startA, endA) => {
    const x1 = cx + radius * Math.cos(startA);
    const y1 = cy - radius * Math.sin(startA);
    const x2 = cx + radius * Math.cos(endA);
    const y2 = cy - radius * Math.sin(endA);
    const largeArc = startA - endA > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Needle endpoint
  const needleLen = radius - 15;
  const needleX = cx + needleLen * Math.cos(needleAngle);
  const needleY = cy - needleLen * Math.sin(needleAngle);

  // Color based on score
  const getColor = () => {
    if (percentage < 15) return "#059669"; // Green
    if (percentage < 35) return "#2563eb"; // Blue
    if (percentage < 60) return "#d97706"; // Amber
    return "#dc2626"; // Red
  };

  const getLabel = () => {
    if (percentage < 5) return "Very Low Risk";
    if (percentage < 15) return "Low Risk";
    if (percentage < 35) return "Medium Risk";
    if (percentage < 60) return "High Risk";
    return "Very High Risk";
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
        {/* Background arc */}
        <path
          d={arcPath(startAngle, endAngle)}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={14}
          strokeLinecap="round"
        />

        {/* Green zone (0-15%) */}
        <path
          d={arcPath(Math.PI, Math.PI * 0.85)}
          fill="none"
          stroke="#059669"
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.25}
        />
        {/* Blue zone (15-35%) */}
        <path
          d={arcPath(Math.PI * 0.85, Math.PI * 0.65)}
          fill="none"
          stroke="#2563eb"
          strokeWidth={14}
          opacity={0.25}
        />
        {/* Amber zone (35-60%) */}
        <path
          d={arcPath(Math.PI * 0.65, Math.PI * 0.40)}
          fill="none"
          stroke="#d97706"
          strokeWidth={14}
          opacity={0.25}
        />
        {/* Red zone (60-100%) */}
        <path
          d={arcPath(Math.PI * 0.40, 0)}
          fill="none"
          stroke="#dc2626"
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.25}
        />

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={getColor()}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={6} fill={getColor()} />
        <circle cx={cx} cy={cy} r={3} fill="white" />

        {/* Score text */}
        <text
          x={cx}
          y={cy + 28}
          textAnchor="middle"
          className="text-2xl font-bold"
          fill={getColor()}
          fontSize={24}
          fontWeight={700}
        >
          {(percentage).toFixed(1)}%
        </text>
      </svg>
      <p className="mt-1 text-sm font-semibold" style={{ color: getColor() }}>
        {getLabel()}
      </p>
    </div>
  );
}
