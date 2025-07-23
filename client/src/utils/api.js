import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const createApiClient = (getToken) => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const useApiClient = () => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const aiApiClient = {
  generateArticle: (api, data) => api.post("/ai/generate-article", data),
  generateBlogTitle: (api, data) => api.post("/ai/generate-blog-title", data),
  generateImage: (api, data) => api.post("/ai/generate-image", data),
  removeImageBackground: (api, data) =>
    api.post("/ai/remove-image-background", data),
  removeImageObject: (api, data) => api.post("/ai/remove-image-object", data),
  reviewResume: (api, data) => api.post("/ai/review-resume", data),
};

export const userApiClient = {
  getUserCreations: (api) => api.get("/user/get-user-creations"),
  getPublishedCreations: (api) => api.get("/user/get-published-creations"),
  toggleLikeCreation: (api, data) =>
    api.post("/user/toggle-like-creation", data),
};
