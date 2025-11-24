"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/header";
import ReportList from "@/components/report/report-list";
import { Report } from "@/types/report";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter, TrendingUp, FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/dashboard/stat-card";

type Stats = {
  total: number;
  average: number;
  low: number;
  moderate: number;
  high: number;
};

export default function DashboardPageClient() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [filterBeehive, setFilterBeehive] = useState("");
  const [filterRisk, setFilterRisk] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/reports");
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Erreur lors du chargement des rapports");
      }
      setReports(body.data ?? []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Impossible de charger les rapports";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo<Stats>(() => {
    const total = reports.length;
    const average =
      total > 0
        ? Math.round((reports.reduce((sum, r) => sum + r.score, 0) / total) * 100) /
          100
        : 0;
    const low = reports.filter((r) => r.level === "Faible").length;
    const moderate = reports.filter((r) => r.level === "Modéré").length;
    const high = reports.filter((r) => r.level === "Elevé").length;
    return { total, average, low, moderate, high };
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchHive = filterBeehive ? r.beehive === filterBeehive : true;
      const matchRisk = filterRisk ? r.level === filterRisk : true;
      return matchHive && matchRisk;
    });
  }, [reports, filterBeehive, filterRisk]);

  const beehives = Array.from(new Set(reports.map((r) => r.beehive)));

  const startEdit = (report: Report) => router.push(`/dashboard/${report.id}/edit`);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-honeycomb" />
      <Header />

      <main className="container relative mx-auto px-6 py-10 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">
              Tableau de bord des rapports
            </h1>
            <p className="text-amber-700">
              {stats.total} rapport(s) • Risque moyen : {stats.average}%
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/new">Nouveau rapport</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<FileText className="h-6 w-6 text-amber-600" />}
            label="Total rapports"
            value={stats.total}
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-amber-600" />}
            label="Risque moyen"
            value={`${stats.average}%`}
          />
          <StatCard
            icon={<AlertTriangle className="h-6 w-6 text-amber-600" />}
            label="Niveaux"
            value={`${stats.low} faible(s) • ${stats.moderate} modéré(s) • ${stats.high} élevé(s)`}
            description
          />
        </div>

        <Card className="p-5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <Filter className="h-5 w-5" />
              <span>Filtres</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={filterBeehive}
                onChange={(e) => setFilterBeehive(e.target.value)}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 sm:w-48"
              >
                <option value="">Toutes les ruches</option>
                {beehives.map((hive) => (
                  <option key={hive} value={hive}>
                    {hive}
                  </option>
                ))}
              </select>

              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 sm:w-48"
              >
                <option value="">Tous les niveaux</option>
                <option value="Faible">Faible</option>
                <option value="Modéré">Modéré</option>
                <option value="Elevé">Élevé</option>
              </select>

              <Button
                onClick={() => {
                  setFilterBeehive("");
                  setFilterRisk("");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {loading && (
              <div className="rounded-lg border border-amber-100 bg-amber-50/60 px-6 py-8 text-center text-amber-800">
                Chargement des rapports...
              </div>
            )}
            {error && !loading && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
                {error}
              </div>
            )}
            {!loading && !error && filteredReports.length === 0 && (
              <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/80 px-6 py-10 text-center text-amber-800">
                Aucun rapport ne correspond aux filtres.
              </div>
            )}
            {!loading && !error && filteredReports.length > 0 && (
              <ReportList reports={filteredReports} onEdit={startEdit} />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
