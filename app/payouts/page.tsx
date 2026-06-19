import { Avatar, Badge, Card, CardHead } from "@/components/ui";
import {
  OVERTIME_MULTIPLIER,
  currency,
  employeeById,
  payouts,
} from "@/lib/data";

const statusTone: Record<string, "green" | "amber" | "red"> = {
  approved: "green",
  pending: "amber",
  flagged: "red",
};
const statusLabel: Record<string, string> = {
  approved: "Approved",
  pending: "Pending",
  flagged: "Flagged",
};

export default function PayoutsPage() {
  const total = payouts.reduce((s, p) => s + p.gross, 0);
  const approved = payouts.filter((p) => p.status === "approved").length;
  const pending = payouts.filter((p) => p.status === "pending").length;
  const flagged = payouts.filter((p) => p.status === "flagged").length;

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Payouts</h1>
          <p className="mt-1 text-sm text-muted">
            Pay period Jun 1–15 · gross auto-computed from biometric hours (OT ×
            {OVERTIME_MULTIPLIER})
          </p>
        </div>
        <button className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm">
          Run payout batch
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Card className="px-5 py-4">
          <div className="text-xs text-muted">Batch total</div>
          <div className="mt-2 text-2xl font-bold text-ink">{currency(total)}</div>
          <div className="mt-1 text-xs text-muted">{payouts.length} employees</div>
        </Card>
        <Card className="px-5 py-4">
          <div className="text-xs text-muted">Approved</div>
          <div className="mt-2 text-2xl font-bold text-emerald-600">{approved}</div>
          <div className="mt-1 text-xs text-muted">ready to disburse</div>
        </Card>
        <Card className="px-5 py-4">
          <div className="text-xs text-muted">Pending review</div>
          <div className="mt-2 text-2xl font-bold text-amber-600">{pending}</div>
          <div className="mt-1 text-xs text-muted">awaiting approval</div>
        </Card>
        <Card className="px-5 py-4">
          <div className="text-xs text-muted">Flagged</div>
          <div className="mt-2 text-2xl font-bold text-rose-500">{flagged}</div>
          <div className="mt-1 text-xs text-muted">hours mismatch</div>
        </Card>
      </div>

      <Card>
        <CardHead title="Disbursement Queue" icon={<span>＄</span>} />
        <div className="overflow-x-auto px-2 pb-2 pt-3">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">Ref</th>
                <th className="px-3 py-2 font-medium">Employee</th>
                <th className="px-3 py-2 font-medium">Reg hrs</th>
                <th className="px-3 py-2 font-medium">OT hrs</th>
                <th className="px-3 py-2 font-medium">Gross</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payouts.map((p) => {
                const emp = employeeById(p.employeeId)!;
                return (
                  <tr key={p.ref} className="border-t border-line hover:bg-canvas/60">
                    <td className="px-3 py-3 font-mono text-muted">{p.ref}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={emp.name} color={emp.avatarColor} />
                        <div>
                          <div className="font-medium text-ink">{emp.name}</div>
                          <div className="font-mono text-xs text-muted">
                            {currency(emp.hourlyRate)}/hr
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink">{p.regularHours}</td>
                    <td className="px-3 py-3 text-ink">{p.overtimeHours}</td>
                    <td className="px-3 py-3 font-semibold text-ink">{currency(p.gross)}</td>
                    <td className="px-3 py-3">
                      <Badge tone={statusTone[p.status]}>{statusLabel[p.status]}</Badge>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {p.status === "pending" ? (
                        <button className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
                          Approve
                        </button>
                      ) : p.status === "flagged" ? (
                        <button className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink">
                          Review
                        </button>
                      ) : (
                        <span className="text-xs text-muted">—</span>
                      )}
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
