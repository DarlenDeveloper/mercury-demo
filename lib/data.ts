import {
  AccessLog,
  AttendanceRecord,
  Employee,
  Payout,
} from "./types";

export const STANDARD_DAY_HOURS = 8;
export const OVERTIME_MULTIPLIER = 1.5;

export const employees: Employee[] = [
  { id: "EMP-1042", name: "Dana Whitfield", role: "Shift Lead", department: "Operations", hourlyRate: 28, status: "active", enrolled: ["face", "finger", "card"], avatarColor: "#1f5fd9" },
  { id: "EMP-0871", name: "Marcus Lendt", role: "Forklift Operator", department: "Logistics", hourlyRate: 22, status: "active", enrolled: ["finger", "card"], avatarColor: "#2f3c52" },
  { id: "EMP-2210", name: "Priya Anand", role: "Accountant", department: "Finance", hourlyRate: 34, status: "active", enrolled: ["face", "finger"], avatarColor: "#e0913a" },
  { id: "EMP-1567", name: "Tomas Reyes", role: "Picker", department: "Operations", hourlyRate: 20, status: "active", enrolled: ["face"], avatarColor: "#3b7d6e" },
  { id: "EMP-0334", name: "Aisha Bello", role: "Security Officer", department: "Security", hourlyRate: 26, status: "active", enrolled: ["face", "finger", "card"], avatarColor: "#7b5ea7" },
  { id: "EMP-1281", name: "Kofi Mensah", role: "Driver", department: "Logistics", hourlyRate: 24, status: "on_leave", enrolled: ["finger"], avatarColor: "#c0573f" },
  { id: "EMP-1903", name: "Leo Nakamura", role: "Supervisor", department: "Operations", hourlyRate: 30, status: "active", enrolled: ["face", "card"], avatarColor: "#3f6fb0" },
  { id: "EMP-0708", name: "Sara Ortiz", role: "QA Inspector", department: "Quality", hourlyRate: 27, status: "active", enrolled: ["face", "finger"], avatarColor: "#b07b3f" },
];

export const attendanceToday: AttendanceRecord[] = [
  { employeeId: "EMP-1042", date: "2026-06-19", checkIn: "07:58", checkOut: "16:32", method: "face", device: "GATE-A1", state: "checked_out" },
  { employeeId: "EMP-0871", date: "2026-06-19", checkIn: "08:02", checkOut: null, method: "finger", device: "DOOR-B3", state: "checked_in" },
  { employeeId: "EMP-2210", date: "2026-06-19", checkIn: "08:46", checkOut: null, method: "face", device: "GATE-A1", state: "late" },
  { employeeId: "EMP-1567", date: "2026-06-19", checkIn: "07:51", checkOut: null, method: "face", device: "GATE-A2", state: "checked_in" },
  { employeeId: "EMP-0334", date: "2026-06-19", checkIn: "06:30", checkOut: "15:10", method: "finger", device: "VAULT-1", state: "checked_out" },
  { employeeId: "EMP-1903", date: "2026-06-19", checkIn: "07:45", checkOut: null, method: "card", device: "DOOR-B3", state: "checked_in" },
  { employeeId: "EMP-0708", date: "2026-06-19", checkIn: null, checkOut: null, method: "face", device: "-", state: "absent" },
  { employeeId: "EMP-1281", date: "2026-06-19", checkIn: null, checkOut: null, method: "finger", device: "-", state: "absent" },
];

export const accessLogs: AccessLog[] = [
  { id: "L-90211", time: "14:32:08", employeeId: "EMP-1042", name: "Dana Whitfield", method: "face", device: "GATE-A1", result: "granted", confidence: 99.2 },
  { id: "L-90210", time: "14:31:55", employeeId: "EMP-0871", name: "Marcus Lendt", method: "finger", device: "DOOR-B3", result: "granted", confidence: 98.7 },
  { id: "L-90209", time: "14:31:40", employeeId: null, name: "Unknown", method: "face", device: "GATE-A1", result: "denied", confidence: 41.0 },
  { id: "L-90208", time: "14:30:12", employeeId: "EMP-0334", name: "Aisha Bello", method: "finger", device: "VAULT-1", result: "granted", confidence: 99.8 },
  { id: "L-90207", time: "14:29:58", employeeId: "EMP-1567", name: "Tomas Reyes", method: "face", device: "GATE-A2", result: "review", confidence: 74.1 },
  { id: "L-90206", time: "14:28:31", employeeId: "EMP-0708", name: "Sara Ortiz", method: "face", device: "GATE-A2", result: "granted", confidence: 97.4 },
  { id: "L-90205", time: "14:27:09", employeeId: null, name: "Unknown", method: "finger", device: "DOOR-C1", result: "denied", confidence: 33.5 },
  { id: "L-90204", time: "14:26:44", employeeId: "EMP-1903", name: "Leo Nakamura", method: "card", device: "DOOR-B3", result: "granted", confidence: 100 },
  { id: "L-90203", time: "14:25:50", employeeId: "EMP-2210", name: "Priya Anand", method: "face", device: "GATE-A1", result: "granted", confidence: 99.5 },
  { id: "L-90202", time: "14:24:17", employeeId: "EMP-1042", name: "Dana Whitfield", method: "finger", device: "DOOR-B3", result: "granted", confidence: 98.1 },
];

