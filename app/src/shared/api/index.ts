import {redirect} from "next/navigation";

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

const fetchFunction = async ({
  url,
  method,
  body,
  tags,
  revalidateTime,
}: FetchOptions) => {
  const requestUrl = API_URL + url;

  const accessToken = localStorage.getItem("accessToken");

  return await fetch(requestUrl, {
    method,
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
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
    let res = await fetchFunction({
      url,
      method,
      body,
      tags,
      revalidateTime,
    });

    let json = await res.json();
    res.status > 210 && console.error(`ERROR ${method} url: ${url}`, json);

    if (json.statusCode === 401) {
      try {
        await refreshToken()

        res = await fetchFunction({
          url,
          method,
          body,
          tags,
          revalidateTime,
        });

        json = await res.json();
      } catch (error) {
        console.error("ERROR Refresh token", error);
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

async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = (await fetch(API_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: `Refresh ${refreshToken}`,
      },
      cache: "no-cache",
    }));

    const response = (await res.json()) as RefreshApiResponse;

    if (response.status) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.error("ERROR Refresh token", response);
      redirect("/authorization");
      return;
    }

    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken)
  } catch (e) {
    console.error(e);
  }
}
