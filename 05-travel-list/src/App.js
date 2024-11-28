import { useState } from "react";
import Footer from "./compoenents/Footer";
import Form from "./compoenents/Form";
import Header from "./compoenents/Header";
import PackingList from "./compoenents/PackingList";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]);

  function updateItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function setPacked(id) {
    setItems((items) => items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i)));
  }

  function clearList() {
    setItems([]);
  }

  function deleteItems(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }

  return (
    <div className="App">
      <Header />
      <Form onAddItem={updateItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItems}
        onSetPacked={setPacked}
        handleClearList={clearList}
      />
      <Footer items={items} />
    </div>
  );
}

export default App;
