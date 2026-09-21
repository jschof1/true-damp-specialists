import { trackEvent } from "./analytics";
export const formEndpoints = {
  contact: "/api/forms/contact",
  quote: "/api/forms/quote",
  feedback: "/api/forms/feedback",
  discount: "/api/forms/discount",
} as const;

const requireConfirmedReceipt = async (response: Response) => {
  const contentType = response.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    throw new Error("Submission receipt was not confirmed");
  }

  let result: unknown;
  try {
    result = await response.clone().json();
  } catch {
    throw new Error("Submission receipt was not confirmed");
  }

  if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true) {
    throw new Error("Submission receipt was not confirmed");
  }
};

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

  await requireConfirmedReceipt(response);

  if (endpoint === formEndpoints.contact || endpoint === formEndpoints.quote) trackEvent("Enquiry Submitted");
  return response;
};
