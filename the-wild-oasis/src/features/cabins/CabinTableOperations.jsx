import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        field="show"
        options={[
          { label: "All", value: "all", default: true },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />

      <SortBy
        options={{
          field: [
            { value: "", label: "Sort By" },
            { value: "name", label: "Name" },
            { value: "maxCapacity", label: "Capacity" },
            { value: "regularPrice", label: "Price" },
            { value: "discount", label: "Discount" },
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

export default CabinTableOperations;
