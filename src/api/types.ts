import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = window.location.href.includes('localhost')
  ? process.env.REACT_APP_BET_BASE_URL
  : process.env.REACT_APP_BET_BASE_URL_MOBILE;

export const ApiService = {
  makeRequest: async <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, unknown>,
    isFormData?: boolean,
    headers?: Record<string, string>
  ): Promise<T> => {
    const config: AxiosRequestConfig = {
      method,
      url:
        method === HTTPMethod.GET
          ? `${BASE_URL}${endpoint}?${new URLSearchParams(data as Record<string, string>)}`
          : `${BASE_URL}${endpoint}`,
      headers: {
        ...(isFormData
          ? { 'Content-Type': ContentType.FORM }
          : { 'Content-Type': ContentType.JSON }),
        ...headers,
      },
      data:
        method !== HTTPMethod.GET
          ? isFormData
            ? new URLSearchParams(data as Record<string, string>).toString()
            : data
          : undefined,
    };

    const response = await axios(config);
    return response.data;
  },
};

export enum ContentType {
  FORM = 'application/x-www-form-urlencoded',
  JSON = 'application/json',
}

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
