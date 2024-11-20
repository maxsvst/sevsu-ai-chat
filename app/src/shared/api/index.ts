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
};

export interface RefreshApiResponse extends ApiResponse {
  accessToken: string;
  refreshToken: string;
}

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
      // Authorization:
      //   url === "/auth/refresh"
      //     ? `Refresh ${refreshToken}`
      //     : `Bearer ${accessToken}`,
    },
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
  }: FetchOptions): Promise<ApiResponse> => {
    const res = await fetchFunction({
      url,
      method,
      body,
      tags,
      revalidateTime,
    });

    const json = await res.json();
    console.log(res);
    res.status > 210 && console.error(`ERROR ${method} url: ${url}`, json);

    // if (json.statusCode === 401) {
    //   const refresh = (await api.post("/auth/refresh")) as RefreshApiResponse;
    //   console.log("до", refresh);
    //   localStorage.setItem("accessToken", refresh.accessToken);
    //   localStorage.setItem("refreshToken", refresh.refreshToken);
    //   console.log("после", refresh);
    //   method === HtttpMethod.GET
    //     ? await api.get(url)
    //     : await api.post(url, body!);
    // }

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
