import axios from 'axios';

export const httpClientPlugin = {
  get: async (url: string) => {
    // const response = await fetch(url);
    // const data = await response.json();
    const { data } = await axios.get(url);

    return data;
  },
  // post: async (url, data) => {},
  // put: async (url, data) => {},
  // delete: async (url) => {},
};