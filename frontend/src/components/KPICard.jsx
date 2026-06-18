const COLOR_MAP = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  red: { bg: "bg-red-50", icon: "text-red-600", border: "border-red-100" },
  green: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100" },
  slate: { bg: "bg-slate-50", icon: "text-slate-600", border: "border-slate-100" },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = "blue",
}) {
  const colors = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div className={`rounded-xl border ${colors.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
          {trend && trendLabel && (
            <p className={`mt-2 text-xs font-medium ${
              trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-slate-500"
            }`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendLabel}
            </p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
          {Icon && <Icon className={`h-5 w-5 ${colors.icon}`} />}
        </div>
      </div>
    </div>
  );
}
