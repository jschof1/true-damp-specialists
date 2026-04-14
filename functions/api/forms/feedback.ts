import { forwardFormSubmission } from "../../_lib/formProxy";

interface FunctionContext {
  request: Request;
  env: Record<string, string | undefined>;
}

export const onRequestPost = async (context: FunctionContext) =>
  forwardFormSubmission(context.request, context.env, "FEEDBACK_WEBHOOK_URL", {
    allowedFields: [
      "rating",
      "name",
      "email",
      "phone",
      "feedback",
      "source",
      "timestamp",
    ],
  });
