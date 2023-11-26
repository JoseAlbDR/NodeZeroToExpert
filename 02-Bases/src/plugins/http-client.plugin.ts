import axios, { AxiosResponse } from 'axios';

export const httpClientPlugin = {
  get: async <T>(url: string): Promise<T> => {
    // const response = await fetch(url);
    // const data = await response.json();
    const response: AxiosResponse<T> = await axios.get<T>(url);

    return response.data;
  },
  // post: async (url, data) => {},
  // put: async (url, data) => {},
  // delete: async (url) => {},
};
