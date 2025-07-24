import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useRemoveBackground = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedImage, setGeneratedImage] = useState(null);

  const { mutate: removeImageBackground, isPending } = useMutation({
    mutationFn: (formData) => {
      return aiApiClient.removeImageBackground(api, formData);
    },
    onSuccess: (response) => {
      setGeneratedImage(response.data.secure_url);
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      console.log(err);
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    },
  });

  return {
    removeImageBackground,
    isLoading: isPending,
    image: generatedImage,
    setGeneratedImage,
  };
};
