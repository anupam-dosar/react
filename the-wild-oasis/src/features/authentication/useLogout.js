import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLogout, mutate: userLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      //   queryClient.setQueriesData(["session"], null);
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to logout");
    },
  });

  return { isLogout, userLogout };
}
