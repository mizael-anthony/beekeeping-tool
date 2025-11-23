import { RiskFactors, RiskResult } from "@/types/report";

export const calculateRisk = (factors: RiskFactors): RiskResult => {
  const normalizedScores = {
    climate: (factors.climate / 3) * 100,
    disease: (factors.disease / 3) * 100,
    floral: (factors.floral / 3) * 100,
    resilience: (factors.resilience / 3) * 100
  };

  const globalScore = (
    normalizedScores.climate +
    normalizedScores.disease +
    normalizedScores.floral +
    normalizedScores.resilience
  ) / 4;

  let globalLevel: 'Faible' | 'Modéré' | 'Elevé';
  let conclusion: string;
  if (globalScore < 33) {
    globalLevel = 'Faible';
    conclusion = 'Maintenir les bonnes pratiques apicoles.';
  } else if (globalScore < 66) {
    globalLevel = 'Modéré';
    conclusion = 'Renforcer la surveillance des colonies et les traitements.';
  } else {
    globalLevel = 'Elevé';
    conclusion = 'Agir rapidement: lutte anti-varroa, reboisement, transhumanitaire, renforcement de l\'alimentation.';
  }

  return {
    globalScore: Math.round(globalScore * 100) / 100,
    globalLevel,
    normalizedScores,
    conclusion,
  };
};

export const getRatingLabel = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Faible';
    case 2:
      return 'Modéré';
    case 3:
      return 'Elevé';
    default:
      return '';
  }
};

export const levelFromScore = (score: number) => {
  if (score < 33) return 'Faible';
  if (score < 66) return 'Modéré';
  return 'Elevé';
};
