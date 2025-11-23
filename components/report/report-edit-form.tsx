"use client";

import { useEffect, useState } from "react";
import { calculateRisk } from "@/services/calculateRisk";
import { Report } from "@/types/report";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ReportEditFormProps = {
  report: Report;
  onSave: (report: Report) => Promise<void> | void;
  onCancel: () => void;
};

export default function ReportEditForm({
  report,
  onSave,
  onCancel,
}: ReportEditFormProps) {
  const [beehive, setBeehive] = useState(report.beehive);
  const [climate, setClimate] = useState(report.climate);
  const [disease, setDisease] = useState(report.disease);
  const [floral, setFloral] = useState(report.floral);
  const [resilience, setResilience] = useState(report.resilience);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setBeehive(report.beehive);
    setClimate(report.climate);
    setDisease(report.disease);
    setFloral(report.floral);
    setResilience(report.resilience);
  }, [report]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const risk = calculateRisk({ climate, disease, floral, resilience });

    setIsSubmitting(true);
    Promise.resolve(
      onSave({
        ...report,
        beehive,
        conclusion: risk.conclusion,
        climate,
        disease,
        floral,
        resilience,
        score: risk.globalScore,
        level: risk.globalLevel,
      })
    )
      .catch((err) => console.error("Error saving report", err))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100/70"
    >
      <div>
        <h3 className="text-xl font-semibold text-amber-900">Modifier le rapport</h3>
        <p className="text-sm text-amber-700">
          Ajustez les facteurs, le score sera recalculé.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="beehive-edit">Nom de la ruche</Label>
        <Input
          id="beehive-edit"
          value={beehive}
          onChange={(e) => setBeehive(e.target.value)}
          required
        />
      </div>

      <div className="space-y-3">
        <RatingControl
          label="Impact climatique"
          description="Conditions météo affectant butinage et santé"
          value={climate}
          onChange={setClimate}
        />
        <RatingControl
          label="Pression maladies"
          description="Parasites, pathogènes ou signes de maladies"
          value={disease}
          onChange={setDisease}
        />
        <RatingControl
          label="Disponibilité florale"
          description="Abondance et diversité des ressources"
          value={floral}
          onChange={setFloral}
        />
        <RatingControl
          label="Résilience de la colonie"
          description="Force, population, qualité de la reine"
          value={resilience}
          onChange={setResilience}
        />
      </div>

      <div className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
        Conclusion générée : {calculateRisk({ climate, disease, floral, resilience }).conclusion}
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}

type NumberFieldProps = {
  label: string;
  description: string;
  value: number;
  onChange: (val: number) => void;
};

function RatingControl({ label, description, value, onChange }: RatingControlProps) {
  return (
    <Card className="p-4">
      <div className="mb-2">
        <h4 className="font-semibold text-amber-900">{label}</h4>
        <p className="text-sm text-amber-700">{description}</p>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all",
              value === rating
                ? rating === 1
                  ? "bg-green-500 text-white shadow-md"
                  : rating === 2
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-red-500 text-white shadow-md"
                : "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            )}
          >
            <div className="text-lg">{rating}</div>
            <div className="text-xs">{rating === 1 ? "Faible" : rating === 2 ? "Modéré" : "Elevé"}</div>
          </button>
        ))}
      </div>
    </Card>
  );
}
