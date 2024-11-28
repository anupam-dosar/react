import { useState } from "react";

export default function Form({ onAddItem }) {
  const [descr, setDescr] = useState("");
  const [itemCount, setItemCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!descr) return;

    const newItem = {
      id: Date.now(),
      description: descr,
      quantity: itemCount,
      packed: false,
    };
    onAddItem(newItem);

    setDescr("");
    setItemCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>🚄 Your travel essentials for current trip!</h3>
      <select value={itemCount} onChange={(e) => setItemCount(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={descr}
        onChange={(e) => setDescr(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
