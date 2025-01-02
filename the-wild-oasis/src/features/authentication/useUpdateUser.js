import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: updateUserData,
    onSuccess: (user) => {
      queryClient.setQueryData(["session"], user);
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("User updated");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update user");
    },
  });

  return { isEditing, editUser };
}
