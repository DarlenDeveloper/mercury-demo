export type BiometricMethod = "face" | "finger" | "card";

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  hourlyRate: number;
  status: "active" | "on_leave" | "inactive";
  enrolled: BiometricMethod[];
  avatarColor: string;
};

export type AttendanceState = "checked_in" | "checked_out" | "absent" | "late";

export type AttendanceRecord = {
  employeeId: string;
  date: string; // YYYY-MM-DD
  checkIn: string | null; // HH:mm
  checkOut: string | null; // HH:mm
  method: BiometricMethod;
  device: string;
  state: AttendanceState;
};

export type AccessLog = {
  id: string;
  time: string; // HH:mm:ss
  employeeId: string | null;
  name: string;
  method: BiometricMethod;
  device: string;
  result: "granted" | "denied" | "review";
  confidence: number;
};

export type PayoutStatus = "approved" | "pending" | "flagged";

export type Payout = {
  ref: string;
  employeeId: string;
  period: string;
  regularHours: number;
  overtimeHours: number;
  gross: number;
  status: PayoutStatus;
};
