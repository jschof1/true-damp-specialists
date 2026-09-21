type FormValue = string | number | boolean | null;

/** Keep webhook fields intact and provide the same values in a readable enquiry. */
export const withFormSummary = (fields: Record<string, FormValue>) => ({
  ...fields,
  summary: { ...fields },
  summaryText: Object.entries(fields)
    .map(([key, value]) => `${key}: ${value ?? ""}`)
    .join("\n"),
});
