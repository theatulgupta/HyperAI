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
      return aiApiClient.generateBlogTitle(api, { keyword, category });
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
