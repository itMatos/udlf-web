export const STEPS = ["Select method", "Input settings", "Output settings", "Evaluation settings", "Summary"] as const;

export const METHODS = ["CONTEXTRR", "CPRR"] as const;

export const INPUT_TYPES = [
  {
    value: "AUTO",
    label: "Auto",
    description: "Use auto input format detection",
  },
  { value: "MATRIX", label: "Matrix", description: "Use matrix input format" },
  {
    value: "RK",
    label: "Ranked lists",
    description: "Use ranked lists input format",
  },
] as const;
