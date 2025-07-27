import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useBlogTitles = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedTitle, setGeneratedTitle] = useState(null);

  const { mutate: generateBlogTitle, isPending } = useMutation({
    mutationFn: ({ keyword, category }) => {
      if (!keyword || !category) {
        throw new Error("Keyword and category are required");
      }

      const prompt = `You are a professional blog content strategist. Generate 10 **bold**, engaging, SEO-optimized blog titles based on the keyword "${keyword}" in the "${category}" category. Titles should be unique, creative, and click-worthy. Format the response as a numbered list (1–5), with each title in **bold**, followed by a short 1-line normal text description that explains the blog post's value or angle. Keep the entire response under 120 words.`;

      return aiApiClient.generateBlogTitle(api, { prompt });
    },
    onSuccess: (response) => {
      setGeneratedTitle(response.data.content);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return {
    generateBlogTitle,
    isLoading: isPending,
    content: generatedTitle,
  };
};
