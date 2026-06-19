import { Avatar, Badge, Card, CardHead } from "@/components/ui";
import { Clock } from "lucide-react";
import {
  attendanceToday,
  computeDailyPay,
  currency,
  employeeById,
  hoursBetween,
  splitHours,
} from "@/lib/data";

const stateTone: Record<string, "green" | "blue" | "amber" | "slate"> = {
  checked_out: "green",
  checked_in: "blue",
  late: "amber",
  absent: "slate",
};
const stateLabel: Record<string, string> = {
  checked_out: "Checked out",
  checked_in: "On site",
  late: "Late",
  absent: "Absent",
};

export default function AttendancePage() {
  const onSite = attendanceToday.filter((a) => a.state === "checked_in" || a.state === "late").length;
  const completed = attendanceToday.filter((a) => a.state === "checked_out").length;
  const absent = attendanceToday.filter((a) => a.state === "absent").length;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Attendance</h1>
          <p className="mt-1 text-sm text-muted">
            Today · Fri Jun 19, 2026 — biometric check-in / check-out feed
          </p>
        </div>
        <Badge tone="green">
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
          Live
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {[
          { label: "On site now", value: onSite, tone: "blue" as const },
          { label: "Completed shifts", value: completed, tone: "green" as const },
          { label: "Absent", value: absent, tone: "slate" as const },
          { label: "Headcount", value: attendanceToday.length, tone: "orange" as const },
        ].map((s) => (
          <Card key={s.label} className="px-5 py-4">
            <div className="text-xs text-muted">{s.label}</div>
            <div className="mt-2 text-2xl font-bold text-ink">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead
          title="Time & Pay — Today"
          icon={<Clock size={15} />}
          subtitle="Worked hours and accrued pay are computed from verified scan times"
        />
        <div className="overflow-x-auto px-2 pb-2 pt-3">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">Employee</th>
                <th className="px-3 py-2 font-medium">Check-in</th>
                <th className="px-3 py-2 font-medium">Check-out</th>
                <th className="px-3 py-2 font-medium">Worked</th>
                <th className="px-3 py-2 font-medium">Reg / OT</th>
                <th className="px-3 py-2 font-medium">Accrued pay</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {attendanceToday.map((a) => {
                const emp = employeeById(a.employeeId)!;
                const worked = hoursBetween(a.checkIn, a.checkOut);
                const { regular, overtime } = splitHours(worked);
                const pay = computeDailyPay(emp.hourlyRate, worked);
                return (
                  <tr key={a.employeeId} className="border-t border-line hover:bg-canvas/60">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} color={emp.avatarColor} />
                        <div>
                          <div className="font-medium text-ink">{emp.name}</div>
                          <div className="font-mono text-xs text-muted">
                            {a.device !== "-" ? a.device : "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 font-mono text-ink">{a.checkIn ?? "—"}</td>
                    <td className="px-3 py-3 font-mono text-ink">{a.checkOut ?? "—"}</td>
                    <td className="px-3 py-3 text-ink">
                      {worked ? `${worked.toFixed(1)}h` : a.state === "absent" ? "—" : "in progress"}
                    </td>
                    <td className="px-3 py-3 text-muted">
                      {worked ? `${regular.toFixed(1)} / ${overtime.toFixed(1)}` : "—"}
                    </td>
                    <td className="px-3 py-3 font-semibold text-ink">
                      {worked ? currency(pay) : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={stateTone[a.state]}>{stateLabel[a.state]}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
