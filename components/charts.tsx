"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

/* Semicircular gauge, MoonRow "Today's Increase" style */
export function Gauge({
  value,
  max,
  label,
}: {
  value: number;
  max: number;
  label: string;
}) {
  const pct = Math.min(1, value / max);
  const data = [
    { name: "filled", value: pct },
    { name: "rest", value: 1 - pct },
  ];
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            cornerRadius={8}
          >
            <Cell fill="#f4732a" />
            <Cell fill="#e7eaf0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 text-center">
        <div className="text-3xl font-bold text-ink">{value.toLocaleString()}</div>
        <div className="text-xs text-muted">{label}</div>
      </div>
    </div>
  );
}

/* Area trend, MoonRow "Target Sales Breakdown" style */
export function TrendArea({
  data,
  dataKey,
  xKey,
}: {
  data: Record<string, number | string>[];
  dataKey: string;
  xKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4732a" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#f4732a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#8b93a4", fontSize: 11 }}
          tickFormatter={(v) => `${v}:00`}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            boxShadow: "0 8px 30px rgba(20,28,46,0.15)",
            fontSize: 12,
          }}
          labelFormatter={(v) => `${v}:00`}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="#f4732a"
          strokeWidth={2.5}
          fill="url(#g)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* Attendance-consistency heatmap, MoonRow "User Retention Cohorts" style */
export function Heatmap({
  rows,
  cols,
  values,
}: {
  rows: string[];
  cols: string[];
  values: number[][]; // 0..1
}) {
  const shade = (v: number) => {
    if (v >= 0.85) return "#f4732a";
    if (v >= 0.65) return "#f79a5e";
    if (v >= 0.45) return "#fbc19b";
    if (v >= 0.2) return "#cfd6e0";
    return "#e7eaf0";
  };
  return (
    <div className="flex gap-3">
      <div className="flex flex-col justify-around py-1 text-[11px] text-muted">
        {rows.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-1.5">
          {values.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.map((v, ci) => (
                <div
                  key={ci}
                  className="h-5 flex-1 rounded-[5px]"
                  style={{ background: shade(v) }}
                  title={`${rows[ri]} · ${cols[ci]} · ${Math.round(v * 100)}%`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted">
          {cols.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
