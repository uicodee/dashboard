import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  responseType: "json",
  withCredentials: true,
  // baseURL: "https://api.joblance.webtm.ru",
  baseURL: "https://shore-morocco-surrounded-ashley.trycloudflare.com",
});

api.interceptors.request.use((config) => {
  const accessTokenStr = localStorage.getItem("accessToken");
  if (accessTokenStr) {
    const accessToken = JSON.parse(accessTokenStr);
    config.headers.Authorization = `Bearer ${accessToken.accessToken}`;
  } else config.headers.Authorization = null;
  return config;
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return api({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;
