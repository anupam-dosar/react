import Friend from "./Friend";

export default function FriendList({ friends, selectedFriend, onFriendSelect }) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          key={f.id}
          friend={f}
          selectedFriend={selectedFriend}
          onFriendSelect={onFriendSelect}
        />
      ))}
    </ul>
  );
}
