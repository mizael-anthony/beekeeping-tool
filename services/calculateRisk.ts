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
  if (globalScore < 33) {
    globalLevel = 'Faible';
  } else if (globalScore < 66) {
    globalLevel = 'Modéré';
  } else {
    globalLevel = 'Elevé';
  }

  return {
    globalScore: Math.round(globalScore * 100) / 100,
    globalLevel,
    normalizedScores
  };
};

export const getSuggestedActions = (factors: RiskFactors, globalLevel: 'Faible' | 'Modéré' | 'Elevé'): string[] => {
  const suggestions: string[] = [];

  if (factors.disease === 3) {
    suggestions.push('Elevé disease pressure detected: Schedule immediate colony inspections and consider treatment protocols. Monitor for signs of varroa mites, nosema, or foulbrood.');
  } else if (factors.disease === 2) {
    suggestions.push('Modéré disease pressure: Increase inspection frequency and maintain strong biosecurity practices.');
  }

  if (factors.climate === 3) {
    suggestions.push('Severe climate impact: Ensure colonies have adequate ventilation and consider supplemental feeding if foraging is limited. Monitor water sources.');
  } else if (factors.climate === 2) {
    suggestions.push('Climate challenges present: Keep close watch on weather patterns and be prepared to provide support if conditions worsen.');
  }

  if (factors.floral === 3) {
    suggestions.push('Critical floral scarcity: Implement emergency feeding protocols immediately. Consider protein supplements and monitor colony weight regularly.');
  } else if (factors.floral === 2) {
    suggestions.push('Limited floral resources: Monitor foraging activity closely and prepare supplemental feeding if needed.');
  }

  if (factors.resilience === 3) {
    suggestions.push('Faible colony resilience: Prioritize strengthening weak colonies through requeening, combining, or resource redistribution. Delay honey harvesting.');
  } else if (factors.resilience === 2) {
    suggestions.push('Modéré colony strength: Support weaker colonies and monitor population dynamics closely.');
  }

  if (globalLevel === 'Elevé') {
    suggestions.push('Overall high risk: Consider delaying or reducing honey harvest to prioritize colony survival and winter preparation.');
  } else if (globalLevel === 'Modéré') {
    suggestions.push('Modéré overall risk: Plan for conservative honey harvest and ensure colonies have adequate stores for winter.');
  } else {
    suggestions.push('Faible overall risk: Conditions are favorable for honey production. Continue regular monitoring and good management practices.');
  }

  return suggestions;
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
