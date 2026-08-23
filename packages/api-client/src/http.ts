export interface ApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
  onUnauthorized?: () => void | Promise<void>;
  /** Prevent unavailable APIs from leaving UI loading states indefinitely. */
  timeoutMs?: number;
}

export type ApiBody = object | FormData | BodyInit;
// API endpoints without a response schema remain backwards-compatible with existing consumers.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnspecifiedApiResponse = any;

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
  request<TResponse = UnspecifiedApiResponse>(
    path: string,
    options?: RequestOptions,
  ): Promise<TResponse>;
}

export function createApiClient({
  baseUrl,
  getAccessToken,
  onUnauthorized,
  timeoutMs = 8_000,
}: ApiClientOptions): ApiClient {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return {
    async request<TResponse = UnspecifiedApiResponse>(
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

      const timeoutController = new AbortController();
      const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);
      const signal = options.signal
        ? AbortSignal.any([options.signal, timeoutController.signal])
        : timeoutController.signal;

      let response: Response;
      try {
        response = await fetch(url.toString(), {
          ...options,
          headers,
          body,
          signal,
        });
      } catch (error) {
        if (timeoutController.signal.aborted && !options.signal?.aborted) {
          throw new ApiError("The server took too long to respond. Please try again.", 408);
        }
        throw error;
      } finally {
        clearTimeout(timeoutId);
      }

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