// Scan volume trend (today, hourly) for the area chart
export const scanTrend = [
  { h: "06", scans: 22 }, { h: "07", scans: 140 }, { h: "08", scans: 410 },
  { h: "09", scans: 268 }, { h: "10", scans: 190 }, { h: "11", scans: 205 },
  { h: "12", scans: 342 }, { h: "13", scans: 318 }, { h: "14", scans: 226 },
  { h: "15", scans: 180 }, { h: "16", scans: 388 }, { h: "17", scans: 260 },
];

// Auth method split for the gauge / breakdown
export const methodSplit = [
  { method: "Fingerprint", pct: 52, count: 5061 },
  { method: "Face ID", pct: 33, count: 3212 },
  { method: "Card", pct: 15, count: 1461 },
];

export const departmentActivity = [
  { name: "Operations", pct: 38.4, count: 3741 },
  { name: "Logistics", pct: 27.1, count: 2638 },
  { name: "Security", pct: 18.7, count: 1820 },
  { name: "Quality", pct: 9.8, count: 954 },
  { name: "Finance", pct: 6.0, count: 581 },
];

// --- Pay computation helpers ---

export function hoursBetween(checkIn: string | null, checkOut: string | null): number {
  if (!checkIn || !checkOut) return 0;
  const [ih, im] = checkIn.split(":").map(Number);
  const [oh, om] = checkOut.split(":").map(Number);
  const mins = oh * 60 + om - (ih * 60 + im);
  return Math.max(0, mins / 60);
}

export function splitHours(worked: number): { regular: number; overtime: number } {
  const regular = Math.min(worked, STANDARD_DAY_HOURS);
  const overtime = Math.max(0, worked - STANDARD_DAY_HOURS);
  return { regular, overtime };
}

export function computeDailyPay(rate: number, worked: number): number {
  const { regular, overtime } = splitHours(worked);
  return regular * rate + overtime * rate * OVERTIME_MULTIPLIER;
}

export function employeeById(id: string | null): Employee | undefined {
  if (!id) return undefined;
  return employees.find((e) => e.id === id);
}

// Payouts for the current period, derived from accumulated biometric hours.
const payoutSeed: Omit<Payout, "gross">[] = [
  { ref: "PO-93021", employeeId: "EMP-1042", period: "Jun 1–15", regularHours: 80, overtimeHours: 6.5, status: "approved" },
  { ref: "PO-93022", employeeId: "EMP-0871", period: "Jun 1–15", regularHours: 80, overtimeHours: 0, status: "approved" },
  { ref: "PO-93023", employeeId: "EMP-2210", period: "Jun 1–15", regularHours: 78, overtimeHours: 0, status: "pending" },
  { ref: "PO-93024", employeeId: "EMP-1567", period: "Jun 1–15", regularHours: 64.5, overtimeHours: 0, status: "pending" },
  { ref: "PO-93025", employeeId: "EMP-0334", period: "Jun 1–15", regularHours: 80, overtimeHours: 12, status: "approved" },
  { ref: "PO-93026", employeeId: "EMP-1903", period: "Jun 1–15", regularHours: 40, overtimeHours: 0, status: "flagged" },
  { ref: "PO-93027", employeeId: "EMP-0708", period: "Jun 1–15", regularHours: 79.5, overtimeHours: 1, status: "pending" },
];

export const payouts: Payout[] = payoutSeed.map((p) => {
  const emp = employeeById(p.employeeId)!;
  const gross =
    p.regularHours * emp.hourlyRate +
    p.overtimeHours * emp.hourlyRate * OVERTIME_MULTIPLIER;
  return { ...p, gross: Math.round(gross) };
});

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
