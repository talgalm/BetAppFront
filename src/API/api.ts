import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = window.location.href.includes('localhost')
  ? process.env.REACT_APP_BET_BASE_URL
  : process.env.REACT_APP_BET_BASE_URL_MOBILE;

export const ApiService = {
  makeRequest: async <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, any> | FormData,
    isFormData?: boolean,
    withAuth?: boolean,
    headers?: Record<string, string>
  ): Promise<T> => {
    const prepareConfig = (): AxiosRequestConfig => {
      const isGet = method === HTTPMethod.GET;

      const finalHeaders: Record<string, string> = {
        ...headers,
      };

      if (!isFormData && !isGet) {
        finalHeaders['Content-Type'] = ContentType.JSON;
      }

      const config: AxiosRequestConfig = {
        method,
        url: isGet
          ? `${BASE_URL}${endpoint}${data ? `?${new URLSearchParams(data as Record<string, string>).toString()}` : ''}`
          : `${BASE_URL}${endpoint}`,
        headers: finalHeaders,
        withCredentials: true,
      };

      if (!isGet) {
        if (isFormData && data instanceof FormData) {
          config.data = data;
          delete finalHeaders['Content-Type'];
        } else {
          config.data = data;
        }
      }

      return config;
    };

    try {
      const response = await axios(prepareConfig());
      return response.data;
    } catch (error: any) {
      if (withAuth && error.response?.status === StatusCode.UNAUTHORIZED) {
        try {
          const refreshResponse = await axios.post<{ accessToken: string }>(
            `${BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );
          const newAccessToken = refreshResponse.data.accessToken;
          Cookies.set('accessToken', newAccessToken);

          const retryResponse = await axios(prepareConfig());
          return retryResponse.data;
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          throw refreshError;
        }
      }
      throw error;
    }
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
  DELETE = 'delete',
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
