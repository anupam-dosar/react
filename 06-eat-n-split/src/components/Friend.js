import Button from "./Button";

export default function Friend({ friend, selectedFriend, onFriendSelect }) {
  const isSelected = selectedFriend === friend.id;

  return (
    <li key={friend.id} className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} &euro;{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you &euro;{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You are even</p>}

      <Button onClick={() => onFriendSelect(friend.id)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
