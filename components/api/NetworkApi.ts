/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios, { AxiosRequestConfig } from 'axios';

/**
 * use axiosInstance to enable interceptors defined in useAxiosInterceptor.ts
 */
export const axiosInstance = axios.create();

const NetworkApi = {
  getDefaultHeaders: (token) => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `${token}`,
  }),

  getHeaders: (token?: string) => {
    const headers = {
      ...NetworkApi.getDefaultHeaders(token),
    };
    return headers;
  },

  get: (route: string, params: any, headers: object) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(
        route,
        params,
        'get',
        headers,
        (err: object, res: unknown) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        }
      );
    }),
  post: (route: string, params: object, headers: object) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(
        route,
        params,
        'post',
        headers,
        (err: object, res: unknown) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        }
      );
    }),
  put: (route: string, params: object, headers: object) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(
        route,
        params,
        'put',
        headers,
        (err: object, res: unknown) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        }
      );
    }),
  delete: (route: string, params: object, headers: object) =>
    new Promise((resolve, reject) => {
      NetworkApi.prepareConfig(
        route,
        null,
        'delete',
        headers,
        (err: object, res: unknown) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        }
      );
    }),
  prepareConfig: async (
    url: any,
    data: any,
    methodType: any,
    headers: any,
    callback: any
  ) => {
    const config = {
      method: methodType,
      url,
      data,
      headers: headers || NetworkApi.getDefaultHeaders(),
      // timeout: NetworkApi.requestTimeout
    };
    NetworkApi.call(config, callback);
  },
  call: (
    config: AxiosRequestConfig<any>,
    callback: (arg0: null, arg1: null) => void
  ) => {
    axiosInstance(config)
      .then((response) => {
        callback(null, response.data);
      })
      .catch((error) => {
        callback(error, null);
      });
  },
};

export default NetworkApi;
