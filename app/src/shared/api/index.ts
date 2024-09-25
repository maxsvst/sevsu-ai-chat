export const API_URL = process.env.NEXT_PUBLIC_API_URL; // NEXT_PUBLIC_, чтобы переменную среды было видно в клиентском компоненте

export enum HtttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

type FetchOptions = {
  url: string;
  method: HtttpMethod;
  body?: BodyInit | null;
  tags?: string[];
  revalidateTime?: number;
};

export type ApiResponse = {
  status: boolean;
  statusCode: number;
  path: string;
  message?: string;
  result?: unknown;
};

const fetchFunction = async ({
  url,
  method,
  body,
  tags,
  revalidateTime,
}: FetchOptions) => {
  //   const session = await getServerAuthSession();
  //   const accessToken = session.backendTokens.accessToken;

  const requestUrl = API_URL + url;

  return await fetch(requestUrl, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
    },
    // ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
    next: {
      tags,
      ...(revalidateTime && { revalidate: revalidateTime }),
    },
  });
};

export const api = {
  request: async ({
    url,
    method,
    body,
    tags,
    revalidateTime,
  }: FetchOptions): Promise<ApiResponse> => {
    const res = await fetchFunction({
      url,
      method,
      body,
      tags,
      revalidateTime,
    });

    const json = await res.json();
    !json.status && console.error(`ERROR ${method} url: ${url}`, json);

    return json;
  },
  get: async (url: string, tags?: string[], revalidateTime?: number) => {
    return await api.request({
      method: HtttpMethod.GET,
      url,
      tags,
      revalidateTime,
    });
  },
  post: async (url: string, body?: BodyInit) => {
    return await api.request({
      method: HtttpMethod.POST,
      url,
      body,
    });
  },
  put: async (url: string, body?: BodyInit) => {
    return await api.request({
      method: HtttpMethod.PUT,
      url,
      body,
    });
  },
};
