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

  const page = Number(searchParams.get("page") || 1);

  const {
    isLoading,
    data: { data: bookings, count: numberOfBookings } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, numberOfBookings, bookings, error };
}
