import { Card } from "@/components/ui";
import {
  DotMatrix,
  MiniBars,
  MiniCandles,
  Ring,
} from "@/components/charts";
import {
  ChevronRight,
  Share2,
  Clock,
  DollarSign,
  ChevronDown,
  Lock,
  CandlestickChart,
  MoreHorizontal,
  SlidersHorizontal,
  Search,
  X,
  Check,
  ShieldAlert,
} from "lucide-react";
import {
  attendanceToday,
  computeDailyPay,
  currency,
  employeeById,
  hoursBetween,
  payouts,
} from "@/lib/data";

// deterministic pseudo-random fill for the dot matrices
const fill = (n: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const v = Math.abs(Math.sin((i + 1) * seed * 0.7));
    return v;
  });

const candles = [
  { o: 4, c: 6, h: 7, l: 3 }, { o: 6, c: 5, h: 7, l: 4 }, { o: 5, c: 8, h: 9, l: 5 },
  { o: 8, c: 7, h: 9, l: 6 }, { o: 7, c: 10, h: 11, l: 7 }, { o: 10, c: 9, h: 11, l: 8 },
  { o: 9, c: 12, h: 13, l: 8 }, { o: 12, c: 11, h: 13, l: 10 }, { o: 11, c: 14, h: 15, l: 10 },
  { o: 14, c: 13, h: 15, l: 12 }, { o: 13, c: 16, h: 17, l: 12 }, { o: 16, c: 18, h: 19, l: 15 },
];

const pipeline = [
  { label: "Hours verified", done: true },
  { label: "Manager approval", done: true },
  { label: "Finance sign-off", done: false },
  { label: "Disbursement", done: false },
];

