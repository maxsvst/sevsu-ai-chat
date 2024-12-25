export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum HtttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type FetchOptions = {
  url: string;
  method: HtttpMethod;
  body?: any;
  tags?: string[];
  revalidateTime?: number;
};

export type ApiResponse = {
  status: boolean;
  statusCode: number;
  path: string;
  message?: string;
};

export interface RefreshApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
}

let isRefreshing = false;
let pendingRequests: (() => Promise<any>)[] = [];

const fetchFunction = async ({
  url,
  method,
  body,
  tags,
  revalidateTime,
}: FetchOptions) => {
  const requestUrl = API_URL + url;

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  return await fetch(requestUrl, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        url === "/auth/refresh"
          ? `Refresh ${refreshToken}`
          : `Bearer ${accessToken}`,
    },
    mode: 'cors'
    // next: {
    //   tags,
    //   ...(revalidateTime && { revalidate: revalidateTime }),
    // },
  });
};

export const api = {
  request: async ({
    url,
    method,
    body,
    tags,
    revalidateTime,
  }: FetchOptions): Promise<any> => {
    const res = await fetchFunction({
      url,
      method,
      body,
      tags,
      revalidateTime,
    });

    const json = await res.json();
    res.status > 210 && console.error(`ERROR ${method} url: ${url}`, json);

    if (json.statusCode === 401) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push(() =>
            api
              .request({ url, method, body, tags, revalidateTime })
              .then(resolve)
          );
        });
      }

      isRefreshing = true;

      try {
        const refresh = (await api.post("/auth/refresh")) as RefreshApiResponse;
        const oldAccessToken = localStorage.getItem("accessToken");
        localStorage.setItem("accessToken", refresh.accessToken);
        localStorage.setItem("refreshToken", refresh.refreshToken);
        const accessToken = localStorage.getItem("accessToken");
        if (oldAccessToken !== accessToken) {
          pendingRequests.push(() =>
            api.request({ url, method, body, tags, revalidateTime })
          );
          const requests = pendingRequests.map((callback) => callback());
          pendingRequests = [];
          return Promise.all(requests);
        }
      } finally {
        isRefreshing = false;
      }
    }

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
  post: async (url: string, body?: any) => {
    return await api.request({
      method: HtttpMethod.POST,
      url,
      body,
    });
  },
  put: async (url: string, body?: any) => {
    return await api.request({
      method: HtttpMethod.PUT,
      url,
      body,
    });
  },
  patch: async (url: string, body?: any) => {
    return await api.request({
      method: HtttpMethod.PATCH,
      url,
      body,
    });
  },
  delete: async (url: string) => {
    return await api.request({
      method: HtttpMethod.DELETE,
      url,
    });
  },
};
