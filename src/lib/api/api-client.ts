import { env } from "@/config/env";

type ApiRequestOptions = RequestInit & {
    token?: string;
};

type ApiErrorResponse = {
    error?: string;
    message?: string;
};

export class ApiError extends Error{
    status: number;

    constructor(message: string, status:number){
        super(message);

        this.name = "ApiError";
        this.status = status;
    }
}

export async function apiRequest<T>(
    path: string,
    options: ApiRequestOptions = {},
): Promise<T> {
    const {token, headers: provideHeaders, ...requestOptions} = options;

    const headers = new Headers(provideHeaders);

    headers.set("Accept", "application/json");

    if(token){
        headers.set("Authorization",`Bearer ${token}`);
    }

    const response = await fetch(`${env.apiUrl}${path}`,
        {
            ...requestOptions,
            headers,
        }
    );

    const data = (await response
        .json()
        .catch(()=>null)) as ApiErrorResponse | T | null;

    if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new ApiError(
      errorData?.error ??
        errorData?.message ??
        `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return data as T;
}