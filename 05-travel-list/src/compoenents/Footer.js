export default function Footer({ items }) {
  const packedCount = items.filter((i) => i.packed).length;
  return (
    <footer className="stats">
      <em>
        ✈️ You have {items.length} items on your list, and you have already packed {packedCount} (
        {Math.round((items.length ? packedCount / items.length : 0) * 100)}
        %)
      </em>
    </footer>
  );
}
