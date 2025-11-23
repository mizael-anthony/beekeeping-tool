import { RiskFactors, RiskResult } from "@/types/report";

export const calculateRisk = (factors: RiskFactors): RiskResult => {
  const normalizedScores = {
    climate: factors.climate,
    disease: factors.disease,
    floral: factors.floral,
    resilience: factors.resilience
  };

  const globalScore = (
    normalizedScores.climate +
    normalizedScores.disease +
    normalizedScores.floral +
    normalizedScores.resilience
  );

  let globalLevel: 'Faible' | 'Modéré' | 'Elevé';
  let conclusion: string;
  if (globalScore > 9) {
    globalLevel = 'Elevé';
    conclusion = 'Agir rapidement: lutte anti-varroa, reboisement, renforcement de l\'alimentation';
  } else if (globalScore > 6) {
    globalLevel = 'Modéré';
    conclusion = 'Renforcer la surveillance des colonies et les traitements';
  } else {
    globalLevel = 'Faible';
    conclusion = 'Maintenir les bonnes pratiques apicoles';
  }

  return {
    globalScore,
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
  if (score > 9) return 'Elevé';
  if (score > 6) return 'Modéré';
  return 'Faible';
};
