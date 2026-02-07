import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient, getApiErrorMessage } from "../utils/api.js";
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
      toast.error(getApiErrorMessage(err, "Failed to generate article"));
    },
  });

  return {
    generateArticle,
    isLoading: isPending,
    content: generatedArticle,
  };
};
