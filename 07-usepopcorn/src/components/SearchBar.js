import { useEffect, useRef } from "react";
import { useKey } from "../useKey";

export default function SearchBar({ query, setQuery }) {
  const inputElm = useRef(null);

  useKey(13, () => {
    if (document.activeElement === inputElm.current) return;

    inputElm.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElm}
    />
  );
}
