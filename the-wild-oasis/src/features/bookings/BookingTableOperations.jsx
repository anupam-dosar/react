import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="status"
        resetPage={true}
        options={[
          { value: "all", label: "All", default: true },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={{
          field: [
            { value: "", label: "Sort By" },
            { value: "startDate", label: "Start Date" },
            { value: "totalPrice", label: "Total Price" },
          ],
          direction: [
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ],
        }}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