export default function Dashboard() {
  const present = attendanceToday.filter((a) => a.checkIn).length;
  const accruedToday = attendanceToday.reduce((sum, a) => {
    const emp = employeeById(a.employeeId);
    if (!emp) return sum;
    return sum + computeDailyPay(emp.hourlyRate, hoursBetween(a.checkIn, a.checkOut));
  }, 0);
  const batchTotal = payouts.reduce((s, p) => s + p.gross, 0);
  const secured = 37;
  const totalDevices = 40;

  return (
    <div className="space-y-6 pt-1">
      {/* Title + breadcrumb */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center text-xs text-muted">
            Home <ChevronRight size={13} className="mx-0.5" /> Overview
          </div>
          <h1 className="mt-1 text-[34px] font-bold leading-none text-ink">
            Operations Overview
          </h1>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card text-muted shadow-card">
          <Share2 size={16} />
        </button>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-12 gap-5">
        {/* Disbursement account card */}
        <Card className="col-span-12 p-5 xl:col-span-4">
          <div className="rounded-xl2 bg-gradient-to-br from-navy to-slate2 p-5 text-white">
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold tracking-wide">PAYROLL</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                <span className="flex items-center gap-1">
                  Auto-disburse <ChevronDown size={12} />
                </span>
              </span>
            </div>
            <div className="mt-6 text-xs text-white/60">Linked disbursement account</div>
            <div className="text-lg font-semibold tracking-widest">**** 2719</div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 rounded-full bg-white py-2 text-sm font-semibold text-navy">
                Disburse
              </button>
              <button className="flex-1 rounded-full bg-white/10 py-2 text-sm font-semibold text-white">
                Hold
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-1 pt-4">
            <div>
              <div className="text-xs text-muted">Pending batch · Jun 1–15</div>
              <div className="text-xl font-bold text-ink">{currency(batchTotal)}</div>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" /> 4 awaiting
            </span>
          </div>
        </Card>

        {/* Hours verified dot matrix */}
        <Card className="col-span-12 p-5 sm:col-span-6 xl:col-span-3">
          <div className="flex items-center justify-between">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
              <Clock size={16} />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-canvas px-3 py-1 text-xs text-muted">
              Weekly <ChevronDown size={12} />
            </span>
          </div>
          <div className="my-4">
            <DotMatrix rows={6} cols={14} values={fill(84, 1.3)} />
          </div>
          <div className="text-xs text-muted">Hours verified</div>
          <div className="text-2xl font-bold text-ink">3,184 h</div>
        </Card>

        {/* Total disbursed dot matrix */}
        <Card className="col-span-12 p-5 sm:col-span-6 xl:col-span-3">
          <div className="flex items-center justify-between">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
              <DollarSign size={16} />
            </span>
            <span className="flex items-center gap-1 rounded-full bg-canvas px-3 py-1 text-xs text-muted">
              Weekly <ChevronDown size={12} />
            </span>
          </div>
          <div className="my-4">
            <DotMatrix rows={6} cols={14} values={fill(84, 2.1)} />
          </div>
          <div className="text-xs text-muted">Total disbursed</div>
          <div className="text-2xl font-bold text-ink">$128,450</div>
        </Card>

        {/* Lock + growth stack */}
        <div className="col-span-12 grid grid-cols-2 gap-5 xl:col-span-2 xl:grid-cols-1">
          <Card className="flex items-center gap-3 p-5">
            <Ring pct={(secured / totalDevices) * 100} size={56}>
              <Lock size={18} className="text-accent" />
            </Ring>
            <div>
              <div className="text-xs text-muted">Devices secured</div>
              <div className="text-lg font-bold text-ink">
                {secured}/{totalDevices}
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="text-2xl font-bold text-ink">+8.2%</div>
            <div className="text-xs text-muted">Attendance growth</div>
            <div className="mt-3">
              <MiniBars data={[5, 7, 4, 8, 6, 10, 7, 12]} highlight={7} />
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-12 gap-5">
        {/* Left column */}
        <div className="col-span-12 space-y-5 xl:col-span-4">
          <div className="grid grid-cols-2 gap-5">
            <Card className="p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
                <Clock size={16} />
              </span>
              <div className="mt-3 text-2xl font-bold text-ink">8h 12m</div>
              <div className="text-xs text-muted">Avg shift today</div>
              <div className="mt-3">
                <DotMatrix rows={3} cols={8} values={fill(24, 3.4)} />
              </div>
            </Card>
            <Card className="flex flex-col justify-between p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Period</span>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-white">
                  Jun
                </span>
              </div>
              <div>
                <div className="text-2xl font-bold text-ink">{present}</div>
                <div className="text-xs text-muted">checked in today</div>
              </div>
            </Card>
          </div>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
                <CandlestickChart size={16} />
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">
                +9.3%
              </span>
            </div>
            <div className="mt-4">
              <MiniCandles data={candles} />
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-ink">$16,073</div>
              <div className="text-xs text-muted">Labor cost · this period</div>
            </div>
          </Card>
        </div>

        {/* Activity manager */}
        <Card className="col-span-12 p-5 xl:col-span-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-ink">Activity Manager</h3>
            <div className="flex items-center gap-2 text-muted">
              <MoreHorizontal size={18} />
              <span className="flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs">
                <SlidersHorizontal size={13} /> Filters
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted">
            <Search size={16} />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Search in activity…"
            />
            {["Granted", "Today"].map((c) => (
              <span
                key={c}
                className="flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-xs text-ink"
              >
                {c} <X size={12} />
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* accrued today candle card */}
            <div className="rounded-xl2 border border-line p-4">
              <div className="text-xl font-bold text-ink">{currency(accruedToday)}</div>
              <div className="text-xs text-muted">Accrued today</div>
              <div className="mt-3">
                <MiniCandles data={candles.slice(0, 8)} />
              </div>
            </div>

            {/* payout pipeline step list */}
            <div className="rounded-xl2 border border-line p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ink">Payout pipeline</span>
                <MoreHorizontal size={16} className="text-muted" />
              </div>
              <div className="mt-3 space-y-3">
                {pipeline.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                        s.done
                          ? "bg-accent text-white"
                          : "border border-line text-muted"
                      }`}
                    >
                      {s.done ? <Check size={11} /> : i + 1}
                    </span>
                    <span
                      className={`text-sm ${
                        s.done ? "text-ink" : "text-muted"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* device enrollment verification card */}
            <div className="flex flex-col rounded-xl2 border border-line p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-soft text-accent">
                <ShieldAlert size={18} />
              </span>
              <div className="mt-3 text-sm font-semibold text-ink">
                Enrollment check
              </div>
              <p className="mt-1 text-xs text-muted">
                3 employees have a single biometric template. Add a fallback method.
              </p>
              <button className="mt-3 rounded-full bg-accent py-2 text-xs font-semibold text-white">
                Review
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
