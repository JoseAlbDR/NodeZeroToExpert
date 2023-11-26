import axios, { AxiosResponse } from 'axios';

export const httpClientPlugin = {
  get: async <T>(url: string): Promise<T> => {
    // const response = await fetch(url);
    // const data = await response.json();
    const response: AxiosResponse<T> = await axios.get<T>(url);

    return response.data;
  },
  post: async (url: string, data: any) => {
    throw new Error('Not implemented yet');
  },
  put: async (url: string, data: any) => {
    throw new Error('Not implemented yet');
  },
  delete: async (url: string) => {
    throw new Error('Not implemented yet');
  },
};
