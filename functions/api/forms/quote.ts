import { forwardFormSubmission } from "../../_lib/formProxy";

interface FunctionContext {
  request: Request;
  env: Record<string, string | undefined>;
}

export const onRequestPost = async (context: FunctionContext) =>
  forwardFormSubmission(context.request, context.env, "QUOTE_WEBHOOK_URL", {
    allowedFields: [
      "name",
      "phone",
      "email",
      "postcode",
      "service",
      "urgency",
      "propertyType",
      "description",
      "source",
    ],
  });
