import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useReviewResume = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [reviewContent, setReviewContent] = useState(null);

  const { mutate: reviewResume, isPending } = useMutation({
    mutationFn: (formData) => {
      return aiApiClient.reviewResume(api, formData);
    },
    onSuccess: (response) => {
      setReviewContent(response.data.content);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return {
    reviewResume,
    isLoading: isPending,
    content: reviewContent,
  };
};
