import { forwardFormSubmission } from "../../_lib/formProxy";

interface FunctionContext {
  request: Request;
  env: Record<string, string | undefined>;
}

export const onRequestPost = async (context: FunctionContext) =>
  forwardFormSubmission(context.request, context.env, "FORM_WEBHOOK_URL", {
    allowedFields: [
      "name",
      "phone",
      "email",
      "issue",
      "previousAdvice",
      "firstNoticed",
      "issueDescription",
      "postcode",
      "source",
      "area",
    ],
  });
