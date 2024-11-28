import { useState } from "react";
import Button from "./Button";

export default function SplitBill({ friend, onSplit }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [paidBy, setPaidBy] = useState("U");
  const friendExpense = bill ? bill - myExpense : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    onSplit(paidBy === "U" ? friendExpense : myExpense, paidBy === "U");

    setBill("");
    setMyExpense("");
    setPaidBy("U");
  };

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>

      <label>💶 Bill value:</label>
      <input type="number" min="0" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

      <label>💳 Your expense:</label>
      <input
        type="number"
        min="0"
        value={myExpense}
        onChange={(e) => {
          const v = Number(e.target.value);
          setMyExpense(v > bill ? bill : v);
        }}
      />

      <label>🤑 {friend.name}'s expense:</label>
      <input type="number" value={friendExpense} disabled />

      <label>🫰 Bill paid by:</label>
      <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="U">You</option>
        <option value={friend.id}>{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
