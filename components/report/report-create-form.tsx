"use client";

import { useMemo, useState } from "react";
import { calculateRisk } from "@/services/calculateRisk";
import {
  RatingScaleKey,
  inactiveRatingClass,
  ratingScales,
} from "@/components/report/rating-config";
import { Lightbulb } from "lucide-react";
import { ReportFormInput } from "@/types/report";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ReportCreateFormProps = {
  onCreate: (report: ReportFormInput) => Promise<void> | void;
};

export default function ReportCreateForm({ onCreate }: ReportCreateFormProps) {
  const [beehive, setBeehive] = useState("");
  const [climate, setClimate] = useState(0);
  const [disease, setDisease] = useState(0);
  const [floral, setFloral] = useState(0);
  const [resilience, setResilience] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allRatingsSelected = climate > 0 && disease > 0 && floral > 0 && resilience > 0;

  const risk = useMemo(() => {
    if (!allRatingsSelected) return null;
    return calculateRisk({ climate, disease, floral, resilience });
  }, [allRatingsSelected, climate, disease, floral, resilience]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!beehive.trim()) {
      setError("Veuillez renseigner le nom de la ruche.");
      return;
    }

    if (!risk) {
      setError("Sélectionnez toutes les notes de risque avant de créer le rapport.");
      return;
    }

    setIsSubmitting(true);
    Promise.resolve(
      onCreate({
        beehive,
        climate,
        disease,
        floral,
        resilience,
      })
    )
      .then(() => {
        setBeehive("");
        setClimate(0);
        setDisease(0);
        setFloral(0);
        setResilience(0);
      })
      .catch((err) => {
        console.error("Error creating report", err);
        setError("Erreur lors de la création du rapport.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-amber-100/70"
    >
      <div>
        <h3 className="text-xl font-semibold text-amber-900">Créer un rapport</h3>
        <p className="text-sm text-amber-700">
          Notez chaque facteur (1 à 3) et obtenez un score de risque avec une conclusion.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="beehive">Nom de la ruche</Label>
        <Input
          id="beehive"
          value={beehive}
          onChange={(e) => setBeehive(e.target.value)}
          placeholder="Ex: Ruche A"
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

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!risk || isSubmitting}>
        {isSubmitting ? "Création..." : "Créer le rapport"}
      </Button>
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
