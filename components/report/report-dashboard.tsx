'use client';

import { FileText, Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ReportStats = {
  totalReports: number;
  averageRisk: number;
};

type ReportDashboardProps = {
  stats: ReportStats;
  onCreateReport: () => void;
};

export default function ReportDashboard({
  stats,
  onCreateReport,
}: ReportDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">
          Tableau de bord
        </h1>
        <p className="text-amber-700">
          Suivez et gérez les risques de votre rucher
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <div className="flex items-start justify-between px-6">
            <div>
              <p className="text-sm text-amber-700 mb-1">Nombre total de rapports</p>
              <p className="text-3xl font-bold text-amber-900">
                {stats.totalReports}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between px-6">
            <div>
              <p className="text-sm text-amber-700 mb-1">Risque moyen</p>
              <p className="text-3xl font-bold text-amber-900">
                {stats.averageRisk.toFixed(0)}
              </p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center px-6">
          <Button onClick={onCreateReport} className="w-full">
            <Plus className="w-5 h-5 mr-2" />
            Nouveau rapport
          </Button>
        </Card>
      </div>
    </div>
  );
}
