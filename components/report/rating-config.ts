export type RatingScaleKey = "climate" | "disease" | "floral" | "resilience";

export type RatingOption = {
  value: number;
  label: "Faible" | "Modéré" | "Elevé" | "Rare" | "Abondante";
  className: string;
};

const activeGreen = "bg-green-500 text-white shadow-md";
const activeOrange = "bg-orange-500 text-white shadow-md";
const activeRed = "bg-red-500 text-white shadow-md";

export const inactiveRatingClass =
  "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100";

export const ratingScales: Record<RatingScaleKey, RatingOption[]> = {
  climate: [
    { value: 1, label: "Faible", className: activeGreen },
    { value: 2, label: "Modéré", className: activeOrange },
    { value: 3, label: "Elevé", className: activeRed },
  ],
  disease: [
    { value: 1, label: "Faible", className: activeGreen },
    { value: 2, label: "Modéré", className: activeOrange },
    { value: 3, label: "Elevé", className: activeRed },
  ],
  floral: [
    { value: 3, label: "Rare", className: activeGreen },
    { value: 2, label: "Modéré", className: activeOrange },
    { value: 1, label: "Abondante", className: activeRed },
  ],
  resilience: [
    { value: 3, label: "Faible", className: activeGreen },
    { value: 2, label: "Modéré", className: activeOrange },
    { value: 1, label: "Elevé", className: activeRed },
  ],
};
