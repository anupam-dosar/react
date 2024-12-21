// import styled from "styled-components";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const show = searchParams.get("show") || "all";

  let filteredCabins = cabins;
  switch (show) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      break;
  }

  const [sortField, sortDirection] = searchParams.get("sort")?.split("-") || ["", "asc"];
  const sortOptions = {
    name: (a, b) => a.name.localeCompare(b.name),
    maxCapacity: (a, b) => a.maxCapacity - b.maxCapacity,
    regularPrice: (a, b) => a.regularPrice - b.regularPrice,
    discount: (a, b) => a.discount - b.discount,
  };
  const sortFunction = sortOptions[sortField];
  filteredCabins.sort(sortFunction);
  if (sortDirection === "desc") filteredCabins.reverse();
  // console.log(filteredCabins);

  return isLoading ? (
    <Spinner />
  ) : (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body data={filteredCabins} render={(row) => <CabinRow cabin={row} key={row.id} />} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
