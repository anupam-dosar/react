import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { isLoading, bookings } = useBookings();
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";

  let filteredBookings = bookings;

  switch (status) {
    case "unconfirmed":
      filteredBookings = bookings.filter((booking) => booking.status === "unconfirmed");
      break;
    case "checked-in":
      filteredBookings = bookings.filter((booking) => booking.status === "checked-in");
      break;
    case "checked-out":
      filteredBookings = bookings.filter((booking) => booking.status === "checked-out");
      break;
    default:
      break;
  }

  const [sortField, sortDirection] = searchParams.get("sort")?.split("-") || ["", "asc"];
  const sortOptions = {
    startDate: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    totalPrice: (a, b) => a.totalPrice - b.totalPrice,
  };
  filteredBookings.sort(sortOptions[sortField]);
  if (sortDirection === "desc") filteredBookings.reverse();

  return isLoading ? (
    <Spinner />
  ) : bookings.length ? (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredBookings}
          render={(booking) => <BookingRow key={booking.id} booking={booking} />}
        />
      </Table>
    </Menus>
  ) : (
    <Empty resource="bookings" />
  );
}

export default BookingTable;
