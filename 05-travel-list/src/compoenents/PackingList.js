import { useState } from "react";
import PackingItem from "./PackingItem";

export default function PackingList({ items, onDeleteItem, onSetPacked, handleClearList }) {
  const [sortOrder, setSortOrder] = useState("input");

  let sortedItems = [];
  switch (sortOrder) {
    case "input":
      sortedItems = items;
      break;

    case "descr":
      sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
      break;

    case "packed":
      sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
      break;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <PackingItem item={item} key={item.id} onDelete={onDeleteItem} setPacked={onSetPacked} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="descr">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={handleClearList}>clear list</button>
      </div>
    </div>
  );
}
