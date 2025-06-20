import axios from "axios";

export const client = axios.create({
  baseURL: "https://gnews.io/api/v4",
  params: {
    apikey: process.env.EXPO_PUBLIC_GNEWS_API_KEY,
  },
});

client.interceptors.request.use(
  (config) => {
    const apiKey = config.params?.apikey;
    config.params = {
      ...(config.params || {}),
      apikey: apiKey,
    };
    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers,
      apiKey,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.log("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => {
    console.log("[API RESPONSE]", res.config.url, res.status, res.data);
    return res.data;
  },
  (err) => {
    if (err.response) {
      console.log(
        "[API RESPONSE ERROR]",
        err.config?.url,
        err.response.status,
        err.response.data
      );
    } else {
      console.log("[API RESPONSE ERROR]", err.message);
    }
    return Promise.reject(err);
  }
);
