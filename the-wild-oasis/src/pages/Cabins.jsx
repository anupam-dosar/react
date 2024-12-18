import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "./AddCabin";

function Cabins() {
  return (
    <>
      <Row direction="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>folter & sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
