type Env = Record<string, string | undefined>;
type Primitive = string | number | boolean | null;

interface JsonResponseInit extends ResponseInit {
  data?: Record<string, unknown>;
}

interface ProxyOptions {
  allowedFields: readonly string[];
  maxBodyBytes?: number;
}

const jsonResponse = ({
  status = 200,
  data = {},
  headers,
}: JsonResponseInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

const parseJsonBody = async (request: Request) => {
  try {
    const body = (await request.json()) as unknown;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {
        error: jsonResponse({
          status: 400,
          data: { ok: false, error: "Invalid JSON body" },
        }),
      };
    }

    return { body: body as Record<string, unknown> };
  } catch {
    return {
      error: jsonResponse({
        status: 400,
        data: { ok: false, error: "Malformed JSON body" },
      }),
    };
  }
};

const hasInvalidOrigin = (request: Request) => {
  const origin = request.headers.get("Origin");
  if (!origin) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.origin !== requestUrl.origin;
  } catch {
    return true;
  }
};

const sanitizePayload = (
  body: Record<string, unknown>,
  allowedFields: readonly string[],
) => {
  const allowed = new Set(allowedFields);
  const bodyKeys = Object.keys(body);

  for (const key of bodyKeys) {
    if (!allowed.has(key)) {
      return {
        error: jsonResponse({
          status: 400,
          data: { ok: false, error: "Unexpected form fields" },
        }),
      };
    }
  }

  const sanitized: Record<string, Primitive> = {};

  for (const key of allowedFields) {
    const value = body[key];
    if (value === undefined) {
      continue;
    }

    const isPrimitive =
      value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean";

    if (!isPrimitive) {
      return {
        error: jsonResponse({
          status: 400,
          data: { ok: false, error: "Invalid form field value" },
        }),
      };
    }

    sanitized[key] = value;
  }

  return { payload: sanitized };
};

export const forwardFormSubmission = async (
  request: Request,
  env: Env,
  bindingName: string,
  options: ProxyOptions,
) => {
  if (request.method !== "POST") {
    return jsonResponse({
      status: 405,
      headers: { Allow: "POST" },
      data: { ok: false, error: "Method not allowed" },
    });
  }

  if (hasInvalidOrigin(request)) {
    return jsonResponse({
      status: 403,
      data: { ok: false, error: "Invalid request origin" },
    });
  }

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse({
      status: 415,
      data: { ok: false, error: "Unsupported content type" },
    });
  }

  const contentLength = request.headers.get("Content-Length");
  const maxBodyBytes = options.maxBodyBytes ?? 10_000;
  if (contentLength && Number(contentLength) > maxBodyBytes) {
    return jsonResponse({
      status: 413,
      data: { ok: false, error: "Payload too large" },
    });
  }

  const webhookUrl = env[bindingName];
  if (!webhookUrl) {
    return jsonResponse({
      status: 500,
      data: { ok: false, error: "Webhook is not configured" },
    });
  }

  const { body, error } = await parseJsonBody(request);
  if (error) {
    return error;
  }

  const sanitizedResult = sanitizePayload(body, options.allowedFields);
  if (sanitizedResult.error) {
    return sanitizedResult.error;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const upstreamResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedResult.payload),
      signal: controller.signal,
    });

    if (!upstreamResponse.ok) {
      return jsonResponse({
        status: 502,
        data: { ok: false, error: "Failed to forward submission" },
      });
    }

    return jsonResponse({
      status: 200,
      data: { ok: true },
    });
  } catch {
    return jsonResponse({
      status: 500,
      data: { ok: false, error: "Unexpected proxy error" },
    });
  } finally {
    clearTimeout(timeout);
  }
};
