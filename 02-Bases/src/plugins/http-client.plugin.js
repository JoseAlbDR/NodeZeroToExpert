const httpClientPlugin = {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};

module.exports = { httpClientPlugin };
