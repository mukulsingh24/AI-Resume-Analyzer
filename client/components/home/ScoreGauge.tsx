type ScoreGaugeProps = {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
};

export default function ScoreGauge({
  score,
  size = 128,
  strokeWidth = 10,
  label = "ATS Score",
}: ScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="animate-ring"
          style={
            {
              "--ring-circumference": circumference,
              "--ring-offset": offset,
              strokeDashoffset: offset,
            } as React.CSSProperties
          }
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold text-slate-900">
          {score}
        </span>
        <span className="text-[11px] font-medium text-slate-500">{label}</span>
      </div>
    </div>
  );
}
