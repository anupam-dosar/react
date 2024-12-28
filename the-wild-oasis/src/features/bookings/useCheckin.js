import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: updateCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully.`);

      //   queryClient.invalidateQueries({
      //     queryKey: ["bookings", bookingId],
      //   });
      queryClient.invalidateQueries({
        active: true,
      }); // invalidates all queries active in the cache for the current page
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCheckingIn, updateCheckin };
}
