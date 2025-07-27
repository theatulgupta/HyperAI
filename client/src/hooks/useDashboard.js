import { useQuery } from "@tanstack/react-query";
import { useApiClient, userApiClient } from "../utils/api";
import toast from "react-hot-toast";

export const useDashboard = () => {
  const api = useApiClient();

  const {
    data,
    isLoading,
    refetch: refetchCreations,
  } = useQuery({
    queryKey: ["userCreations"],
    queryFn: () => userApiClient.getUserCreations(api),
    select: (response) => response.data.creations,
    onError: (err) =>
      toast.error(err.response?.data?.error || "Failed to fetch creations"),
  });

  return {
    creations: data || [],
    isLoading,
    refetchCreations,
  };
};
