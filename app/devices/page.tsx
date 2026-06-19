import { Card } from "@/components/ui";
import { RefreshCw } from "lucide-react";

const devices = [
  { name: "GATE-A1", loc: "Main Entrance", model: "Hikvision DS-K1T671", status: "ok", scans: "2,140", uptime: 99, fw: "v4.2.1" },
  { name: "GATE-A2", loc: "North Entrance", model: "Hikvision DS-K1T671", status: "ok", scans: "1,802", uptime: 98, fw: "v4.2.1" },
  { name: "DOOR-B3", loc: "Warehouse Floor", model: "Hikvision DS-K1T343", status: "ok", scans: "3,011", uptime: 97, fw: "v4.1.9" },
  { name: "VAULT-1", loc: "Secure Vault", model: "Hikvision DS-K1T673", status: "ok", scans: "412", uptime: 100, fw: "v4.2.1" },
  { name: "DOOR-C1", loc: "Loading Bay", model: "Hikvision DS-K1T343", status: "warn", scans: "988", uptime: 71, fw: "v4.0.3" },
  { name: "GATE-D5", loc: "Staff Parking", model: "Hikvision DS-K1T671", status: "off", scans: "0", uptime: 0, fw: "v4.0.3" },
];

const dot: Record<string, string> = {
  ok: "#22c55e",
  warn: "#f59e0b",
  off: "#ef4444",
};
const label: Record<string, string> = {
  ok: "Online",
  warn: "Degraded",
  off: "Offline",
};

export default function DevicesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Devices</h1>
          <p className="mt-1 text-sm text-muted">
            Biometric terminals and gateway health
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink">
          <RefreshCw size={15} /> Sync all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((d) => (
          <Card key={d.name} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-ink">{d.name}</div>
                <div className="text-xs text-muted">{d.loc}</div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: dot[d.status], boxShadow: `0 0 8px ${dot[d.status]}` }}
                />
                {label[d.status]}
              </span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-muted">{d.model}</div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted">Scans (24h)</span>
              <span className="font-semibold text-ink">{d.scans}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className="text-muted">Firmware</span>
              <span className="font-mono text-muted">{d.fw}</span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas">
              <div className="h-full rounded-full bg-accent" style={{ width: `${d.uptime}%` }} />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-muted">
              <span>Uptime</span>
              <span>{d.uptime}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
