import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: updateCabin } = useMutation({
    mutationFn: ({ data, id }) => processCabin(data, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully.");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, updateCabin };
}
