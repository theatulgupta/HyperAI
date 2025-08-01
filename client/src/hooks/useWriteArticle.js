import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useWriteArticle = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedArticle, setGeneratedArticle] = useState(null);

  const { mutate: generateArticle, isPending } = useMutation({
    mutationFn: ({ prompt, length }) => {
      return aiApiClient.generateArticle(api, { prompt, length });
    },
    onSuccess: (response) => {
      setGeneratedArticle(response.data.content);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return {
    generateArticle,
    isLoading: isPending,
    content: generatedArticle,
  };
};
