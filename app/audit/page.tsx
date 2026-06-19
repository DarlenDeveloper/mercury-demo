import { Badge, Card, CardHead } from "@/components/ui";
import ExportButton from "@/components/ExportButton";
import { ShieldCheck } from "lucide-react";
import { auditLog } from "@/lib/data";
import { AuditCategory } from "@/lib/types";

const catTone: Record<AuditCategory, "blue" | "green" | "amber" | "red" | "slate" | "orange"> = {
  auth: "amber",
  payout: "green",
  enrollment: "blue",
  device: "slate",
  export: "orange",
  settings: "red",
};
const catLabel: Record<AuditCategory, string> = {
  auth: "Auth",
  payout: "Payout",
  enrollment: "Enrollment",
  device: "Device",
  export: "Export",
  settings: "Settings",
};

export default function AuditPage() {
  const exportRows = auditLog.map((e) => ({
    id: e.id,
    timestamp: e.timestamp,
    actor: e.actor,
    role: e.actorRole,
    category: e.category,
    action: e.action,
    target: e.target,
    ip: e.ip,
  }));

  return (
    <div className="space-y-5 pt-1">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-muted">Home › System › Audit Log</div>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Audit Log</h1>
          <p className="mt-1 text-sm text-muted">
            Immutable record of every administrative and automated action
          </p>
        </div>
        <ExportButton rows={exportRows} filename="audit-log.csv" label="Export audit log" />
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {[
          { label: "Events (24h)", value: "1,204" },
          { label: "Admin actions", value: "38" },
          { label: "Automated actions", value: "1,166" },
          { label: "Retention", value: "365 days" },
        ].map((s) => (
          <Card key={s.label} className="px-5 py-4">
            <div className="text-xs text-muted">{s.label}</div>
            <div className="mt-2 text-2xl font-bold text-ink">{s.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHead title="Activity Trail" icon={<ShieldCheck size={15} />} />
        <div className="overflow-x-auto px-2 pb-2 pt-3">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">Time</th>
                <th className="px-3 py-2 font-medium">Actor</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Action</th>
                <th className="px-3 py-2 font-medium">Target</th>
                <th className="px-3 py-2 font-medium">IP</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {auditLog.map((e) => (
                <tr key={e.id} className="border-t border-line hover:bg-canvas/60">
                  <td className="px-3 py-3 font-mono text-xs text-muted">{e.timestamp}</td>
                  <td className="px-3 py-3">
                    <div className="font-medium text-ink">{e.actor}</div>
                    <div className="text-xs text-muted">{e.actorRole}</div>
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={catTone[e.category]}>{catLabel[e.category]}</Badge>
                  </td>
                  <td className="px-3 py-3 text-ink">{e.action}</td>
                  <td className="px-3 py-3 text-muted">{e.target}</td>
                  <td className="px-3 py-3 font-mono text-xs text-muted">{e.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
