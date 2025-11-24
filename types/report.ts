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

export type RiskLevel = 'Faible' | 'Modéré' | 'Elevé';

export interface RiskResult {
  globalScore: number;
  globalLevel: RiskLevel;
  normalizedScores: {
    climate: number;
    disease: number;
    floral: number;
    resilience: number;
  };
  conclusion: string;
}

export type ReportCreate = z.infer<typeof ReportCreateSchema>
export type ReportDetail = z.infer<typeof ReportDetailSchema>

export type Report = {
  id: number;
  beehive: string;
  conclusion: string;
  climate: number;
  disease: number;
  floral: number;
  resilience: number;
  score: number;
  level: RiskLevel;
  created_at?: string | null;
}

export type ReportRow = {
  id: number;
  beehive: string;
  conclusion: string;
  climatic_impact: number;
  disease_impact: number;
  floral_availability: number;
  colony_resilience: number;
  score: number;
  user_id?: string;
  created_at?: string | null;
};

export const ReportFormSchema = z.object({
  beehive: z.string().min(1),
  climate: z.number().min(1).max(3),
  disease: z.number().min(1).max(3),
  floral: z.number().min(1).max(3),
  resilience: z.number().min(1).max(3),
});

export const ReportUpdateSchema = ReportFormSchema.extend({
  id: z.number(),
});

export type ReportFormInput = z.infer<typeof ReportFormSchema>;
export type ReportUpdateInput = z.infer<typeof ReportUpdateSchema>;
