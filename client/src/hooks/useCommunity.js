import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient, userApiClient } from "../utils/api.js";
import toast from "react-hot-toast";

export const useCommunity = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch: refetchCreations,
  } = useQuery({
    queryKey: ["userCreations"],
    queryFn: () => userApiClient.getPublishedCreations(api),
    select: (response) => response.data.creations,
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to fetch creations"),
  });

  const { mutate: toggleLike, isPending: isTogglingLike } = useMutation({
    mutationFn: ({ id }) => userApiClient.toggleLikeCreation(api, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCreations"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to toggle like");
    },
  });

  return {
    creations: data || [],
    isLoading,
    isError,
    refetchCreations,
    toggleLike,
    isTogglingLike,
  };
};
