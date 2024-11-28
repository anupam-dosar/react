import { useState } from "react";
import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";
import Button from "./components/Button";
import SplitBill from "./components/SplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, toggleAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleToggleAddFriend = () => {
    toggleAddFriend((s) => !s);
  };

  const handleAddFriend = (friend) => {
    setFriends((f) => [...f, friend]);
    handleToggleAddFriend();
  };

  const handleFriendSelect = (id) => {
    setSelectedFriend((f) => (f === id ? null : id));
    toggleAddFriend(false);
  };

  const handleSplit = (amount, owed) => {
    const index = friends.findIndex((f) => f.id === selectedFriend);
    if (owed) {
      friends[index].balance += amount;
    } else {
      friends[index].balance -= amount;
    }
    setFriends([...friends]);
    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onFriendSelect={handleFriendSelect}
        />
        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleToggleAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      {selectedFriend && (
        <SplitBill friend={friends.find((f) => f.id === selectedFriend)} onSplit={handleSplit} />
      )}
    </div>
  );
}
