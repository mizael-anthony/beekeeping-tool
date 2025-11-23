"use server";

import actionClient, { SafeError } from "@/lib/actions/safe-action-client";
import { ReportFormSchema, type ReportFormInput, type Report } from "@/types/report";
import { createClient } from "@/lib/supabase/server";
import { calculateRisk, levelFromScore } from "@/services/calculateRisk";

const mapRowToReport = (row: any): Report => ({
  id: row.id,
  beehive: row.beehive,
  conclusion: row.conclusion,
  climate: row.climatic_impact,
  disease: row.disease_impact,
  floral: row.floral_availability,
  resilience: row.colony_resilience,
  score: row.score,
  level: levelFromScore(row.score),
  created_at: row.created_at ?? undefined,
});

export const createReport = actionClient
  .inputSchema(ReportFormSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new SafeError("Utilisateur non authentifié");
    }

    const risk = calculateRisk(parsedInput);

    const { data, error } = await supabase
      .from("reports")
      .insert({
        beehive: parsedInput.beehive,
        climatic_impact: parsedInput.climate,
        disease_impact: parsedInput.disease,
        floral_availability: parsedInput.floral,
        colony_resilience: parsedInput.resilience,
        score: risk.globalScore,
        conclusion: risk.conclusion,
        user_id: user.id,
      })
      .select("*")
      .single();

    if (error) {
      throw new SafeError(error.message);
    }

    return mapRowToReport(data);
  });
