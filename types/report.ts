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
    user_id: z.uuid()
})


export type ReportCreate = z.infer<typeof ReportCreateSchema>
export type ReportDetail = z.infer<typeof ReportDetailSchema>
