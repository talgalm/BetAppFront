import axios, { AxiosRequestConfig } from "axios";


const BASE_URL = process.env.REACT_APP_BET_BASE_URL;

export const ApiService = {
  makeRequest: async <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> => {
    const config: AxiosRequestConfig = {
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    const response = await axios(config);
    return response.data;
  },
};


export enum HTTPMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
