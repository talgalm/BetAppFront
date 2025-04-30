import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = window.location.href.includes('localhost')
  ? process.env.REACT_APP_BET_BASE_URL
  : process.env.REACT_APP_BET_BASE_URL_MOBILE;

export const ApiService = {
  makeRequest: async <T>(
    endpoint: string,
    method: HTTPMethod,
    data?: Record<string, unknown>,
    isFormData?: boolean,
    withAuth?: boolean,
    headers?: Record<string, string>
  ): Promise<T> => {
    const getAccessToken = () => Cookies.get('accessToken');

    const prepareConfig = (token?: string): AxiosRequestConfig => ({
      method,
      url:
        method === HTTPMethod.GET
          ? `${BASE_URL}${endpoint}${data ? `?${new URLSearchParams(data as Record<string, string>).toString()}` : ''}`
          : `${BASE_URL}${endpoint}`,
      headers: {
        ...(isFormData
          ? { 'Content-Type': ContentType.FORM }
          : { 'Content-Type': ContentType.JSON }),
        // ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      data:
        method !== HTTPMethod.GET
          ? isFormData
            ? new URLSearchParams(data as Record<string, string>).toString()
            : data
          : undefined,
      withCredentials: true,
    });

    const token = withAuth ? getAccessToken() : undefined;

    try {
      const response = await axios(prepareConfig(token));
      return response.data;
    } catch (error: any) {
      if (withAuth && error.response?.status === StatusCode.UNAUTHORIZED) {
        // attempt to refresh
        try {
          const refreshResponse = await axios.post<{ accessToken: string }>(
            `${BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true } // send refreshToken cookie
          );

          const newAccessToken = refreshResponse.data.accessToken;
          Cookies.set('accessToken', newAccessToken);

          // retry original request
          const retryResponse = await axios(prepareConfig(newAccessToken));
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
}

export enum StatusCode {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}
