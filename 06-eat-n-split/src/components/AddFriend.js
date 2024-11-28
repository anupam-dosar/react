import { useState } from "react";
import Button from "./Button";

export default function AddFriend({ onAddFriend }) {
  const defaultUrl = "https://i.pravatar.cc/48";
  const [name, setName] = useState("");
  const [url, setUrl] = useState(defaultUrl);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: name,
      image: `${url}?=u${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setUrl(defaultUrl);
  };

  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑 Friend Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>🖼️ Image URL</label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} readOnly />

      <Button onClick={handleFormSubmit}>Add</Button>
    </form>
  );
}
