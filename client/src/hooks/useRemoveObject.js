import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, aiApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useRemoveObject = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const [generatedImage, setGeneratedImage] = useState(null);

  const { mutate: removeImageObject, isPending } = useMutation({
    mutationFn: (formData) => {
      return aiApiClient.removeImageObject(api, formData);
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
    removeImageObject,
    isLoading: isPending,
    image: generatedImage,
  };
};
