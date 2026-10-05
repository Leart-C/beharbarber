import { env } from "@/config/env";

type ApiRequestOptions = RequestInit & {
  token?: string;
};

type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { token, headers: provideHeaders, ...requestOptions } = options;

  const headers = new Headers(provideHeaders);

  headers.set("Accept", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${env.apiUrl}${path}`, {
    ...requestOptions,
    headers,
  });

  // A successful HTTP response with broken JSON is not successful application data.
  // Keep abort errors intact so callers can discard cancelled requests.
  if (response.status === 204) return undefined as T;
  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    if (
      options.signal?.aborted ||
      (error instanceof Error && error.name === "AbortError")
    )
      throw error;
    if (response.ok)
      throw new ApiError(
        "The server returned an invalid response",
        response.status,
      );
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    const message = errorData?.error ?? errorData?.message;
    throw new ApiError(
      typeof message === "string"
        ? message
        : `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return data as T;
}
