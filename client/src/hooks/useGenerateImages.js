import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";

export const useGenerateImage = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedImage, setGeneratedImage] = useState(null);

  const { mutate: generateImage, isPending } = useMutation({
    mutationFn: ({ prompt, style, publish = false }) => {
      return aiApiClient.generateImage(api, { prompt, style, publish });
    },
    onSuccess: (response) => {
      setGeneratedImage(response.data.secure_url);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return {
    generateImage,
    isLoading: isPending,
    image: generatedImage,
    setGeneratedImage,
  };
};
