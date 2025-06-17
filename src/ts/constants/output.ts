import { OutputFormatType } from "../types/output";

export const DEFAULT_OUTPUT_SETTINGS: OutputFormatType = "RANKEDLIST_NUMERIC" as const;

export const OUTPUT_TYPES = [
  { value: "RANKEDLIST_NUMERIC", label: "Ranked List (numeric)" },
  { value: "RANKEDLIST_STRING", label: "Ranked List (string)" },
  { value: "SIMILARITY_MATRIX", label: "Similarity Matrix" },
  { value: "DISTANCE_MATRIX", label: "Distance Matrix" },
] as const;
