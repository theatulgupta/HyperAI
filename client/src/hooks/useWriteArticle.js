import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";

export const useWriteArticle = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedArticle, setGeneratedArticle] = useState(null);

  const {
    mutate: generateArticle,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ prompt, length }) => {
      if (!prompt || !length) throw new Error("Prompt and length are required");
      return aiApiClient.generateArticle(api, { prompt, length });
    },
    onSuccess: (response) => {
      setGeneratedArticle(response.data.content);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      console.error(
        "Article generation failed:",
        err?.response?.data || err.message
      );
    },
  });

  return {
    generateArticle,
    isLoading: isPending,
    isError,
    error,
    content: generatedArticle,
    setGeneratedArticle,
  };
};
