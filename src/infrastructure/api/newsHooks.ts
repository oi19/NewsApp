import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { client } from "./client";
import { Article } from "../../domain/Article";
import axios from "axios";

interface NewsApiResponse {
  totalArticles: number;
  articles: Article[];
}

const fetchHeadlines = (params: Record<string, any> = {}): Promise<Article[]> =>
  client
    .get("/top-headlines", { params })
    .then((res) => (res as unknown as NewsApiResponse).articles);

export const useHeadlines = (params: Record<string, any> = {}) =>
  useQuery({
    queryKey: ["/headlines", params],
    queryFn: () => fetchHeadlines(params),
  });

const searchNews = (params: Record<string, any>): Promise<Article[]> =>
  client
    .get("/search", { params })
    .then((res) => (res as unknown as NewsApiResponse).articles);

export const useSearchNews = (params: Record<string, any>) =>
  useQuery({
    queryKey: ["search", params],
    queryFn: () => searchNews(params),
    enabled: !!params.q,
  });

export const usePaginatedNews = (
  params: Record<string, any> = {},
  pageSize = 20
) =>
  useInfiniteQuery({
    queryKey: ["/headlines/infinite", params, pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await client.get("/top-headlines", {
          params: { ...params, page: pageParam, max: pageSize },
        });
        const data = response as unknown as NewsApiResponse;
        return {
          articles: Array.isArray(data.articles) ? data.articles : [],
          totalArticles:
            typeof data.totalArticles === "number" ? data.totalArticles : 0,
          page: pageParam,
        };
      } catch (e) {
        return { articles: [], totalArticles: 0, page: pageParam };
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage.articles)) return undefined;
      const loadedArticles = allPages.reduce(
        (sum, page) =>
          sum + (Array.isArray(page?.articles) ? page.articles.length : 0),
        0
      );
      if (loadedArticles >= (lastPage.totalArticles ?? 0)) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

client.interceptors.request.use(
  (config) => {
    // Always ensure apikey is present in params
    config.params = {
      ...(config.params || {}),
      apikey: "c33f8435bb0bb90e5699aac4e3ce3220",
    };
    console.log("[API REQUEST]", {
      method: config.method?.toUpperCase(),
      baseURL: config.baseURL,
      url: config.url,
      fullURL: `${config.baseURL}${config.url}`,
      params: config.params,
      headers: config.headers,
      apiKey: config.params.apikey,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.log("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);
