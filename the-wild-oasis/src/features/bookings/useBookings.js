import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterVal = searchParams.get("status") || "all";
  const filter =
    !filterVal || filterVal === "all" ? null : { field: "status", value: filterVal, methid: "eq" };

  const [sortField, sortDirection] = searchParams.get("sort")?.split("-") || ["", "asc"];
  const sortBy = sortField ? { field: sortField, direction: sortDirection } : null;

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings, error };
}
