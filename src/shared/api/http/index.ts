import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const api: AxiosInstance = axios.create({
    responseType: "json",
    withCredentials: false,
    baseURL: 'https://api.joblance.webtm.ru'
});

export const createInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    return api({
        ...config,
        ...options
    }).then(r => r.data)
}

export type BodyType<Data> = Data;
