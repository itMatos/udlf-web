export type InputType = "AUTO" | "MATRIX" | "RANKEDLISTS";

export type OutputFormatType =
  | "RANKEDLIST_NUMERIC"
  | "RANKEDLIST_STRING"
  | "SIMILARITY_MATRIX"
  | "DISTANCE_MATRIX";

export const OUTPUT_TYPES = [
  { value: "RANKEDLIST_NUMERIC", label: "Ranked List (numeric)" },
  { value: "RANKEDLIST_STRING", label: "Ranked List (string)" },
  { value: "SIMILARITY_MATRIX", label: "Similarity Matrix" },
  { value: "DISTANCE_MATRIX", label: "Distance Matrix" },
] as const;
