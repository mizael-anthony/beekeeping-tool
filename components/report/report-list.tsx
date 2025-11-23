"use client";

import { Report } from "@/types/report";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText, AlertTriangle, CalendarDays } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

type ReportListProps = {
  reports: Report[];
  onEdit: (report: Report) => void;
  onDelete?: (id: number) => void;
};

export default function ReportList({
  reports,
  onEdit,
  onDelete,
}: ReportListProps) {
  if (reports.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center gap-3 text-amber-700">
          <AlertTriangle className="h-6 w-6" />
          <p>Aucun rapport pour le moment. Créez-en un pour commencer.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <Card
          key={report.id}
          className="border-amber-100 bg-amber-50/60 p-5 hover:border-amber-200"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/80 p-3 ring-1 ring-amber-100">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-amber-900">
                  {report.beehive}
                </h4>
                <p className="text-sm text-amber-700">Score : {report.score}%</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-amber-800">
                  <Pill label="Climat" value={report.climate} />
                  <Pill label="Maladies" value={report.disease} />
                  <Pill label="Floraison" value={report.floral} />
                  <Pill label="Résilience" value={report.resilience} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <RiskBadge level={report.level} />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => onEdit(report)}
                  aria-label={`Modifier ${report.beehive}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(report.id)}
                    aria-label={`Supprimer ${report.beehive}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Pill({ label, value }: { label: string; value: number }) {
  return (
    <span className="rounded-full bg-white/80 px-3 py-1 font-semibold ring-1 ring-amber-100">
      {label}: {value}/3
    </span>
  );
}

function RiskBadge({ level }: { level: Report["level"] }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-sm font-semibold",
        level === "Faible" && "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
        level === "Modéré" && "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
        level === "Elevé" && "bg-red-100 text-red-700 ring-1 ring-red-200"
      )}
    >
      {level}
    </span>
  );
}
