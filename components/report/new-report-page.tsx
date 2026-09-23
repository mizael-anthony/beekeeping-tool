"use client";

import { useRouter } from "next/navigation";
import ReportCreateForm from "@/components/report/report-create-form";
import { ReportFormInput } from "@/types/report";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { createReport } from "@/app/actions/reports/createReport";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewReportPage() {
  const router = useRouter();
  const { executeAsync } = useAction(createReport, {
    onSuccess: () => {
      toast.success("Rapport créé");
      router.push("/dashboard");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Erreur lors de la création du rapport");
    },
  });

  const handleCreate = async (payload: ReportFormInput) => {
    await executeAsync(payload);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="pointer-events-none absolute inset-0 opacity-5 bg-honeycomb" />
      <main className="container relative mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-amber-900">Nouveau rapport</h1>
          <p className="text-amber-700">
            Évaluez les facteurs de risque et générez un score.
          </p>
          <div className="mt-4">
            <Button asChild variant="secondary">
              <Link href="/dashboard">← Retour au tableau de bord</Link>
            </Button>
          </div>
        </div>
        <ReportCreateForm onCreate={handleCreate} />
      </main>
    </div>
  );
}
