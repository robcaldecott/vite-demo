export interface HTTPOptions extends RequestInit {
  searchParams?: Record<string, any>;
  headers?: HeadersInit;
  json?: object;
}

export type FetchParams = (url: string, options?: HTTPOptions) => Promise<any>;

async function _fetch(
  url: string,
  { searchParams, headers, json, ...options }: HTTPOptions = {}
) {
  const response = await fetch(
    `${url}${
      searchParams ? `?${new URLSearchParams(searchParams).toString()}` : ""
    }`,
    {
      headers: {
        ...headers,
        ...(json ? { "content-type": "application/json" } : {}),
      },
      ...(json ? { body: JSON.stringify(json) } : {}),
      ...options,
    }
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error(`${response.status}: ${response.statusText}`);
}

export type HTTPMethods = {
  get: FetchParams;
  post: FetchParams;
  delete: FetchParams;
};

// Simple fetch wrapper with a ky-style API
const http: HTTPMethods = {
  get: (url: string, options?: HTTPOptions) =>
    _fetch(url, { ...options, method: "GET" }),

  post: (url: string, options?: HTTPOptions) =>
    _fetch(url, { ...options, method: "POST" }),

  delete: (url: string, options?: HTTPOptions) =>
    _fetch(url, { ...options, method: "DELETE" }),
};

export { http };
