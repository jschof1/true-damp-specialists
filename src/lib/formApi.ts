export const formEndpoints = {
  contact: "/api/forms/contact",
  quote: "/api/forms/quote",
  feedback: "/api/forms/feedback",
  discount: "/api/forms/discount",
} as const;

export const postFormSubmission = async (
  endpoint: string,
  payload: Record<string, unknown>,
) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`);
  }

  return response;
};
