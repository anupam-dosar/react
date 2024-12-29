import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingout, mutate: updateCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully.`);

      //   queryClient.invalidateQueries({
      //     queryKey: ["bookings", bookingId],
      //   });
      queryClient.invalidateQueries({
        active: true,
      }); // invalidates all queries active in the cache for the current page
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingout, updateCheckout };
}
