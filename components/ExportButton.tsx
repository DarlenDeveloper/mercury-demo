"use client";

import { Download } from "lucide-react";

type Row = Record<string, string | number | null | undefined>;

function toCsv(rows: Row[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}

export default function ExportButton({
  rows,
  filename,
  label = "Export CSV",
}: {
  rows: Row[];
  filename: string;
  label?: string;
}) {
  const onClick = () => {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink hover:bg-canvas"
    >
      <Download size={15} /> {label}
    </button>
  );
}
