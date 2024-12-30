import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useSession() {
  const {
    isLoading: isLoadingSession,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getUser,
    retry: false,
  });

  return {
    isLoadingSession,
    user,
    error,
    isAuthenticated: user?.role === "authenticated",
    refetch,
  };
}
