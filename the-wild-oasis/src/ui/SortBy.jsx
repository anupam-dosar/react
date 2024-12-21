import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortField, sortDirection] = searchParams.get("sort")?.split("-") || ["", "asc"];

  const handleFieldSelect = (event) => {
    if (event.target.value === "") {
      searchParams.delete("sort");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("sort", `${event.target.value}-${sortDirection}`);
    setSearchParams(searchParams);
  };
  const handleSortDirection = (event) => {
    if (!sortField) return;
    searchParams.set("sort", `${sortField}-${event.target.value}`);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Select options={options.field} value={sortField} type="white" onChange={handleFieldSelect} />
      <Select
        options={options.direction}
        value={sortDirection}
        type="white"
        onChange={handleSortDirection}
      />
    </>
  );
}

export default SortBy;
