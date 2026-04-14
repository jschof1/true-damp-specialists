import { forwardFormSubmission } from "../../_lib/formProxy";

interface FunctionContext {
  request: Request;
  env: Record<string, string | undefined>;
}

export const onRequestPost = async (context: FunctionContext) =>
  forwardFormSubmission(context.request, context.env, "DISCOUNT_WEBHOOK_URL", {
    allowedFields: ["name", "phone", "summary", "source", "timestamp"],
  });
