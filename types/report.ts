import { z } from 'zod';


export const ReportCreateSchema = z.object({
    beehive: z.string(),
    score: z.number(),
    conclusion: z.string(),
    climatic_impact: z.number(),
    disease_impact: z.number(),
    floral_availability: z.number(),
    colony_resilience: z.number(),
    user_id: z.uuid()
})

export const ReportDetailSchema = z.object({
    id: z.number(),
    beehive: z.string(),
    score: z.number(),
    conclusion: z.string(),
    climatic_impact: z.number(),
    disease_impact: z.number(),
    floral_availability: z.number(),
    colony_resilience: z.number(),
    user_id: z.uuid(),
    created_at: z.string()
})

export interface RiskFactors {
  climate: number;
  disease: number;
  floral: number;
  resilience: number;
}

export interface RiskResult {
  globalScore: number;
  globalLevel: 'Faible' | 'Modéré' | 'Elevé';
  normalizedScores: {
    climate: number;
    disease: number;
    floral: number;
    resilience: number;
  };
}

export type ReportCreate = z.infer<typeof ReportCreateSchema>
export type ReportDetail = z.infer<typeof ReportDetailSchema>
