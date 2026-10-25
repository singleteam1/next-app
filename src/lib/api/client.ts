import type { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-instance";

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return axiosInstance({
    ...config,
    ...options,
  }).then((response) => response.data);
};

export default customInstance;
