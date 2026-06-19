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
            <Cell fill="#1f5fd9" />
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
            <stop offset="0%" stopColor="#1f5fd9" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#1f5fd9" stopOpacity={0} />
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
          stroke="#1f5fd9"
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
    if (v >= 0.85) return "#1f5fd9";
    if (v >= 0.65) return "#5b8ae6";
    if (v >= 0.45) return "#9fbcf0";
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

/* Dot-matrix intensity grid, Orbix "Total income / paid" style */
export function DotMatrix({
  rows = 6,
  cols = 18,
  values,
  color = "#1f5fd9",
}: {
  rows?: number;
  cols?: number;
  values: number[]; // length rows*cols, 0..1
  color?: string;
}) {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const v = values[i] ?? 0;
        const on = v > 0.12;
        return (
          <span
            key={i}
            className="aspect-square rounded-[3px]"
            style={{
              background: on ? color : "#e7eaf0",
              opacity: on ? 0.35 + v * 0.65 : 1,
            }}
          />
        );
      })}
    </div>
  );
}

/* Mini vertical bars with one highlighted, Orbix "Growth rate" style */
export function MiniBars({
  data,
  highlight,
  color = "#1f5fd9",
}: {
  data: number[];
  highlight?: number;
  color?: string;
}) {
  const max = Math.max(...data);
  return (
    <div className="flex h-16 items-end gap-1">
      {data.map((d, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-[3px]"
          style={{
            height: `${(d / max) * 100}%`,
            background: i === highlight ? color : "#e7eaf0",
          }}
        />
      ))}
    </div>
  );
}

/* Candlestick-ish mini chart, Orbix "Main Stocks" style */
export function MiniCandles({
  data,
  color = "#1f5fd9",
}: {
  data: { o: number; c: number; h: number; l: number }[];
  color?: string;
}) {
  const all = data.flatMap((d) => [d.h, d.l]);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const span = max - min || 1;
  const y = (v: number) => 100 - ((v - min) / span) * 100;
  return (
    <div className="flex h-20 items-stretch gap-1.5">
      {data.map((d, i) => {
        const up = d.c >= d.o;
        const bodyTop = y(Math.max(d.o, d.c));
        const bodyBot = y(Math.min(d.o, d.c));
        return (
          <div key={i} className="relative flex-1">
            <span
              className="absolute left-1/2 w-px -translate-x-1/2"
              style={{
                top: `${y(d.h)}%`,
                height: `${y(d.l) - y(d.h)}%`,
                background: up ? color : "#c8cedb",
              }}
            />
            <span
              className="absolute left-1/2 w-[60%] -translate-x-1/2 rounded-[2px]"
              style={{
                top: `${bodyTop}%`,
                height: `${Math.max(2, bodyBot - bodyTop)}%`,
                background: up ? color : "#c8cedb",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

/* Ring progress, Orbix circular badge style */
export function Ring({
  pct,
  size = 64,
  color = "#1f5fd9",
  children,
}: {
  pct: number;
  size?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${pct * 3.6}deg, #ececf1 0deg)`,
      }}
    >
      <div
        className="grid place-items-center rounded-full bg-card"
        style={{ width: size - 12, height: size - 12 }}
      >
        {children}
      </div>
    </div>
  );
}
