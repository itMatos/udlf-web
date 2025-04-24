export const formatValue = (
  value: boolean | string | number | string[]
): string => {
  if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  }
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return String(value);
};
