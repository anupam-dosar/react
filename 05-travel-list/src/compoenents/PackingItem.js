export default function PackingItem({ item, onDelete, setPacked }) {
  return (
    <li key={item.id}>
      <input type="checkbox" value={item.packed} onChange={() => setPacked(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
