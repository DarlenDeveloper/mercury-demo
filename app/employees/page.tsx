import { Avatar, Badge, Card, CardHead } from "@/components/ui";
import { UserPlus, Users } from "lucide-react";
import { currency, employees } from "@/lib/data";

const statusTone: Record<string, "green" | "amber" | "slate"> = {
  active: "green",
  on_leave: "amber",
  inactive: "slate",
};
const statusLabel: Record<string, string> = {
  active: "Active",
  on_leave: "On leave",
  inactive: "Inactive",
};
const methodLabel: Record<string, string> = {
  face: "Face",
  finger: "Fingerprint",
  card: "Card",
};

export default function EmployeesPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Employees</h1>
          <p className="mt-1 text-sm text-muted">
            {employees.length} enrolled identities and their biometric templates
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <UserPlus size={16} /> Enroll employee
        </button>
      </div>

      <Card>
        <CardHead title="Directory" icon={<Users size={15} />} />
        <div className="overflow-x-auto px-2 pb-2 pt-3">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-3 py-2 font-medium">Employee</th>
                <th className="px-3 py-2 font-medium">Department</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Enrolled</th>
                <th className="px-3 py-2 font-medium">Rate</th>
                <th className="px-3 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {employees.map((e) => (
                <tr key={e.id} className="border-t border-line hover:bg-canvas/60">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={e.name} color={e.avatarColor} />
                      <div>
                        <div className="font-medium text-ink">{e.name}</div>
                        <div className="font-mono text-xs text-muted">{e.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-ink">{e.department}</td>
                  <td className="px-3 py-3 text-muted">{e.role}</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {e.enrolled.map((m) => (
                        <Badge key={m} tone="orange">
                          {methodLabel[m]}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 font-medium text-ink">
                    {currency(e.hourlyRate)}/hr
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={statusTone[e.status]}>{statusLabel[e.status]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
