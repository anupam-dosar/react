import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const dayCount = searchParams.get("last") || 7;

  const queryDate = subDays(new Date(), dayCount).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${dayCount}`],
  });

  const confirmedStays = stays?.filter((stay) =>
    ["checked-in", "checked-out"].includes(stay.status)
  );

  return { isLoading, stays, confirmedStays, dayCount };
}

export { useRecentStays };
