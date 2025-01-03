import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const dayCount = searchParams.get("last") || 7;

  const queryDate = subDays(new Date(), dayCount).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${dayCount}`],
  });

  return { isLoading, bookings };
}

export { useRecentBookings };
