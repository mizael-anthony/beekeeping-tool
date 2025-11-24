"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReportEditForm from "@/components/report/report-edit-form";
import { Report } from "@/types/report";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { editReport } from "@/app/actions/reports/editReport";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EditReportPageProps = {
  reportId: string;
};

export default function EditReportPage({ reportId }: EditReportPageProps) {
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { executeAsync } = useAction(editReport, {
    onSuccess: () => {
      toast.success("Rapport mis à jour");
      router.push("/dashboard");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Erreur lors de la mise à jour du rapport");
    },
  });

  useEffect(() => {
    if (!reportId) {
      setError("ID de rapport manquant");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/reports?id=${reportId}`);
        const body = await res.json();
        if (!res.ok) {
          throw new Error(body.error || "Impossible de récupérer le rapport");
        }
        setReport(body.data?.[0] ?? null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erreur lors du chargement du rapport";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handleSave = async (updated: Report) => {
    await executeAsync({
      id: updated.id,
      beehive: updated.beehive,
      climate: updated.climate,
      disease: updated.disease,
      floral: updated.floral,
      resilience: updated.resilience,
    });
  };

  const handleDelete = async () => {
    if (!reportId) return;
    try {
      const res = await fetch("/api/reports?id=" + reportId, {
        method: "DELETE",
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Erreur lors de la suppression");
      }
      toast.success("Rapport supprimé");
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur lors de la suppression";
      toast.error(message);
    }
  };

  const conclusionBlock = useMemo(() => {
    if (error && !loading) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      );
    }

    if (loading) {
      return (
        <div className="rounded-lg border border-amber-100 bg-amber-50/60 px-6 py-8 text-center text-amber-800">
          Chargement du rapport...
        </div>
      );
    }

    if (!report) {
      return (
        <div className="rounded-lg border border-dashed border-amber-200 bg-amber-50/80 px-6 py-10 text-center text-amber-800">
          Rapport introuvable.
        </div>
      );
    }

    return (
      <ReportEditForm
        report={report}
        onSave={handleSave}
        onCancel={() => router.push("/dashboard")}
        onDelete={handleDelete}
      />
    );
  }, [error, loading, report, router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-honeycomb" />
      <main className="container relative mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-900">Modifier le rapport</h1>
          <div className="mt-4">
            <div className="mt-3">
              <Button asChild variant="secondary">
                <Link href="/dashboard">← Retour au tableau de bord</Link>
              </Button>
            </div>
          </div>
        </div>
        {conclusionBlock}
      </main>
    </div>
  );
}
