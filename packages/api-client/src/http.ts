export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
  onUnauthorized?: () => void | Promise<void>;
}

export type ApiBody = object | FormData | BodyInit;
export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: ApiBody;
  query?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiClient {
  request<TResponse = any>(
    path: string,
    options?: RequestOptions,
  ): Promise<TResponse>;
}

export function createApiClient({
  baseUrl,
  getAccessToken,
  onUnauthorized,
}: ApiClientOptions): ApiClient {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return {
    async request<TResponse = any>(
      path: string,
      options: RequestOptions = {},
    ): Promise<TResponse> {
      const url = new URL(`${normalizedBaseUrl}${path}`);

      for (const [key, value] of Object.entries(options.query ?? {})) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }

      const token = await getAccessToken?.();

      const headers = new Headers(options.headers);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      let body: BodyInit | undefined;

      if (options.body === undefined) {
        body = undefined;
      } else if (
        options.body instanceof FormData ||
        options.body instanceof Blob ||
        options.body instanceof URLSearchParams ||
        options.body instanceof ArrayBuffer ||
        typeof options.body === "string"
      ) {
        body = options.body;

        // Let the browser set multipart/form-data boundary.
        // Also don't override headers for strings, blobs, etc.
      } else {
        // Plain object → JSON
        headers.set("Content-Type", "application/json");
        body = JSON.stringify(options.body);
      }

      const response = await fetch(url.toString(), {
        ...options,
        headers,
        body,
      });

      if (response.status === 401) {
        await onUnauthorized?.();
      }

      const payload = await readJson(response);

      if (!response.ok) {
        throw new ApiError(
          getErrorMessage(payload) ?? "Request failed",
          response.status,
          payload,
        );
      }

      return payload as TResponse;
    },
  };
}

async function readJson(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();

  return text ? JSON.parse(text) : undefined;
}

function getErrorMessage(payload: unknown): string | undefined {
  if (
    typeof payload === "object" &&
    payload !== null &&
    ("message" in payload || "error" in payload)
  ) {
    const value = "message" in payload ? payload.message : payload.error;
    return typeof value === "string" ? value : undefined;
  }

  return undefined;
}
