import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterVal = searchParams.get("status") || "all";
  const filter =
    !filterVal || filterVal === "all" ? null : { field: "status", value: filterVal, methid: "eq" };

  const [sortField, sortDirection] = searchParams.get("sort")?.split("-") || ["", "asc"];
  const sortBy = sortField ? { field: sortField, direction: sortDirection } : null;

  const page = Number(searchParams.get("page") || 1);

  const {
    isLoading,
    data: { data: bookings, count: numberOfBookings } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // prefetching the next page
  if (page < Math.ceil(numberOfBookings / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // prefetching the next page
    });
  }

  // prefetching the previous page
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // prefetching the next page
    });
  }

  return { isLoading, numberOfBookings, bookings, error };
}
