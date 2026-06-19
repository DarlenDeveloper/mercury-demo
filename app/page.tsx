import { Card, CardHead, SegTabs, Badge } from "@/components/ui";
import { Gauge, TrendArea, Heatmap } from "@/components/charts";
import {
  attendanceToday,
  computeDailyPay,
  currency,
  departmentActivity,
  employeeById,
  hoursBetween,
  methodSplit,
  scanTrend,
} from "@/lib/data";

export default function Dashboard() {
  const present = attendanceToday.filter(
    (a) => a.state === "checked_in" || a.state === "checked_out" || a.state === "late"
  ).length;
  const totalScans = scanTrend.reduce((s, p) => s + p.scans, 0);

  // Projected pay accrued today from biometric hours
  const projectedToday = attendanceToday.reduce((sum, a) => {
    const emp = employeeById(a.employeeId);
    if (!emp) return sum;
    const worked = hoursBetween(a.checkIn, a.checkOut);
    return sum + computeDailyPay(emp.hourlyRate, worked);
  }, 0);

  const heatRows = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const heatCols = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const heat = heatRows.map((_, r) =>
    heatCols.map((_, c) => {
      const base = 0.6 + 0.3 * Math.sin(r + c) + 0.1 * Math.cos(c * 1.7);
      return Math.max(0.1, Math.min(1, base));
    })
  );

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Live biometric attendance and automated payout overview
          </p>
        </div>
        <SegTabs tabs={["Daily", "Weekly", "Monthly", "Annual"]} active="Daily" />
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left column: gauge + method breakdown */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHead title="Today's Attendance" icon={<span>◷</span>} />
          <Gauge value={present} max={attendanceToday.length} label="Present today" />
          <div className="grid grid-cols-3 gap-2 border-t border-line px-5 py-4">
            {methodSplit.map((m) => (
              <div key={m.method} className="text-center">
                <div className="text-lg font-semibold text-ink">{m.count.toLocaleString()}</div>
                <div className="text-[11px] text-muted">{m.method}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Middle/right: big trend */}
        <Card className="col-span-12 lg:col-span-8">
          <CardHead
            title="Scan Volume Breakdown"
            icon={<span>📈</span>}
            subtitle="Authentication events across all devices · today"
            right={<Badge tone="green">+12.4%</Badge>}
          />
          <div className="flex items-baseline gap-3 px-5 pt-3">
            <div className="text-3xl font-bold text-ink">{totalScans.toLocaleString()}</div>
            <span className="text-sm text-muted">total scans</span>
          </div>
          <div className="px-2 pb-3 pt-2">
            <TrendArea data={scanTrend} dataKey="scans" xKey="h" />
          </div>
        </Card>

        {/* Billing/payout snapshot */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHead
            title="Payout Accrual"
            icon={<span>＄</span>}
            subtitle="Earned today from verified hours"
            right={<span className="text-xs font-medium text-accent">Refresh</span>}
          />
          <div className="px-5 pt-3">
            <div className="text-3xl font-bold text-ink">{currency(projectedToday)}</div>
            <div className="mt-1 text-xs text-muted">accrued · {present} employees</div>
          </div>
          <div className="mt-3 divide-y divide-line border-t border-line">
            {attendanceToday
              .filter((a) => a.checkIn)
              .slice(0, 4)
              .map((a) => {
                const emp = employeeById(a.employeeId)!;
                const worked = hoursBetween(a.checkIn, a.checkOut);
                return (
                  <div key={a.employeeId} className="flex items-center justify-between px-5 py-2.5">
                    <div className="text-sm text-ink">{emp.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted">
                        {worked ? `${worked.toFixed(1)}h` : "active"}
                      </span>
                      <span className="text-sm font-semibold text-ink">
                        {currency(computeDailyPay(emp.hourlyRate, worked))}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Department activity */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHead title="Top Departments" icon={<span>▦</span>} subtitle="By scan volume" />
          <div className="space-y-3 px-5 py-4">
            {departmentActivity.map((d) => (
              <div key={d.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-ink">{d.name}</span>
                  <span className="text-muted">
                    {d.pct}% · {d.count.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-canvas">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${d.pct * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance consistency heatmap */}
        <Card className="col-span-12 lg:col-span-4">
          <CardHead
            title="Attendance Consistency"
            icon={<span>▥</span>}
            subtitle="On-time rate by weekday"
            right={
              <button className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                Report
              </button>
            }
          />
          <div className="px-5 py-4">
            <div className="mb-3 text-3xl font-bold text-ink">
              91%
              <span className="ml-2 align-middle text-xs font-medium text-muted">
                avg on-time
              </span>
            </div>
            <Heatmap rows={heatRows} cols={heatCols} values={heat} />
          </div>
        </Card>
      </div>
    </div>
  );
}
