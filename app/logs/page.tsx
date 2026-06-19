import { Avatar, Badge, Card, CardHead } from "@/components/ui";
import ExportButton from "@/components/ExportButton";
import { ScrollText } from "lucide-react";
import { accessLogs, employeeById } from "@/lib/data";

const resultTone: Record<string, "green" | "red" | "amber"> = {
  granted: "green",
  denied: "red",
  review: "amber",
};
const methodLabel: Record<string, string> = {
  face: "Face",
  finger: "Fingerprint",
  card: "Card",
};

export default function LogsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Access Logs</h1>
          <p className="mt-1 text-sm text-muted">
            Every authentication attempt, with match confidence
          </p>
        </div>
        <ExportButton
          rows={accessLogs.map((l) => ({
            id: l.id,
            time: l.time,
            employeeId: l.employeeId,
            name: l.name,
            method: l.method,
            device: l.device,
            result: l.result,
            confidence: l.confidence,
          }))}
          filename="access-logs.csv"
        />
      </div>

      <div className="flex gap-2">
        {["All", "Granted", "Denied", "Review"].map((c, i) => (
          <button
            key={c}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              i === 0
                ? "bg-navy text-white"
                : "border border-line bg-card text-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <Card>
        <CardHead title="Event Stream" icon={<ScrollText size={15} />} />
        <div className="overflow-x-auto px-2 pb-2 pt-3">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">Time</th>
                <th className="px-3 py-2 font-medium">Identity</th>
                <th className="px-3 py-2 font-medium">Method</th>
                <th className="px-3 py-2 font-medium">Device</th>
                <th className="px-3 py-2 font-medium">Confidence</th>
                <th className="px-3 py-2 font-medium">Result</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {accessLogs.map((l) => {
                const emp = employeeById(l.employeeId);
                return (
                  <tr key={l.id} className="border-t border-line hover:bg-canvas/60">
                    <td className="px-3 py-3 font-mono text-muted">{l.time}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={l.name} color={emp?.avatarColor ?? "#aab2c0"} />
                        <div>
                          <div className="font-medium text-ink">{l.name}</div>
                          <div className="font-mono text-xs text-muted">
                            {l.employeeId ?? "unmatched"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink">{methodLabel[l.method]}</td>
                    <td className="px-3 py-3 font-mono text-muted">{l.device}</td>
                    <td className="px-3 py-3">
                      <span
                        className={
                          l.confidence >= 90
                            ? "text-emerald-600"
                            : l.confidence >= 60
                            ? "text-amber-600"
                            : "text-rose-500"
                        }
                      >
                        {l.confidence.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={resultTone[l.result]}>
                        {l.result[0].toUpperCase() + l.result.slice(1)}
                      </Badge>
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
