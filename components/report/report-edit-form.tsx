"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateRisk } from "@/services/calculateRisk";
import { Report } from "@/types/report";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import {
  RatingScaleKey,
  inactiveRatingClass,
  ratingScales,
} from "@/components/report/rating-config";
import { cn } from "@/lib/utils";

type ReportEditFormProps = {
  report: Report;
  onSave: (report: Report) => Promise<void> | void;
  onCancel: () => void;
  onDelete?: () => void;
};

export default function ReportEditForm({
  report,
  onSave,
  onCancel,
  onDelete,
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

  const risk = useMemo(
    () => calculateRisk({ climate, disease, floral, resilience }),
    [climate, disease, floral, resilience]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-amber-900">Modifier le rapport</h3>
            <p className="text-sm text-amber-700">
              Ajustez les facteurs, le score sera recalculé.
            </p>
          </div>
          {onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Supprimer le rapport
            </Button>
          )}
        </div>
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
          factor="climate"
        />
        <RatingControl
          label="Pression maladies"
          description="Parasites, pathogènes ou signes de maladies"
          value={disease}
          onChange={setDisease}
          factor="disease"
        />
        <RatingControl
          label="Disponibilité florale"
          description="Abondance et diversité des ressources"
          value={floral}
          onChange={setFloral}
          factor="floral"
        />
        <RatingControl
          label="Résilience de la colonie"
          description="Force, population, qualité de la reine"
          value={resilience}
          onChange={setResilience}
          factor="resilience"
        />
      </div>

      {risk && (
        <Card className="border-amber-200 bg-amber-50/60 p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-amber-700">Score global</p>
            <div className="text-4xl font-bold text-amber-900">
              {risk.globalScore}
              <span className="text-lg text-amber-700">/12</span>
            </div>
            <p className="font-semibold text-amber-900">Niveau : {risk.globalLevel}</p>
            <div className="flex items-start gap-2 text-sm text-amber-800 leading-relaxed">
              <Lightbulb className="mt-0.5 h-4 w-4 text-amber-600" />
              <p>Conseil : {risk.conclusion}</p>
            </div>
          </div>
        </Card>
      )}

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

type RatingControlProps = {
  label: string;
  description: string;
  value: number;
  onChange: (val: number) => void;
  factor: RatingScaleKey;
};

function RatingControl({ label, description, value, onChange, factor }: RatingControlProps) {
  const options = ratingScales[factor];

  return (
    <Card className="p-4">
      <div className="mb-2">
        <h4 className="font-semibold text-amber-900">{label}</h4>
        <p className="text-sm text-amber-700">{description}</p>
      </div>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all",
              value === option.value ? option.className : inactiveRatingClass
            )}
          >
            <div className="text-lg">{option.value}</div>
            <div className="text-xs">{option.label}</div>
          </button>
        ))}
      </div>
    </Card>
  );
}
